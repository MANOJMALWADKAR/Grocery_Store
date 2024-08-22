const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview, getAdminAllProducts } = require("../controller/productController");
const { isAunthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();


router.route("/products").get(getAllProducts);

router
    .route("/admin/products")
    .get(isAunthenticatedUser, authorizeRoles("admin"), getAdminAllProducts)

router.
    route("/admin/product/new")
    .post(isAunthenticatedUser, authorizeRoles("admin"), createProduct);

router.
    route("/admin/product/:id").
    put(isAunthenticatedUser, authorizeRoles("admin"), updateProduct).
    delete(isAunthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAunthenticatedUser, createProductReview);

router
    .route("/reviews")
    .get(getProductReviews)
    .delete(isAunthenticatedUser, deleteReview)


module.exports = router