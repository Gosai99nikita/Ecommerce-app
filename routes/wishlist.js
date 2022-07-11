const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const Product = require('../models/product');
const User = require('../models/user');



router.get('/user/:userId/wishlist',isLoggedIn,async (req, res) => {
    
    try {
        const user = await User.findById(req.params.userId).populate('wishlist');
        // console.log(user);
        res.render('wishlist', { userWishlist: user.wishlist });
    }
    catch (e) {
        req.flash('error', 'Unable to get this Wishlist product');
        res.render('error');
    }
});



router.post('/user/:id/wishlist',isLoggedIn, async (req,res)=>{
    try {
        const product = await Product.findById(req.params.id);

        const user = req.user;

        user.wishlist.push(product);

        await user.save();
        req.flash('success', 'Added to Wishlist successfully')
        res.redirect(`/user/${req.user.id}/wishlist`);
    }
    catch (e) {
        req.flash('error', 'Unable to get the Wishlist at this moment');
        res.render('error');
    }

});


router.delete('/user/:userid/wishlist/:id',isLoggedIn, async(req, res) => {

    const { userid, id } = req.params;
    await User.findByIdAndUpdate(userid,{$pull:{wishlist:id}})
    res.redirect(`/user/${req.user._id}/wishlist`);
})



module.exports = router;