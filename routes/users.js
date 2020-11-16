const express=require('express');
const router=express.Router();
const passport=require('passport');
const catchAsync=require('../utils/catchAsync');

const User=require('../models/user');


router.get('/register',(req,res)=>{
    res.render('users/register');
});

router.post('/register',catchAsync(async(req,res,next)=>{
    try{
        const {email,username,password ,age , location}=req.body;
        const user =new User({email,username ,age ,location});
        const registeredUser= await User.register(user,password);
        
        req.login(registeredUser, err=>{
            if(err) return next(err);
            req.flash('success','Welcome to XYZ');
            res.redirect('/chat/0');
            
        });     

    }catch(e){
        console.log(e.message);
        req.flash('error',e.message);
        res.redirect('register');
    }
}));

router.get('/login',(req,res)=>{
   
   if(!req.user) res.render('users/login');
    else res.redirect('findfriends');
});
router.post('/login',passport.authenticate('local',{failureFlash:true, failureRedirect:'/login'}),(req,res)=>{
    res.redirect('/chat/0')
});
const isLoggedIn=(req,res)=>{
    console.log(req.user);
    if(!req.isAuthenticated()){
        console.log('Welcome');
    }
}
router.get('/logout', (req,res)=>{
    req.flash('success','GoodBye!');
    req.logOut();
    res.redirect('/');
});

router.get('/profile',(req,res)=>{
    res.render('users/profile');
});

module.exports=router;