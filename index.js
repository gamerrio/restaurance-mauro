const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended: true}));
var database = require('../mysql');

app.post('/signup.html',(req,res)=>{
    var temp =loginup({
        name: req.body.mail,
        pass: req.body.pass,
        person: req.body.namo,
        number: req.body.number,
    });
    const name = req.body.mail;
     const pass = req.body.pass;
      const person = req.body.namo;
      const rep = req.body.repeat;
      const num1 = req.body.number;
    if(name=="" || pass=="" || person=="" || num1==""){
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
        user: 'restaurance.mauro@gmail.com',
        pass: ''
    } 
});
    const name2 = req.body.mail;
    var mailOptions = {
      from: 'restaurance.mauro@gmail.com',
      to: name2,
      subject: 'thanks for registration',
      text: 'Welcome to website your otp is ' + tempotp
    };



    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

//end
    res.sendfile('sucessSign.html');})

// app.post('/login.html',async (req,res)=>{
//   const nam =  req.body.maill;
//   const pas = req.body.passs;
//  const username =  await loginup.findOne({name:nam});
//  const t = username.pass;
//  const k = username.person;
//  const l = username.name;
//  const number1 = username.number;
//  console.log(k);
// if(t===pas){
//     let names = k;
//     res.render('profile',{
//       userName: names,
//       usermail: l,
//       number: number1
//     });
// }
// else{
//     res.send("password or username wrong plz check them");
// }

// })


var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express', session : req.session });
// });

// router.post('/login', function(request, response, next){

//     var user_email_address = request.body.user_email_address;

//     var user_password = request.body.user_password;

//     if(user_email_address && user_password)
//     {
//         query = `
//         SELECT * FROM user_login 
//         WHERE user_email = "${user_email_address}"
//         `;

//         database.query(query, function(error, data){

//             if(data.length > 0)
//             {
//                 for(var count = 0; count < data.length; count++)
//                 {
//                     if(data[count].user_password == user_password)
//                     {
//                         request.session.user_id = data[count].user_id;

//                         response.redirect("/");
//                     }
//                     else
//                     {
//                         response.send('Incorrect Password');
//                     }
//                 }
//             }
//             else
//             {
//                 response.send('Incorrect Email Address');
//             }
//             response.end();
//         });
//     }
//     else
//     {
//         response.send('Please Enter Email Address and Password Details');
//         response.end();
//     }

// });

// router.get('/logout', function(request, response, next){

//     request.session.destroy();

//     response.redirect("/");

// });

// module.exports = router;




app.get('/login.html',(req,res)=>{
    res.sendfile('login.html');
})

app.get('/signup.html',(req,res)=>{
    res.sendfile('signup.html');
})

app.listen(PORT,(req,res)=>{
    console.log(`server start ${PORT} `);
})


var nodemailer = require('nodemailer');


//ejs
const ejs = require('ejs');
app.set('view engine', 'ejs');
