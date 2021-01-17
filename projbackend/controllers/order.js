const {Order,ProductCart} = require("../models/order");

exports.getOrderById = (req,res,next,id) =>{
    Order.findById(id)
        .populate("products.product","name price")
        .exec((err,order)=>{
        if(err){
            res.status(400).json({
                err:"no order found in the db"
            })
        req.order = order;
        next();
        }
    })
}

exports.createOrder = (req,res) =>{
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((err,order)=>{
        if(err){
            return res.status(400).json({
                err:"failed to save the order in the DB"
            })
            
        }
        res.json(order);

    })
}

exports.getAllOrders = (req,res) =>{
    Order.find()
        .populate("user","_id name")
        .exec((err,order)=>{
            if(err){
                return res.status(400).json({
                    err:"no orders found in DB"
                })
            }
            res.json(order);
        })
}


exports.getOrderStatus = (req,res) => {
    res.json(Order.schema.path("status").enumValues);//test this
}


//check this code 
exports.updateStatus = (req,res) =>{
        Order.update(
            {_id: req.body.orderId},
            {$set: {status: req.order.status}},
            (err,order) => {
                if(err){
                    return res.status(400).json({
                        err:"cant update order status"
                    })
                }
                res.json(order)
            }
        )
}