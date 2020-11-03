const express=require("express");
const path=require('path');
const mongoose=require('mongoose');
const Friends=require('./models/friends');
const morgan=require('morgan');

mongoose.connect('mongodb://localhost:27017/online-chat', {
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true
});

const db=mongoose.connection;
db.on("error",console.error.bind(console,"Connection Error"));
db.once("open",()=>{
    console.log("Database connected");
});

const app=express();


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('tiny'));

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




app.listen(3000,()=>{
    console.log('Server Started');
});
