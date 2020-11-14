const express=require('express');
const router=express.Router();

router.get('/',async(req,res)=>{
    const friends=await Friends.find({});
    res.render('/index',{friends});
});
router.get('/new',(req,res)=>{
    res.render('findfriends/new')
});
router.post('/',async(req,res)=>{
    const friend=new Friends(req.body.friends);
    await friend.save();
    res.redirect(`/findfriends/${friend._id}`);
});
router.get('/:id',async(req,res)=>{
    const friend=await Friends.findById(req.params.id);
    res.render('findfriends/show',{friend});
});

module.exports=router;