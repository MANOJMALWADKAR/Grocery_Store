
const Product = require("../models/productModels");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary")




//create product -- ADMIN
exports.createProduct = catchAsyncError(async (req, res, next) => {

    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        })
        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        })
    }
    req.body.images = imagesLinks
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    });
});


// GET ALL PRODUCTS
exports.getAllProducts = catchAsyncError(async (req, res) => {

    // return next(new ErrorHandler("this is my temp error"))
    //total product shown per page
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()


    let products = await apiFeature.query;
    let filteredProductsCount = products.length;

    apiFeature.pagintaion(resultPerPage);

    products = await apiFeature.query.clone(); //modified code cause getting error query already executed


    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    })
})


// GET ALL PRODUCTS(ADMIN)
exports.getAdminAllProducts = catchAsyncError(async (req, res) => {

    const products = await Product.find()

    res.status(200).json({
        success: true,
        products,

    })
})

// Get Product Details 
exports.getProductDetails = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
    }

    res.status(200).json({
        success: true,
        product,

    })
})





// UPDATE PRODUCT -- ADMIN

exports.updateProduct = catchAsyncError(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    // if (!product) {
    //     return res.status(500).json({
    //         success: false,
    //         message: "product not found"
    //     })
    // }
    //instead of this 
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
    }

    //UPDATE THE IMAGES
    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images
    }

    if (images !== undefined) {
        //DELTING IMAGES FROM CLOUDINARY
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            })
            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            })
        }
        req.body.images = imagesLinks
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
})

// Delete product

exports.deleteProduct = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    // if (!product) {
    //     return res.status(500).json({
    //         success: false,
    //         message: "Product Not Found"
    //     })
    // }
    //instead of this 
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
    }

    //DELETING IMAGES FROM CLOUDINARY
    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }

    await product.deleteOne()

    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully"
    });
});


//Create New Review or Update review
exports.createProductReview = catchAsyncError(async (req, res, next) => {

    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
        product.reviews.forEach(rev => {
            if (rev.user.toString() === req.user._id.toString())
                rev.rating = rating,
                    rev.comment = comment
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
        avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    })
});


//Get All Reviews of Product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("Product NOt Found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    })

});

//Delete Review
exports.deleteReview = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product NOt Found", 404));
    }

    const reviews = product.reviews.filter(
        (rev => rev._id.toString() !== req.query.id.toString())

    );

    let avg = 0;

    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    let ratings = 0

    if (reviews.length === 0) {
        ratings = 0
    } else {
        ratings = avg / reviews.length;
    }


    console.log(avg)
    console.log(reviews.length)
    console.log(ratings)

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

    res.status(200).json({
        success: true,

    })

});

