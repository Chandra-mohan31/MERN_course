const express = require('express');

const app = express();

app.get('/',(req,res)=>{
    res.send('Hello devs');
})

app.get('/login',(req,res)=>{
    res.send('Hello devs ur in login page');
})

const admin = (req,res)=>{
    return res.send("Admin Dashboard")
}

//middleware funcs
const isLoggedIn = (req,res,next)=>{
    console.log("isLogged In");
    next();
}
const isAdmin = (req,res,next) => {
    console.log("isAdmin is running");
    next();
}

app.get("/admin",isLoggedIn,isAdmin,admin);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})