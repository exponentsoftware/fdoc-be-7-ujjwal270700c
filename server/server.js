const express=require('express');
const morgan = require('morgan');
const app=express();
require('./models')
//app.use('/api')
app.get('/',(req,res)=>{
    res.send("Welcome")
})

const server=app.listen(process.env.PORT || 5000 ,()=>{
    console.log(`server started at ${server.address().address}:${server.address().port}`);
})