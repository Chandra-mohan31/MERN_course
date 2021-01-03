const express = require('express');

const app = express();

app.get('/',(req,res)=>{
    res.send('Hello devs');
})

app.get('/login',(req,res)=>{
    res.send('Hello devs ur in login page');
})



const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})