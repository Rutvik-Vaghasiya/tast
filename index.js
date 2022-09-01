const express = require('express');
const bodyparser = require('body-parser');
const port =2022;
const app = express();
const mainfile =require('./routers/mainfile')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(function(req, res, next) {
    // res.header('Access-Control-Allow-Origin', "http://cbadmin.dev.cb-compliancebrain.io");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, withCredentials');
    next();
  });


app.get('/',(req,res)=>{
    res.send("hello world")
})
app.get("/test",async(req,res)=>{
    var contactList = ['+91 1234567890', '+911234567890','1234567890','1234567890','+91 2345654323']
    var result = await mainfile.MyFunction(contactList);
    res.send(result)
})


app.listen(port,()=>{
    console.log("server is run on "+port)
})


