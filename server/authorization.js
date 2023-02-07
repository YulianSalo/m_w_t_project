const express = require('express');
const router = express.Router();
const mongoose = require("./mongoose");
const CryptoJS= require("crypto-js");
const nodemailer=require("nodemailer");

var SignupSchema = new mongoose.Schema( {name:String,phone:String,username: {type:String,unique:true}, pass: String, usertype:String, userhash:String, activated:Boolean},
  { versionKey: false } );

var SignupModel = mongoose.model("signup", SignupSchema,"signup");
// SignupModel is the way we will use the model
//2nd singup is collection(table name)
//1st signup is internal name of model

router.post("/signup", function(req, res) {

  //
  // NOTE IN THE SIGNUPMODEL BELOW AS WE'RE SENDING THE JSON OBJECT DIRECTLY FROM THE ANGULAR CLASS, SO ITS KEYS WILL BE
  // THE KEYS OF CLASS, SO THAT'S WHY WE HAVE TO CHANGE THE FOLLOWING MODEL APPROPRIATELY
  //

  var uhash = CryptoJS.MD5(Date.now() + req.body.username).toString();
  var newsignup = new SignupModel( {name:req.body.name, phone:req.body.phone, username:req.body.username, pass:req.body.pass, usertype:req.body.usertype, userhash:uhash, activated:false} );

  // newsignup is obj, we have to create an obj in order to use a model

  //save fn is the way mongoose insert data inside the mongodb
  newsignup.save(function(err,data) {
    if (err)
    {
      console.log(err);
      res.send("Error while signing up, try again");
    }
    else
    {
      var transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
          user:'doesntexist514@gmail.com',
          pass:'jufwmbexxwawoeuz'
        }
      });
      var mailoptions={
        from:'doesntexist514@gmail.com',
        to:req.body.username,
        subject:'Account Activation Link',
        html: 'To Activate you account '+ 'Click <a href= "http://localhost:4200/activate?userhash=' + uhash + '"> Here </a> '
      };
      transporter.sendMail(mailoptions,function(error,info)
      {
        if(error)
        {
          console.log("Error sending mail" + error);
        }
        else
        {
          console.log("Mail send" + info.response);
        }
      });

      res.send("Signup Successfull");
      // res.send("Thanks for registering with us ")
      // res.send(data)
      //data will contain all the data inserted by us along with the unique id of the user in the database
      // helpful if we have to retrieve something from db

    }

  });
});

router.put("/activateaccount", function(req, res) {

  console.log(req.body);

  SignupModel.updateOne({ userhash:req.body.uhash}, {$set: {activated: true }} ,function(err, data)
  {
    if (err)
    {
      console.log(err);
      res.send("Failed");
    }
    else
    {
      console.log(data);
      res.send(data);

    }

  });
});

//members list

router.get("/memlist", function(req, res) {

  console.log(req.query);
  //here before find we have to give the name of the model
  SignupModel.find(function(err, data)
  {
    if (err)
    {
      console.log(err);
      res.send(err);
    }
    else
    {
      console.log(data);
      res.send(data);
    }

  });
});

router.get("/searchuser", function(req, res) {

console.log(req.query);

//.find({username : req.query.queryvaraible})
SignupModel.find({ username:req.query.uname}, function(err, data)
{
  if (err)
  {
    console.log(err);
    res.send(err);
  }
  else
  {
    console.log(data);
    res.send(data);

  }

});
});

router.post("/login", function(req, res) {

console.log(req.body);

SignupModel.find({ username:req.body.uname}, function(err, data)
{
  if (err)
  {
    console.log(err);
    res.send(err);
  }
  else
  {
    console.log(data);
    res.send(data);

  }

});
});

//note to delete we have html delete method
router.delete("/deluser", function(req, res) {

console.log(req.query);

SignupModel.remove({ _id: req.query.uid }, function(err, data)
{
  if (err)
  {
    console.log(err);
    res.send("Failed");
  }
  else
  {
    console.log(data);
    res.send(data);

  }

});
});


//try
router.put("/forgetpassword", function(req, res) {

console.log(req.body);

SignupModel.updateOne({ username:req.body.uname, phone:req.body.phone}, {$set: {pass:req.body.newpass}} ,function(err, data)
{
  if (err)
  {
    console.log(err);
    res.send(err);
  }

  else
  {

    console.log(data);
    res.send(data);

  }

});
});

router.put("/setnewpass", function(req, res) {

  console.log(req.body);

  SignupModel.updateOne({ username:req.body.uname}, {$set: {pass:req.body.npass}} ,function(err, data)
  {
    if (err)
    {
      console.log(err);
      res.send(err);
    }

    else
    {

      console.log(data);
      res.send(data);

    }

  });
});

router.put("/changepass", function(req, res) {

console.log(req.body);

SignupModel.updateOne({ username:req.body.uname}, {$set: {pass:req.body.npass}} ,function(err, data)
{
  if (err)
  {
    console.log(err);
    res.send("Failed");
  }
  else
  {
    console.log(data);
    res.send(data);

  }

});
});

//RESET PASSWORD THROUGH EMAIL

var resetpasswordschema = new mongoose.Schema({username:String,userhash:String,exptime:String}, { versionKey: false } );
var resetpassModel = mongoose.model("resetpass",resetpasswordschema,"resetpass");

router.post("/resetpassword", function(req, res) {


  console.log(req.body);
  SignupModel.find({ username:req.body.uname}, function(err, data)
  {
    if (err)
    {
      console.log(err);
      res.send(err);
    }
    else
    {
      console.log(data);
      if(data.length==0)
      {
        res.send("Incorrect Username");
      }
      else
      {
        var uhash = CryptoJS.MD5(Date.now() + req.body.username).toString();
        var minutesToAdd=15;
        var currentDate = new Date();
        var futureDate = new Date(currentDate.getTime() + minutesToAdd*60000);
        console.log(futureDate.toString());

        console.log(req.body);
        var newreset = new resetpassModel({username:req.body.uname,userhash:uhash,exptime:futureDate} );
        newreset.save(function(err)
        {
            if (err)
            {
              console.log(err);
              res.send(err);
            }
            else
            {
              var transporter = nodemailer.createTransport({
                 service:'gmail',
                 auth:{
                    user:'doesntexist514@gmail.com',
                    pass:'jufwmbexxwawoeuz'
                 }
              });
              var mailoptions={
                from:'doesntexist514@gmail.com',
                to:req.body.uname,
                subject:'Password Reset Mail',
                html:'Hello ' + data[0].name + "<br><br> Click on the following link to reset your password.<br><br> <a href='http://localhost:4200/resetpass?code=" + uhash + "'>Reset Password</a>"
              };
              transporter.sendMail(mailoptions,function(error,info)
              {
                if(error)
                {
                  console.log("Error sending mail" + error);
                }
                else
                {
                  console.log("Mail send" + info.response);
                }
              });
              res.send("Reset Password mail sent successfully, please check your mail to reset password");
            }

        });
      }
    }
  });
});

router.get("/checktime", function(req, res) {
  console.log(req.query);
  resetpassModel.find({ userhash:req.query.hash}, function(err, data)
  {
    if (err)
    {
      console.log(err);
      res.send(err);
    }
    else
    {
      console.log(data);
      res.send(data);
    }
  });
});

module.exports=router;
