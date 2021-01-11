require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require('mongoose');
//my routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

//db connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=>{
    console.log("DB CONNECTED");
})
.catch(()=>{console.log("DB NOT CONNECTED")});

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


//my routes
app.use("/api",authRoutes);
app.use("/api",userRoutes);


//port
const port = process.env.PORT || 8000;

//starting a server
app.listen(port,()=>{
    console.log(`App is running on port ${port}`);
})