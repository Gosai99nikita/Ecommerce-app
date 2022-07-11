const express = require('express');
const router = express.Router();
const User = require('./models/user');
const passport = require('passport');


//getsingup form
router.get('/register',async(req,res)=>{
    res.render('auth/signup');
})

//register
router.post('/register', async (req, res) => {
    
    try {
        const user = new User({ username: req.body.username, email: req.body.email, firstname: req.body.firstname, lastname: req.body.lastname, phonenumber: req.body.phonenumber, address: req.body.address, userimg: req.body.userimg });
        const newUser = await User.register(user, req.body.password);
        // console.log(newUser)
        req.flash('success', 'Registered Successfully');
        res.redirect('/products');
    }
    catch (e) {
        req.flash('error', e.message);
        res.redirect('/register')
    }
});

// Get the login form
router.get('/login', async (req, res) => {
    
    res.render('auth/login')
})


router.post('/login',passport.authenticate('local',
        {
            failureRedirect: '/login',
            failureFlash: 'Incorrect Username or Password. Please try again !!'
        }
    ), (req, res) => {
        try{
            req.flash('success', `Welcome Back!! ${req.user.username}`)
            res.redirect('/products');
        }catch(e){
             req.flash('error', 'Incorrect Username or password. Please try again !!');
             res.redirect('/login');
        }
        
});

// Logout the user from the current session
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Logged Out Successfully');
    res.redirect('/login');
})

module.exports=router;
