
const isLoggedIn = (req,res,next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'User is not Logged in . Please Login first.');
        return res.redirect('/login');
    }
    next();
}


module.exports = {
    isLoggedIn:isLoggedIn
}