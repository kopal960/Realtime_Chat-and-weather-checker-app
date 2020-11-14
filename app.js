const express=require("express");
const path=require('path');
const mongoose=require('mongoose');
const ejsMate=require('ejs-mate');
const flash=require('connect-flash');
const Friends=require('./models/friends');
const catchAsync=require('./utils/catchAsync');
const ExpressError=require('./utils/ExpressError');
const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('./models/user');
const findfriends=require('./routes/findfriends')

const userRoutes = require('./routes/users');

mongoose.connect('mongodb://localhost:27017/online-chat', {
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true
});

const db=mongoose.connection;
db.on("error",console.error.bind(console,"Connection Error"));
db.once("open",()=>{
    console.log("Database connected");
});

const app=express();

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded({extended:true}));

app.use(express.static('public'));
// app.use(flash());
// app.use((req,res,next)=>{
//     res.locals.error=req.flash('error');
//     res.locals.success=req.flash('success');
//     next();
// });



app.use('/',userRoutes);

app.get('/',(req,res)=>{
    res.render('landing');
});
app.use('/findfriends',findfriends);

app.listen(3000,()=>{
    console.log('Server Started');
});
