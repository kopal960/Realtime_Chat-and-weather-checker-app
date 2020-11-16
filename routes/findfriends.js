const express=require('express');
const router=express.Router();
const Friends = require('../models/user');

router.get('/',async(req,res)=>{
    const friends=await Friends.find({});
    res.render('findfriends/index',{friends});
});

router.get('/:id',async(req,res)=>{
    const friend=await Friends.findById(req.params.id);
    res.render('findfriends/show',{friend});
});

module.exports=router;