const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Review = require('../models/review');
const { isLoggedIn } = require('../middleware');

router.get('/products',async (req,res)=>{
    try{
        const product = await Product.find({});
        res.render("productlanding",{product});
    }catch(e){
        req.flash('error','Can\'t find product');
        res.render('error');
    }
 
})

//NEW
router.get('/products/new',isLoggedIn,(req,res)=>{
    res.render('./newproduct');
});

//CREATE
router.post('/products',isLoggedIn,async (req,res)=>{

    try{
        await Product.create(req.body)
        //console.log(req.body);
        //flash
        req.flash('success','Product Created Successfully');
        res.redirect('/products')
    }catch(e){
        req.flash('error','Oops Something went wrong. Cannot Create product. ');
        res.redirect('/error');
    }
   
});
//SHOW CATEGORY WISE
router.get('/products/:id',async (req,res)=>{
    // const {id} = req.params.id;
    // console.log(req.params.id);
    try{
        const product = await Product.find({pcategory:req.params.id});
        // console.log(product);
        res.render('./product',{product});
    }
   
    catch(e){
        req.flash('error','Oops Something went wrong. Cannot find Product category. ');
        res.redirect('/error');
    }
})

//SHOW
router.get('/products/:id/:pid',async(req,res)=>{
    try{
        const product = await Product.findById(req.params.pid).populate('reviews');
        //console.log(product);
       res.render('./show',{product});
    }
    
   catch(e){
    req.flash('error','Oops Something went wrong. Cannot find product. ');
    res.redirect('/error');
}

})




//get edit pagr
router.get('/products/:id/:pid/edit',isLoggedIn, async(req,res)=>{
    const product = await Product.findById(req.params.pid);
    res.render('edit',{product});

});


//update
router.patch('/products/:id/:pid',isLoggedIn, async(req,res)=>{
    //console.log(req.body);
    try{
        const product = await Product.findByIdAndUpdate(req.params.pid,req.body);
     console.log(req.params.pid);
     const {id}=req.params.id;
     req.flash('success','Product Updated Successfully');
     res.redirect('/products/'+req.params.id);
    }
     
     catch(e){
        req.flash('error','Oops Something went wrong. Cannot Update Product. ');
        res.redirect('/error');
    }

})

//delete
router.delete('/products/:id/:pid',async(req,res)=>{
    try{
        
     const product = await Product.findByIdAndDelete(req.params.pid);
     req.flash('success','Product deleted Successfully');
     res.redirect('/products/'+req.params.id);
    }
    catch(e){
        req.flash('error','Oops Something went wrong. Cannot delete Product. ');
        res.redirect('/error');
    }

})



//Add comment

router.post('/products/:id/:pid/reviews',async (req,res)=>{
  //  console.log(req.body);
    const product = await Product.findById(req.params.pid);
    const review = new Review(req.body);
    // console.log(review);

    product.reviews.push(review);

    await review.save();
    await product.save();

    res.redirect('/products/'+req.params.id+'/'+req.params.pid);
});


router.get('/error',(req,res)=>{
    res.status(404).render('error');
})

module.exports = router;