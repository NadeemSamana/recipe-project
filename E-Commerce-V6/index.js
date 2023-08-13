const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsmate = require('ejs-mate');
const methodoverride = require('method-override');
const connectflash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./modules/user')
const port = 5000;


mongoose.connect('mongodb://127.0.0.1:27017/e-commerce')
    .then(()=>{console.log('DB connected')})
    .catch(err => console.log('err'));



const sessionconfig = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}


app.engine('ejs', ejsmate);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(methodoverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));

app.use(session(sessionconfig));
app.use(connectflash());

app.use((req,res,next)=>{
    res.locals.currentuser = req.user;
    res.locals.success = req.flash('success');
    res.locals.reject = req.flash('reject');
    next();
})


app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




const productroute = require('./routes/product');
const reviewroute = require('./routes/review');
const authroute = require('./routes/auth');


app.use(productroute);
app.use(reviewroute);
app.use(authroute);


app.get('/', (req,res)=>{
    res.send('Working Fine');
})


app.listen(port, ()=>{
    console.log('server is up at port', port);
})



