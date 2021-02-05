const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const product = require("../models/product");
const { sortBy } = require("lodash");
const category = require("../models/category");



exports.getProductById = (req, res, next, id) => {
        Product.findById(id)
          .populate("category")
          .exec((err, product) => {
            if (err) {
              return res.status(400).json({
                error: "product not found in DB"
              });
            }
            req.product = product;
            next();
        });
      };
    



exports.createProduct = (req,res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req,(err,fields,file)=>{
    if(err){
      return res.status(400).json({
        error:"problem with the image"
      })
    }
    //destructure fields
    const {name,description,price,category,stock} = fields;

    if(
      !name || 
      !description ||
      !price ||
      !category ||
      !stock
    ){
      return res.status(400).json({
        error:"please include all fileds"
      })
    }
  


    
    let product = new Product(fields); 
    //handle file here
    if(file.photo){
      if(file.photo.size > 3000000){
        return res.status(400).json({
          error:"size of the file is too big"
        })
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;

    }
  console.log(product);


    //save to db
    product.save((err,product)=>{
      if(err){
        return res.status(400).json({
          err:"cant save to the db"
        })
      }
      res.json(product);
      
    })
  })
};

exports.getProduct = (req,res) =>{
  req.product.photo = undefined;
   return res.json(req.product);
}

//middleware
exports.photo = (req,res,next) =>{
  if(req.product.photo.data){
    res.set("Content-Type",req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
}

exports.deleteProduct = (req,res) =>{
  let product = req.product;
  product.remove((err,deletedProduct)=>{
    if(err){
      return res.status(400).json({
        err:"failed to delete product"
      })
    }
    res.json({
      message:"deleted successfully",
      deletedProduct
    })
  })
}
exports.updateProduct = (req,res) =>{
  
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req,(err,fields,file)=>{
    if(err){
      return res.status(400).json({
        error:"problem with the image"
      })
    }
    //destructure fields
    const {name,description,price,category,stock} = fields;

    


    //updation code:
    let product = req.product;
    product = _.extend(product,fields)
    //handle file here
    if(file.photo){
      if(file.photo.size > 3000000){
        return res.status(400).json({
          error:"size of the file is too big"
        })
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;

    }
   //console.log(product);


    //save to db
    product.save((err,product)=>{
      if(err){
        return res.status(400).json({
          err:"updation of the product failed"
        })
      }
      res.json(product);
      
    })
  })
 
  

}


exports.getAllUniqueCategories = (req,res) => {
  Product.distinct("category",{},(err,category)=>{
    if(err){
      return res.status(400).json({
        err:"no category found"
      })
    }
    res.json(category);
  })
}

//product listing
exports.getAllProducts =(req,res) =>{
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id"; 
  //sort example : Product.find().sort([['updatedAt','descending']])
  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err,products)=>{
      if(err){
          return res.status(400).json({
              error:"no products found"
          });
      }
      res.json(products);
  })
}

exports.updateStock = (req,res,next) =>{

  let myOperations = req.body.order.products.map(prod =>{
    return {
      updateOne : {
        filter: {_id: prod._id},
        update: {$inc: {stock: -prod.count ,sold:+prod.count}}//count will be thrown from the frontend
      }
    }
  })

  Product.bulkWrite(myOperations,{},(err,products)=>{
    if(err){
      return res.status(400).json({
        err:"bulk operation failed"
      })
    }
    next();
  })
}




