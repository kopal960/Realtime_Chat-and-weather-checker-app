const express=require('express');
const router=express.Router();
const Friends = require('../models/user')
const Messages = require('../models/messages')

router.get('/:chat_id', (req,res)=>{
    if(!req.isAuthenticated()){
        req.flash('error','Please Login');
        return res.redirect('/login');
    }
    else
    {
        data = {'id':req.user._id , 'chat_id' : req.params.chat_id};
        Friends.findOne( {"_id" : data.id}, '_id username'   ,function(err , result){
        if(err)
        {res.status(500).send("internal server error")}
        else
        {
            Friends.find({} , '_id username online' , function(err, users){
            if(err) 
                res.status(500).send("Internal server error");
            else
            {  
                if(data.chat_id==0) 
                    chat_id =0;
                else
                    var chat_id = (data.id > data.chat_id? data.chat_id+data.id: data.id+data.chat_id);
                Messages.find( {chat_id } ).lean().exec(
                    function (err ,msgs) {
                        if(err)
                            { res.status(500).send("Internal Server error");}
                        else
                        {
                            var chatname;
                            async function addinfo (){ 
                                msgs = await Promise.all( msgs.map(async (msg) =>  
                                {
                                    await Friends.findById(msg.sender).then(friend =>{ msg["sendername"] =friend.username ; })
                                    .catch(err => {res.status(500).send("Internal Server error")})
                                    return msg
                                })
                            )}
                            async function addname(){
                                if(data.chat_id==0)
                                {
                                    chatname = "Community";
                                }    
                                else
                                {
                                    await Friends.findById(data.chat_id).then( friend=>{
                                        if(err || !friend) 
                                            res.status(404).send("Chat you are looking for is not found");
                                        else
                                            chatname = friend.username;
                                    })
                                } 
                            }
                            addinfo().then(()=>{
                                addname().then(()=>{
                                    res.render('chats.ejs', {users , receiver: result , msgs , chatname , chat_id:data.chat_id} );
                                })
                            })
                        }
                    }
                ) 
            }     
        })
    }
    })
    }
})

module.exports = router;