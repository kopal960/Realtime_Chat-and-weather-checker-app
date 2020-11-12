const mongoose=require('mongoose');
const Friends=require('../models/friends');
const Messages = require('../models/messages');

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

const seedDB=async()=>{
    await Friends.deleteMany({});
    await Messages.deleteMany({});
    const c=new Friends({name:'Rhythm' , age:19  , location:'India' });
    await c.save();
}
seedDB().then(()=>{
    mongoose.connection.close();
});