const express=require('express');
const router=express.Router();
const Friends = require('../models/user')
const Messages = require('../models/messages')

router.get('/:chat_id', (req,res)=>{
    console.log(req.isAuthenticated());
        if(!req.isAuthenticated()){
            req.flash('error came','Please Login');
            return res.redirect('/login');
        }
        else
        {
            console.log(req.user._id);
            data = {'id':req.user._id , 'chat_id' : req.params.chat_id};
            Friends.findOne( {"_id" : data.id}, '_id username'   ,function(err , result){
            if(err)
            {res.status(500).send("")}
            else if(result==null)
            {res.status(403).send("access firbidden")}
            else
            {
                console.log(result);
                Friends.find({} , '_id username online' , function(err, users){
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
                            else  chatname = friend.username;
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
                                      await Friends.findById(msg.sender).then(friend =>{ msg["sendername"] =friend.username ; })
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
       }
    }
    /* if(req.session.passport.user!=undefined)
    {
        
    }
    else
    {
        console.log(req.session.passport.user);
        res.render('users/login');
    }  } */   
 )

module.exports = router;