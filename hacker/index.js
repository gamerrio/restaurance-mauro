const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname+"/assets/bootstrap/css"));
app.use(express.static(__dirname+"/assets/bootstrap/js"));
app.use(express.static(__dirname +"/assets/css"));
app.use(express.static(__dirname +"/assets/img"));
app.use(express.static(__dirname +"/assets/js"));

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb+srv://yoloboi279:YteDiiLyLG6tUTgQ@cluster0.fwmh80u.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser: true});

var login =new mongoose.Schema({
    name:String,
    pass:String,
    person:String,
});

const loginup =new mongoose.model('document', login);  // main hai ye dbs ka 

app.post('/signup.html',(req,res)=>{
    var temp =loginup({
        name: req.body.mail,
        pass: req.body.pass,
        person: req.body.name,
    });
    const name = req.body.mail;
     const pass = req.body.pass;
      const person = req.body.name;
      const rep = req.body.repeat;
    if(name=="" || pass=="" || person=="" || rep==""){
        res.send("please fill this information");
    }

    else if(pass!=rep){
         res.send("password does not  match");
    }

    else{
    temp.save();
    console.log(temp);
    }

    function generateOTP() {
        var digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 4; i++ ) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
    }

    var tempotp =  generateOTP() ;


// yha se start hai mail box



const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'ra0001j@gmail.com',
        pass: 'lztneumdqnfhiwaf'
    } 
});
    const name2 = req.body.mail;
    var mailOptions = {
      from: 'ra0001j@gmail.com',
      to: name2,
      subject: 'thanks for registration',
      text: 'Welcome to  website your otp is ' + tempotp
    };



    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

//end
    res.send("sucess");})

app.post('/login.html',async (req,res)=>{
  const nam =  req.body.email;
  const pas = req.body.passs;

    const client = await MongoClient.connect(
        'mongodb+srv://yoloboi279:YteDiiLyLG6tUTgQ@cluster0.fwmh80u.mongodb.net/test',
        { useNewUrlParser: true, useUnifiedTopology: true }
      );
      const coll = client.db('test').collection('documents');
      const cursor = coll.find({name:nam});
      const result = await cursor.toArray();
       const k = result[0].person;
       const l = result[0].name;
      const t = result[0].pass;
        if(t===pas){
     let names = k;
     res.render('profile',{
        userName: k,
        usermail: l,
     });
    res.sendfile("shop.html");
        }
     else{
     res.send("password or username wrong plz check them");
      }

})



app.get('/login.html',(req,res)=>{
    res.sendfile('login.html');
})

app.get('/signup.html',(req,res)=>{
    res.sendfile('signup.html');
})

app.listen(port,(req,res)=>{
    console.log(`server start  ${port}`);
})


var nodemailer = require('nodemailer');


//ejs

//shope js


var login =new mongoose.Schema({
    item:String,
    food:String,
    pic:String,
    price:String,
});

// const loginup =new mongoose.model('food', login); 
app.post('/index.html',(req,res)=>{
    var temp =loginup({
        item:req.body.item,
        food: req.body.food,
        pic: req.body.pic,
        price: req.body.price
                    });
    temp.save();
    console.log(temp);
    res.send("sucess")
});

// app.get('/shop.html',(req,res)=>{
//     res.sendfile('shop.html');
// })

app.use(express.static(__dirname+"/img"));

app.get('/shop.html',async (req,res)=>{

// online mongo ka data 
  
  const client = await MongoClient.connect(
    'mongodb+srv://yoloboi279:YteDiiLyLG6tUTgQ@cluster0.fwmh80u.mongodb.net/test',
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  const coll = client.db('test').collection('foods');
  const cursor = coll.find();
  const result = await cursor.toArray();
  const t = result[0].food;
  const l = result[0].price;
  const k = result[0].pic;
    const nam = result[0].item;
    res.render('profile',{
        userfood: t,
        userprice: l,
        userpic: k ,
        useritem: nam,
        items:result
      });
  console.log(result);

});























app.use(express.static(__dirname+"/assets3/bootstrap/css"));
app.use(express.static(__dirname+"/assets3/bootstrap/js"));
app.use(express.static(__dirname+"/assets3/css"));
app.use(express.static(__dirname+"/assets3/img"));
app.use(express.static(__dirname+"/assets3/js"));
app.get('/',(req,res)=>{
  res.sendfile('land.html');});

const ejs = require('ejs');
app.set('view engine', 'ejs');
