const mongoose=require('mongoose');
const Friends=require('../models/user');
const Messages = require('../models/messages');
const {MONGO_URI} = require('../config_keys');

mongoose.connect(MONGO_URI, {
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
}
seedDB().then(()=>{
    mongoose.connection.close();
});