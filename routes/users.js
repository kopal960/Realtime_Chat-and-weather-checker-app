const express=require('express');
const router=express.Router();
const passport=require('passport');
const catchAsync=require('../utils/catchAsync');

const User=require('../models/user');


router.get('/register',(req,res)=>{
    res.render('users/register');
});

router.post('/register',catchAsync(async(req,res)=>{
    try{
        const {email,username,password ,age , location}=req.body;
        const user =new User({email,username ,age ,location});
        const registeredUser= await User.register(user,password);
        console.log(registeredUser);
        req.flash('success','Welcome to XYZ');
        res.redirect('/');

    }catch(e){
        console.log(e.message);
        req.flash('error',e.message);
        res.redirect('register');
    }
}));

router.get('/login',(req,res)=>{
    res.render('users/login');

});
router.post('/login',passport.authenticate('local',{failureFlash:true, failureRedirect:'/login'}),(req,res)=>{
        res.redirect('/')
});



module.exports=router;