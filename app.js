if(process.env.Node_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express');
const app = express();
const path = require('path');
const methodOverride =require('method-override');
//const seedDB =require('./seed');
const mongoose = require('mongoose');
const session=require('express-session');
const flash = require('connect-flash');
// const passport=require('passport');
const localStrategy = require('passport-local');
const User = require('./models/user');
const authRoutes=require('./routes/auth');

const productRoutes = require('./routes/product');
const passport = require('passport');
const cartRoutes =require('./routes/cart');
const wishlistRoutes =require('./routes/wishlist');

//Connect Mongoose
mongoose.connect(process.env.DB_URL,{
    
     useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify:false,
        useCreateIndex:true
})
    .then((data) => {
        console.log("DB Connected");
    })
    .catch((err) => {
        console.log("OH NO ERROR!!!");
        console.log(err);
    });

//seedDB();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));





//sessionmiddleware
const sessionConfig ={
    secret:'weneedsomebettersecret',
    resave:false,
    saveUninitialized:true,
}

app.use(session(sessionConfig));
app.use(flash());
//initializig passort
app.use(passport.initialize());
app.use(passport.session());

//cofig passport to use local strategy
passport.use(new localStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//response locals- available on all templates
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    // console.log(currentUser);
    next();
})

app.get('/',(req,res)=>{
    res.redirect("/products");
})




app.use(productRoutes);
app.use(authRoutes);
app.use(cartRoutes);
app.use(wishlistRoutes);

app.listen(process.env.PORT || 3000,()=>{
    console.log("Server Running");
})
