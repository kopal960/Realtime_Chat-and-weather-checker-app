const {Schema , model } =require('mongoose');

const FriendsSchema=new Schema({
    name : String,
    age : Number ,
    emailId :String,
    description : String,
    location : String,
    online :  { String , default  : '' },
});

module.exports= model('Friends',FriendsSchema) ;