const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const product = require("../models/product");



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
    


exports.getAllProducts =(req,res) =>{
    Product.find().exec((err,products)=>{
        if(err){
            return res.status(400).json({
                error:"no categories found"
            });
        }
        res.json(products);
    })
}

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
   return res.json(reeq.product);
}

//middleware
exports.photo = (req,res,next) =>{
  if(req.product.photo.data){
    res.set("Content-Type",req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
}







