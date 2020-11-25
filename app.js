const express=require("express");
const path=require('path');
const mongoose=require('mongoose');
const ejsMate=require('ejs-mate');
const session=require('express-session');
const flash=require('connect-flash');
const Friends=require('./models/user');
const catchAsync=require('./utils/catchAsync');
const ExpressError=require('./utils/ExpressError');
const passport=require('passport');
const LocalStrategy=require('passport-local');

const findfriends=require('./routes/findfriends')

const chatRoute = require("./routes/chats")
const cookieSession = require('cookie-session');
const userRoutes = require('./routes/users');
const Messages = require('./models/messages');

const MONGO_URI = 'mongodb+srv://Kopal:he110hello@cluster0.lztyc.mongodb.net/onlinechat?retryWrites=true&w=majority'
mongoose.connect( MONGO_URI, {
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
app.use(cookieSession({
    maxAge : 24*60*60*1000,
    keys: ['fhuihuhih'],
})) 
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Friends.authenticate()));


passport.serializeUser(Friends.serializeUser());
passport.deserializeUser(Friends.deserializeUser()); 

passport.use(new LocalStrategy(Friends.authenticate()));


app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views')); 

app.use(express.urlencoded({extended:true}));
//app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')));

const sessionConfig={
    secret: 'Better',
    resave:false,
    saveUninitialized: true
}
app.use(session(sessionConfig));

app.use(flash());
app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    res.locals.error=req.flash('error');
    res.locals.success=req.flash('success');
    next();
});


var http = require('http').createServer(app);
var PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log('listening on *:' ,PORT);
  });  
const io = require("socket.io")(http); 

app.use('/findfriends' , findfriends);
app.use('/',userRoutes);
app.use('/chat' , chatRoute)
app.get('/',(req,res)=>{
    res.render('landing');
});

io.on('connection', function(socket){
    socket.on("new" , (user)=>{
            Friends.findByIdAndUpdate(user._id , {online : socket.id} ,{new :true} ,(err,result) => {
                if(!err) socket.broadcast.emit("new-user" ,  {id:result._id,name:result.username} )
                else ExpressError(403 , "Access Forbidden");
            });
        }
    )
    socket.on("disconnect" , () => {
    Friends.findOneAndUpdate( { online : socket.id} , {online : ''} , {new :true } ,function(err , result){
        if(!err && result!=null)   io.emit("user-disconnected" , result._id);
        })
    });

    socket.on("chat-message", (msg) => {
        Friends.findById( msg.sender._id , function (err ,friend) {
            const message = new Messages({sender:friend , chat_id : 0 , msg:msg.msg});
            message.save().then(io.emit('chat-message', {'msg' : msg.msg, 'sender' :friend }))
        })
    } );

    socket.on("private-message" , (chat_id_ref , msg ,sender) => {
        Friends.findById(chat_id_ref ,(err , friend)=>{
                io.to(socket.id).emit("private-message" , sender , msg , chat_id_ref)
                if(friend.online!= '' && !err)
                {
                    io.to(friend.online).emit("private-message" , sender , msg , sender._id);
                }   
            chat_id = (chat_id_ref > sender._id? sender._id+chat_id_ref: chat_id_ref+sender._id);
            const message = new Messages({ sender , chat_id , msg });
            message.save().then().catch(err => {console.log(err);}) 
       })
    } );

    socket.on("typing" , data => {
        if(data.chat_id == 0)
            socket.broadcast.emit("typing" , {sender: data.sender , chat_id :0 });
        else
        {
            Friends.findById(data.chat_id , function (err , friend){
                if(friend.online!='' && !err)
                {
                    io.to(friend.online).emit("typing" , {sender  : data.sender , chat_id:data.sender._id})
                }
            })
        }
    })
})