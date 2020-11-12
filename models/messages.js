const mongoose =require('mongoose');
const Friends  = require("./friends.js")
const MessageSchema = new mongoose.Schema ({
    sender :{
        type : mongoose.Schema.Types.ObjectId,
        ref : Friends,
        required : true,
    } ,
    msg : {
        type : String,
        required : true
    },
    chat_id : {
        type : String,
        required: true,
    }
})

module.exports= mongoose.model('Messages', MessageSchema);