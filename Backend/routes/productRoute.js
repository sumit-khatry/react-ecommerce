const express = require("express");
const { getAllProducts,
    createProduct,
    updateProduct, 
    deleteProduct,
    getProductDetails, 
    createProductReview,
    getProductReviews,
    getAdminProducts,
    deleteReview,
 } = require("../controllers/productController");
const { isAuthenticationUser,authorizeRoles } = require("../middleware/authen");

const router = express.Router();

//making route and giving path of allproducts
router.route("/products").get( getAllProducts);

//making path for admin to get the produts details
router.route("/admin/products").get(isAuthenticationUser,authorizeRoles('admin'), getAdminProducts)

router.route("/admin/product/new").post(isAuthenticationUser, authorizeRoles("admin"),createProduct);
router.route("/admin/product/:id")
.put(isAuthenticationUser, authorizeRoles("admin"),updateProduct)
.delete(isAuthenticationUser, authorizeRoles("admin"),deleteProduct);

router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthenticationUser, createProductReview);

router.route("/reviews").get(getProductReviews).delete(isAuthenticationUser,deleteReview);

//exporting router
module.exports = router