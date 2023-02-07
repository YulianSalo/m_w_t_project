// const { stringify } = require("@angular/compiler/src/util");
const express = require("express");
const app= express() //creates an express app
const mongoose = require("./mongoose");

const mongopath = 'mongodb+srv://usrnm:ufJshsUT6WwwnERi@cluster0.agrqbot.mongodb.net/?retryWrites=true&w=majority'
const port= 3000;

const nodemailer=require("nodemailer");
const authorization = require("./authorization");
const cart = require("./cart");
const products = require("./products-crud");
const api = require("./api");

app.use(express.static(__dirname));

//use urlencoded and json format
app.use(express.urlencoded({extended:false}));
app.use(express.json());

async function main() {

  try{
      await mongoose.connect(mongopath, {useNewUrlParser: true, useUnifiedTopology: true});
      app.listen(port);
      console.log(`Server is running at port ${port}`);
  }
  catch(err) {
      return console.log(err);
  }
}

app.get("/", function(req, res) {
 res.sendFile(__dirname + "/index.html");
});

//for CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://0.0.0.0:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
   });


app.use("/",authorization);

app.use("/",products);

app.use("/",cart);

  var contactusSchema = new mongoose.Schema( {name:String,phone:String,emailid:String,message:String,msgdate:String }, { versionKey: false } );
  var contactusmodel = mongoose.model("contactus", contactusSchema,"contactus");

  app.post("/contactus", function(req, res)
  {

      var dt = new Date().toLocaleString("en-GB");
      console.log(req.body);
      var newcontactus = new contactusmodel({name:req.body.name,phone:req.body.phone,emailid:req.body.emailid,message:req.body.message,msgdate:dt } );
      newcontactus.save(function(err)
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
            from:'smtp.angular@gmail.com',
            to:"shubamdadhwal@gmail.com",
            subject:'Mail from Website Contact Us Page',
            html:'Name:- ' + req.body.name + "<br>Phone:- " + req.body.phone + "<br>Email ID:- " + req.body.emailid + "<br>Message:- " + req.body.message
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

          res.send("Message sent successfully");
        }
      });
    });

app.get("/",(req,res)=>{
    res.send("Welcome to Node Js")

})

app.use("/",api);

app.get("/inp",(req,res)=>{
    res.sendFile(__dirname+"/index.html",(err)=>{
        if(err)
        {
            console.log("Error");
        }
    })
})

main();

//listen server stop event (ctrl+c)
process.on("SIGINT", async() => {

    await mongoose.disconnect();
    console.log("Server stopped.");
    process.exit();
});
