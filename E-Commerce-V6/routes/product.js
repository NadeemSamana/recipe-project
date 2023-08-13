const express = require('express');
const product = require('../modules/product');
const Review = require('../modules/review');
const { validateProduct, loggedIn } = require('../middlewares');
const route = express.Router();



route.get('/products', async (req,res)=>{
    
    try {
        const products = await product.find({});

        // res.send(products);
        res.render('products/index', {products});
    } 
    catch (e) {
        res.render('products/error', {err: e.message});
    }
})

route.get('/products/new', loggedIn, (req,res)=>{

    try {
        res.render('products/new');
    } 
    catch (e) {
        res.render('products/error', {err: e.message});
        
    }
})

route.post('/products', validateProduct, async (req,res)=>{

    try {
        console.log(req.body);
        await product.create(req.body);

        req.flash('success', 'Added your product successfully');

        res.redirect('/products');
        // res.send('successfully update data');
    } 
    catch (e) {
        res.render('products/error', {err: e.message});
    }
})

route.get('/products/:id', async (req,res)=>{

    try {
        const {id} = req.params;
        const products = await product.findById(id).populate('reviews');
        // console.log(products);
    
        res.render('products/show', {products, msg: req.flash('msg')});
    } 
    catch (e) {
        res.render('products/error', {err: e.message});
    }
})

route.get('/products/:id/edit', loggedIn, async (req,res)=>{

    try {
        const {id} = req.params;
        const products = await product.findById(id);
        res.render('products/edit', {products});
    
        // res.send('edit page');
    } 
    catch (e) {
        res.render('products/error', {err: e.message});
    }
})

route.patch('/products/:id', async (req,res)=>{

    try {
        const {id} = req.params;

        req.flash('success', 'Edited your product successfully');

        await product.findByIdAndUpdate(id, req.body);
        res.redirect(`/products/${id}`);
    } 
    catch (e) {
        res.render('products/error', {err: e.message});
    }
})

route.delete('/products/:id', loggedIn, async (req,res)=>{

    try {
        const {id} = req.params;

        const prodo = await product.findById(id);
    
        for(let reviewID of prodo.reviews){
            await Review.findByIdAndDelete(reviewID);
        }
    
        await product.findByIdAndDelete(id);

        req.flash('success', 'Deleted your product successfully');

        res.redirect(`/products`);
    } 
    catch (e) {
        res.render('products/error', {err: e.message});
    }
})


module.exports = route;


