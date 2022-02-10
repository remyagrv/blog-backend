// server syntax-we use require for importing
const express = require('express');
var http = require('http');
const cors = require('cors');
const ArticleInfo = require('./src/model/Blogdb');
const RegistrationInfo = require('./src/model/Registerdb');
const { rawListeners } = require('process');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const path = require('path');
app.use(express.static('./build/'));


// backend routing
app.get('/api/article/:name', (req,res)=>{
    // res.header("Access-Control-Allow-Origin","*");
    // res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    const articleName = req.params.name;
    ArticleInfo.findOne({name:articleName}).then(function(article){
        res.json(article);
    })
})
// for login
app.post('/api/login', async (req,res)=>{
   const {username, password} = req.body;
   console.log(req.body);
   const user = await   RegistrationInfo.findOne({username, password}) .then(function(user){

    if(!user) {
         res.json(user);
        console.log(user);
                
        // res.send({message: "User not registered."});
                }  else
                {
                    res.json(user);
        console.log(user);
        // res.send({message: "Login Successfull"});
                }
    // // console.log(user); 
    // RegistrationInfo.findOne({username: username}, (err, user) =>{
    //     if(user){
    //         if(password === user.password){
    //             res.send({message: "Login Successfull", user: user})
    //         } else{
    //             res.send({message: "Password didn't match"})
    //         } }
    //     else {
    //             res.send({message: "User not registered."})
    //         }
        }
   )

// for registration
app.post('/api/registration/signup', (req,res)=>{
   
    var userdata = {
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
        
    }
    console.log(userdata)  ;
    const user = new RegistrationInfo(userdata);
    user.save();
    
    // res.send(user);
    // db.registration.insertOne(userdata, (err, data) => {
    //     if(err) return console.log(err);
    //     res.send((RegistrationInfo));
     });
 })



// upvote routing
app.post('/api/article/:name/upvotes', (req,res)=>{
    const articleName = req.params.name;
   const filter = {name:articleName}
   const update = {$inc: { upvotes: 1}};
    ArticleInfo.findOneAndUpdate(filter,update, {new: true})
    .then(function(article){
        res.json(article);
    })
})
// for comments
app.post('/api/article/:name/comments', (req,res)=>{
    const articleName = req.params.name;
    const { username, text } = req.body; 
  
    const filter = {name:articleName}
    const update ={$push: { comments: { username, text }}};
    ArticleInfo.findOneAndUpdate(filter,update, {new: true})
    .then(function(article){
        res.json(article);
    });
})
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("Port"+PORT);
})