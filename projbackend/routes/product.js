const express = require("express");
const router = express.Router();

const {getAllProducts,createProduct,getProduct,getProductById, photo} = require("../controllers/product");
const {getCategoryById,getCategory} = require("../controllers/category");
const {isAdmin,isAuthenticated,isSignedIn} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");

//params
router.param("userId",getUserById);
router.param("productId",getProductById);  //if there is product id in params of the route the middleware getProductById gets executed;
//router.param("categoryId",getCategoryById);


//actual routes goes here

router.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct);
router.get("/product/:productId",getProduct);
router.get("/product/photo/:productId",photo);

module.exports = router;

//side note - missed saving put request in postman,