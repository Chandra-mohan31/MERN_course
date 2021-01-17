const express = require("express");
const router = express.Router();

const {getAllProducts,createProduct,getProduct,getProductById,getAllUniqueCategories, updateProduct,deleteProduct,photo} = require("../controllers/product");
const {getCategoryById,getCategory} = require("../controllers/category");
const {isAdmin,isAuthenticated,isSignedIn} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");

//params
router.param("userId",getUserById);
router.param("productId",getProductById);  //if there is product id in params of the route the middleware getProductById gets executed;
//router.param("categoryId",getCategoryById);


//actual routes goes here

//create route
router.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct);
//read route
router.get("/product/:productId",getProduct);
router.get("/product/photo/:productId",photo);


//delete route
router.delete("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteProduct);
//update route
router.put("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,updateProduct);



//listing route
router.get("/products",getAllProducts);

router.get("/products/categories",getAllUniqueCategories)


module.exports = router;

//side note - i missed saving put request in postman,