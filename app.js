const express=require("express");
const path=require('path');
const mongoose=require('mongoose');
const Friends=require('./models/friends');
const Messages = require('./models/messages');
const morgan=require('morgan');
const { query } = require("express");

mongoose.connect('mongodb://localhost:27017/online-chat', {
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify: false 
});

const db=mongoose.connection;
db.on("error",console.error.bind(console,"Connection Error"));
db.once("open",()=>{
    console.log("Database connected");
});

const app=express();


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use('*/css' ,express.static('public/css'));
app.use('*/js' ,express.static('public/js')) 
app.use(express.urlencoded({extended:true}));
app.use(morgan('tiny'));

var http = require('http').createServer(app);
var PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log('listening on *:' ,PORT);
  });  
const io = require("socket.io")(http); 

app.get('/',(req,res)=>{
    res.render('landing');
});

app.get('/findfriends',async(req,res)=>{
    const friends=await Friends.find({});
    res.render('findfriends/index',{friends});
});
app.get('/findfriends/new',(req,res)=>{
    res.render('findfriends/new')
})
app.post('/findFriends',async(req,res)=>{
    const friend=new Friends(req.body.friends);
    await friend.save();
    res.redirect(`/findfriends/${friend._id}`);
})

app.get('/findfriends/:id',async(req,res)=>{
    const friend=await Friends.findById(req.params.id);
    res.render('findfriends/show',{friend});
});

app.get('/chat/:id/:chat_id', (req, res) => {
    data = req.params;
        Friends.findOneAndUpdate( {"_id" : data.id},   {new :true} ,function(err , result){
        if(err)
        {res.status(500).send("error in fnding u")}
        else if(result==null)
        {res.status(403).send("error")}
        else
        {
            Friends.find({} , '_id name online' , function(err, users){
                if(err) 
                    res.status(500).send(err);
                else
                {
                    var chatname;
                    if(data.chat_id==0)
                    {
                        chatname = "Community";
                        var chat_id =0
                    }    
                    else
                    {
                        Friends.findById(data.chat_id, function(err , friend){
                            if(err) {
                                res.status(404).send("not");
                            } 
                            else  chatname = friend.name;
                        });
                        var chat_id = (data.id > data.chat_id? data.chat_id+data.id: data.id+data.chat_id);
                    }    
                    Messages.find( {chat_id } ).lean().exec(
                        function (err ,msgs) {
                            if(err)
                                { console.log(err , "from here"); res.status(403).send(err);}
                            else
                            {
                                async function addinfo (){ 
                                    msgs = await Promise.all( msgs.map(async (msg) =>  
                                    {
                                      await Friends.findById(msg.sender).then(friend =>{ msg["sendername"] =friend.name ; })
                                     .catch(err => console.log(err))
                                      return msg
                                    })
                                )}
                                addinfo().then(()=>{
                                    res.render('chats.ejs', {users , receiver: result , msgs ,chatname , chat_id:data.chat_id} );
                                })
                            }
                        }
                    ) 
                }     
            })
        }
    })
})

io.on('connection', function(socket){
    socket.on("new" , (user)=>{
            Friends.findByIdAndUpdate(user._id , {online : socket.id} ,{new :true} ,(err,result) => {
                console.log("online" ,result.online ,result._id ,result.name )
                if(!err) socket.broadcast.emit("new-user" ,  {id:result._id,name:result.name} )
                else console.log("possible not");
            });
        }
    )
    socket.on("disconnect" , () => {
    Friends.findOneAndUpdate( { online : socket.id} , {online : ''} , {new :true } ,function(err , result){
        if(!err && result!=null)   io.emit("user-disconnected" , result._id);
        })
    });

    socket.on("chat-message", (msg) => {
        console.log("msgsender", typeof(msg.sender) ,msg.sender._id , msg.sender.online);
        Friends.findById( msg.sender._id , function (err ,friend) {
            const message = new Messages({sender:friend , chat_id : 0 , msg:msg.msg});
            console.log(friend);
            message.save().then(io.emit('chat-message', {'msg' : msg.msg, 'sender' :friend }))
            .catch(err => console.log( err));
        })
    } );

    socket.on("private-message" , (chat_id_ref , msg ,sender) => {
        console.log(chat_id_ref);
        Friends.findById(chat_id_ref ,(err , friend)=>{
                io.to(socket.id).emit("private-message" , sender , msg , chat_id_ref)
                if(friend.online!= '')
                {
                    console.log("sent");
                    io.to(friend.online).emit("private-message" , sender , msg , sender._id);
                }   
            chat_id = (chat_id_ref > sender._id? sender._id+chat_id_ref: chat_id_ref+sender._id);
            const message = new Messages({ sender , chat_id , msg });
            message.save().then(console.log("saved")).catch(err => {console.log(err);}) 
       })
    } );
})//io.to(user).emit("private-message" , {'id': usersonline[socket.id] , 'msg':msg , c_id : chat_id} )