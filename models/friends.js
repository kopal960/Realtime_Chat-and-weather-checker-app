const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const FriendsSchema=new Schema({
    name : String,
    age : Number ,
    emailId :String,
    password : String,
    description : String,
    location : String
});

module.exports=mongoose.model('Friends',FriendsSchema);

