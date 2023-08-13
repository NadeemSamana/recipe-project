const {productSchema, reviewSchema} = require('../E-Commerce-V6/schemas');


module.exports.loggedIn = (req,res,next)=>{

    if(!req.isAuthenticated()){
        req.flash('reject', 'log-in first');
        return res.redirect('/login');
    }
}

module.exports.validateProduct = (req, res, next)=>{
    const {name, img, price, desc} = req.body;
    const {error} = productSchema.validate({name, img, price, desc});

    // console.log(error.details[0].message);
    if(error){
        const msg = error.details.map((err) => err.message).join(',');
        return res.render('products/error', { err: msg });
    }
    next();
}

module.exports.validateReviews = (req, res, next)=>{
    const {rating, comment} = req.body;
    const {error} = reviewSchema.validate({rating,comment});

    // console.log(error.details[0].message);
    if(error){
        const msg = error.details.map((err) => err.message).join(',');
        return res.render('products/error', { err: msg });
    }
    next();
}

