const express = require('express');
const router = express.Router();
const {signout,signup,signin} = require("../controllers/auth")
const {check,validationResult} = require("express-validator");


router.post("/signup",[
    check("name").isLength({ min:3 }).withMessage('must be at least 5 chars long'),
    check("email").isEmail().withMessage("email is required"),
    check("password").isLength({min:3}).withMessage("password should be 3 chars long")
],signup);

router.post("/signin",[
    
    check("email").isEmail().withMessage("email is required"),
    check("password").isLength({min:3}).withMessage("password is required")
],signin);




router.get("/signout",signout);

module.exports = router;
