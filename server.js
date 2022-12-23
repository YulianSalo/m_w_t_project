// const { stringify } = require("@angular/compiler/src/util");
const express = require("express");
const app= express() //creates an express app
const fs= require("fs")

const dbconfig=require('./database/db');
// const port = process.env.PORT || 8080;
const port= 3000;

const CryptoJS= require("crypto-js");
const nodemailer=require("nodemailer");

app.use(express.static(__dirname));

app.get("/", function(req, res) {
 res.sendFile(__dirname + "/index.html");
});

//to use urlencoded and json format
app.use(express.urlencoded({extended:false}));
app.use(express.json());
const mongoose = require("mongoose");

// STEP-1 AFTER INSTALLATION OF MULTER
// multer is a body pareser middleware which is used only to deal with file data or multipart/form-data
const multer = require('multer')

//STEP-2 CREATE A FOLDER FOR FILE UPLOADS AND SET DIR
const DIR='src/uploads'

//take the filename into a var useful when we access it directly inside our api as well due to global scope
var picname;

//following is used to specify what should be our file name and where to store it
let mystorage= multer.diskStorage({
    destination:(req, file, cb) =>{
        cb(null, DIR) //src/uploads
    },

    filename:(req, file, cb) =>{
      picname = Date.now() + file.originalname;
      // here Date.now() is a function wch changes in milliseconds and gives us the total milliseconds by
      // calculating from midnight 1970 to now
      // basically we are using it so that if user later upload new file with same name again, so then the earlier doesn't be overwritten

      cb(null, picname);
    }
})

let upload= multer({storage: mystorage});
// upload is now the multer object with the storage cfn as we have specified

// next step is to create schema and model for category
// var CategorySchema = new mongoose.Schema( {categoryname:String, categorypic:String}, {versionKey: false });
// var managecatmodel = mongoose.model("managecat", CategorySchema, "managecat");


// and last step is to create our api
//for cors
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
   });


//mongoose 15april #
var SignupSchema = new mongoose.Schema( {name:String,phone:String,username: {type:String,unique:true}, pass: String, usertype:String, userhash:String, activated:Boolean},
     { versionKey: false } );

var SignupModel = mongoose.model("signup", SignupSchema,"signup");
// SignupModel is the way we will use the model
//2nd singup is collection(table name)
//1st signup is internal name of model


app.post("/signup", function(req, res) {
    //mongoose.connect(dbconfig.mongopath, {useNewUrlParser: true, useUnifiedTopology: true});

    // var newsignup = new SignupModel( {name:req.body.name, phone:req.body.phone, username:req.body.email, pass:req.body.password} );

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
      //mongoose.connection.close();
    });
  });

  app.put("/activateaccount", function(req, res) {
    //mongoose.connect(dbconfig.mongopath, {useNewUrlParser: true, useUnifiedTopology: true});
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
      //mongoose.connection.close();
    });
  });

//members list

  app.get("/memlist", function(req, res) {
    //mongoose.connect(dbconfig.mongopath, {useNewUrlParser: true, useUnifiedTopology: true});
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
      //mongoose.connection.close();
    });
  });

app.get("/searchuser", function(req, res) {
  //mongoose.connect(dbconfig.mongopath, {useNewUrlParser: true, useUnifiedTopology: true});
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
    //mongoose.connection.close();
  });
});

app.post("/login", function(req, res) {
  //mongoose.connect(dbconfig.mongopath, {useNewUrlParser: true, useUnifiedTopology: true});
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
    //mongoose.connection.close();
  });
});

//note to delete we have html delete method
app.delete("/deluser", function(req, res) {
  //mongoose.connect(dbconfig.mongopath, {useNewUrlParser: true, useUnifiedTopology: true});
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
    //mongoose.connection.close();
  });
});


//try
app.put("/forgetpassword", function(req, res) {
  //mongoose.connect(dbconfig.mongopath, {useNewUrlParser: true, useUnifiedTopology: true});
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
    //mongoose.connection.close();
  });
});

app.put("/changepass", function(req, res) {
  //mongoose.connect(dbconfig.mongopath, {useNewUrlParser: true, useUnifiedTopology: true});
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
    //mongoose.connection.close();
  });
});

//file upload
var CategorySchema = new mongoose.Schema( {categoryname:String, categorypic:String}, {versionKey: false });
var managecatmodel = mongoose.model("managecat", CategorySchema, "managecat");

//file upload
//upload is the malter object with storage as we specified and single means we are adding a single item
//catpic is the name of the file which we have appended in our FormData
app.post("/addcat", upload.single('catpic'), function(req,res)
{
  //mongoose.connect(dbconfig.mongopath, {useNewUrlParser: true, useUnifiedTopology: true});
  if (!req.file)
  {
      //this is used to check whether or not we have send file to our api
       picname="noimage.jpg";//if file was not uploaded then we will save default imagename in database
  };

  // req.file is the `catpic` file
  // req.body will hold the text fields, if there were any

  var newmanagecat = new managecatmodel( {categoryname:req.body.catname, categorypic:picname} );
  newmanagecat.save(function(err) {
    if (err)
    {
      console.log(err);
      res.send("Failed");
    }
    else
    {
      res.send("Category added successfully");
    }
    //mongoose.connection.close();
  });
});


app.get("/fetchallcat", function(req, res) {
  //mongoose.connect(dbconfig.mongopath, {useNewUrlParser: true, useUnifiedTopology: true});
  console.log(req.query);
  //here before find we have to give the name of the model
  managecatmodel.find(function(err, data)
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
  //mongoose.connection.close();
});


var SubCategorySchema = new mongoose.Schema( {category:String , subcatname:String, subcatpic:String}, {versionKey: false });
var managesubcatmodel = mongoose.model("managesubcat", SubCategorySchema, "managesubcat");

app.post("/addsubcat", upload.single('subcatpic'), function(req,res)
{
  //mongoose.connect(dbconfig.mongopath, {useNewUrlParser: true, useUnifiedTopology: true});
  if (!req.file)
  {
       picname="noimage.jpg";
  };

  var newmanagesubcat = new managesubcatmodel( {category:req.body.catname, subcatname:req.body.subcatname,subcatpic:picname} );
  newmanagesubcat.save(function(err) {
    if (err)
    {
      console.log(err);
      res.send("Failed");
    }
    else
    {
      res.send("Sub Category added successfully");
    }
    //mongoose.connection.close();
  });
});


app.get("/fetchallsubcat", function(req, res) {
  //mongoose.connect(dbconfig.mongopath, {useNewUrlParser: true, useUnifiedTopology: true});
  console.log(req.query);
  //here before find we have to give the name of the model
  managesubcatmodel.find(function(err, data)
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
    //mongoose.connection.close();
  });
});

app.get("/fetchsubcatbycatid", function(req, res) {
  //mongoose.connect(dbconfig.mongopath, {useNewUrlParser: true, useUnifiedTopology: true});
  console.log(req.query);
  //here before find we have to give the name of the model
  managesubcatmodel.find({ category:req.query.catid},function(err, data)
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
    //mongoose.connection.close();
  });
});


var ProductSchema = new mongoose.Schema( {category:String , subcatname:String, product:String,rate:Number,
  discount:Number, stock:Number, description:String, prodpic:String}, {versionKey: false });

var manageprodmodel = mongoose.model("manageprod", ProductSchema, "manageprod");

app.post("/addprod", upload.single('prodpic'), function(req,res)
{
  //mongoose.connect(dbconfig.mongopath, {useNewUrlParser: true, useUnifiedTopology: true});
  if (!req.file)
  {
       picname="noimage.jpg";
  };

  var newmanageprod = new manageprodmodel( {category:req.body.catname, subcatname:req.body.subcatname, product:req.body.prodname,
    rate:req.body.rate, discount:req.body.disc, stock:req.body.stock, description: req.body.description, prodpic:picname} );

  newmanageprod.save(function(err) {
    if (err)
    {
      console.log(err);
      res.send("Failed");
    }
    else
    {
      res.send("Product added successfully");
    }
    //mongoose.connection.close();
  });
});

app.post("/updatecat", upload.single('catpic'), function(req,res)
{
  //mongoose.connect(dbconfig.mongopath, {useNewUrlParser: true, useUnifiedTopology: true});
  if (!req.file)
  {
       picname= req.body.oldcatpic;//if file was not uploaded this means user wants to retain old picture name in db
       //so we are copying oldpicname into our variable so that we can store it inside our db
  }
  else
  {
    if(req.body.oldcatpic != "noimage.jpg") //if old pic is not default then we delete it
    {
      fs.unlink('src/uploads/' + req.body.oldcatpic, (err) =>{
        if(err) throw err;
        console.log('File was deleted');
      });
    }
  }

  managecatmodel.updateOne({ _id:req.body.catid}, {$set: {categoryname:req.body.catname, categorypic:picname}} ,function(err, data)
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
    //mongoose.connection.close();
  });
});

app.get("/fetchscatdetailsbyid", function(req, res) {
  //mongoose.connect(dbconfig.mongopath, {useNewUrlParser: true, useUnifiedTopology: true});
  console.log(req.query);
  //here before find we have to give the name of the model
  managesubcatmodel.find({ _id:req.query.subcatid},function(err, data)
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
    //mongoose.connection.close();
  });
});

app.put("/updatesubcat", upload.single("scatpic"), function (req, res) {
  // mongoose.connect(dbconfig.mongopath, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true
  // });
  if (!req.file) {
    picname = req.body.oldpicname;
    //* copying old name into variable for retaining it inside database
  } else {
    if (req.body.oldpicname != "noimage.jpg") {
      fs.unlink("src/uploads/" + req.body.oldpicname, (err) => {
        if (err) throw err;
        else console.log("file was deleted");
      });
    }
  }
  managesubcatmodel.updateOne(
    { _id: req.body.scid },
    {
      $set: {
        category: req.body.cid,
        subcatname: req.body.scatname,
        subcatpic: picname,
      },
    },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        res.send(data);
      }
    }
  );
});

app.put("/updateprod", upload.single("newprodpic"), function (req, res) {
  // mongoose.connect(dbconfig.mongopath, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // });
  if (!req.file) {
    picname = req.body.oldpicname;
    //* copying old name into variable for retaining it inside database
  } else {
    if (req.body.oldpicname != "noimage.jpg") {
      fs.unlink("src/uploads/" + req.body.oldpicname, (err) => {
        if (err) throw err;
        else console.log("file was deleted");
      });
    }
  }
  manageprodmodel.updateOne(
    { _id: req.body.prodid },
    {
      $set: {
        category: req.body.category,
        subcatname: req.body.subcatname,
        product:req.body.product,
        prodpic:picname,
        rate:req.body.rate,
        discount:req.body.discount,
        stock:req.body.stock,
        description:req.body.description,
        product:req.body.product,
      },
    },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        res.send(data);
      }
    }
  );
});

app.get("/fetchprodbyscid", function(req, res) {
  //mongoose.connect(dbconfig.mongopath, {useNewUrlParser: true, useUnifiedTopology: true});
  console.log(req.query);
  //here before find we have to give the name of the model
  manageprodmodel.find({ subcatname:req.query.subcatid},function(err, data)
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
    //mongoose.connection.close();
  });
});

app.get("/fetchproddetailsbyid", function(req, res) {
  //mongoose.connect(dbconfig.mongopath, {useNewUrlParser: true, useUnifiedTopology: true});
  console.log(req.query);
  //here before find we have to give the name of the model
  manageprodmodel.find({ _id:req.query.prodid},function(err, data)
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
    //mongoose.connection.close();
  });
});


//Cart Apis

var CartSchema = new mongoose.Schema( {prodid:String, prodname:String,rate:String,qty:Number,totalcost:Number,picture:String,username:String}, { versionKey: false } );
var CartModel = mongoose.model("cart", CartSchema,"cart");

app.post("/addtocart", function(req, res)
{
    //mongoose.connect(dbconfig.mongopath, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log(req.body);
    var newcart = new CartModel({prodid:req.body.prodid, prodname:req.body.prodname,rate:req.body.rate,qty:req.body.qty,totalcost:req.body.totalcost,picture:req.body.picture,username:req.body.username} );
    newcart.save(function(err)
    {
      if (err)
      {
        console.log(err);
        res.send(err);
      }
      else
      {
        console.log("success");
        res.send("success");
      }
      //mongoose.connection.close();
    });
  });

  app.put("/updatecart", function(req, res) {
    //mongoose.connect(dbconfig.mongopath, {useNewUrlParser: true, useUnifiedTopology: true});
    CartModel.updateOne({ prodid: req.body.id}, { $set: { qty: req.body.qty, totalcost: req.body.totalcost}},function(err,data) {
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
      //mongoose.connection.close();
    });
  });


  app.get("/fetchcart", function(req, res) {
    //mongoose.connect(dbconfig.mongopath, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log(req.query);
    CartModel.find({username:req.query.un},function(err, data)
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
      //mongoose.connection.close();
    });
  });


  // Checkout APIs

  var CheckoutSchema = new mongoose.Schema( {username:String, billamt:Number,orderdt:String,status:String,saddress:String,pmode:String,coname:String,cardno:String,holdername:String,cvv:String,exp:String}, { versionKey: false } );
  var CheckoutModel = mongoose.model("checkout", CheckoutSchema,"checkout");

  app.post("/checkout", function(req, res)
  {
      //mongoose.connect(dbconfig.mongopath, {useNewUrlParser: true, useUnifiedTopology: true});

      console.log(req.body);

      // var orddt = new Date().toLocaleString();

      var orddt = new Date().toLocaleString("en-GB");


      var newcheckout = new CheckoutModel({username:req.body.username, billamt:req.body.billamt,orderdt:orddt,status:req.body.status,saddress:req.body.saddress,pmode:req.body.pmode,coname:req.body.coname,cardno:req.body.cardno,holdername:req.body.holdername,cvv:req.body.cvv,exp:req.body.exp} );

      newcheckout.save(function(err)
      {
        if (err)
        {
          console.log(err);
          res.send(err);
        }
        else
        {
          res.send("success");
        }
        //mongoose.connection.close();
      });
    });

    app.get("/getordernum", function(req, res) {

      //mongoose.connect(dbconfig.mongopath, {useNewUrlParser: true, useUnifiedTopology: true});
      CheckoutModel.find({ username: req.query.un}, function(err, data) {
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
        //mongoose.connection.close();
      }).sort({orderdt:-1});
      //using above we are fetching all the oderes of current user
      //by sorting it to desc- we are fetching the latest order to first
    });


  //update stock after the successful of order
  app.put("/updatestock",function(req,res)
  {
    let updateresp;
    //mongoose.connect(dbconfig.mongopath, {useNewUrlParser: true, useUnifiedTopology: true});

    var updatelist=req.body;
    for(let x=0;x<updatelist.length;x++)
    {
      manageprodmodel.updateOne({_id:updatelist[x].pid},{$inc: {"stock":-updatelist[x].qty}},function(err,data)
      {
        if (err)
        {
          updateresp=false;
          console.log(err);
        }
        else
        {
          updateresp=true;
          console.log(updateresp);
          console.log(data);
        }
      });
    }
      console.log(updateresp);
      if(updateresp==true)
      {
      res.send("Successfully Updated");
      }
      else
      {
        res.send("Updation Failed")
      }
    });

    //insert order details for ordersuccess component

  var orderprodsSchema = new mongoose.Schema( {orderid:String,pid:String,pname:String,prate:Number,qty:Number,tc:Number,ppic:String,username:String }, { versionKey: false } );
  var orderprodsmodel = mongoose.model("orderproducts", orderprodsSchema,"orderproducts");
  app.post("/orderitems",function(req,res)
  {
  //mongoose.connect(dbconfig.mongopath, {useNewUrlParser: true, useUnifiedTopology: true});

  var neworder=req.body;

  orderprodsmodel.insertMany(neworder, function (err, docs) {
        if (err)
        {
            return console.error(err);
        }
        else
        {
          console.log("Multiple documents inserted to Collection");
          res.send("Successfully inserted");
        }
      });
  });

  app.delete("/emptycart", function(req, res) {
    //mongoose.connect(dbconfig.mongopath, {useNewUrlParser: true, useUnifiedTopology: true});
    CartModel.remove({ username:req.query.un }, function(err, data) {
      if (err)
      {
        console.log(err);
        res.send("Failed");
      }
      else
      {
        console.log(data);
        res.send("removed from cart successfully");
      }
      //mongoose.connection.close();
    });
  });


  //used to take the orders inside
  app.get("/getuserorders", function(req, res) {
    //mongoose.connect(dbconfig.mongopath, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log(req.query);
    CheckoutModel.find({ username: req.query.un},function(err, data)
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
      //mongoose.connection.close();
    }).sort({"orderdt":-1});
  });

  app.get("/getorderprods", function(req, res) {
    //mongoose.connect(dbconfig.mongopath, {useNewUrlParser: true, useUnifiedTopology: true});    console.log(req.query);
    orderprodsmodel.find({ orderid: req.query.oid},function(err, data)
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
      //mongoose.connection.close();
    });
  });

  //to show to admin
  app.get("/getallorders", function(req, res) {
    //mongoose.connect(dbconfig.mongopath, {useNewUrlParser: true, useUnifiedTopology: true});    console.log(req.query);
    CheckoutModel.find(function(err, data)
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
      //mongoose.connection.close();
    }).sort({"orderdt":-1});
  });


  //api to update the status of the order by the admin inside the checkout model
  app.put("/updatetorderstatus", function(req, res) {
    //mongoose.connect(dbconfig.mongopath, {useNewUrlParser: true, useUnifiedTopology: true});
    CheckoutModel.updateOne({ _id: req.body.oid}, { $set: { status: req.body.nstatus}},function(err,data) {
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
      //mongoose.connection.close();
    });
  });

  //to search a product from search field using regex
  app.get("/fetchproductbyname", function(req, res) {
    //mongoose.connect(dbconfig.mongopath, {useNewUrlParser: true, useUnifiedTopology: true});

    var pname=req.query.s;
    manageprodmodel.find({product: { $regex: '.*' + pname ,$options:'i' }}, function(err,data)
    //i means case insensitive
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
      //mongoose.connection.close();
    });
  });

  //CONTACT US API
  var contactusSchema = new mongoose.Schema( {name:String,phone:String,emailid:String,message:String,msgdate:String }, { versionKey: false } );
  var contactusmodel = mongoose.model("contactus", contactusSchema,"contactus");

  app.post("/contactus", function(req, res)
  {

      var dt = new Date().toLocaleString("en-GB");
      //mongoose.connect(dbconfig.mongopath, {useNewUrlParser: true, useUnifiedTopology: true});
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
        //mongoose.connection.close();
      });
    });

    app.delete("/delcartprod", function(req, res) {
      //mongoose.connect(dbconfig.mongopath, {useNewUrlParser: true, useUnifiedTopology: true});
      console.log(req.query);

      CartModel.remove({ _id: req.query.prodid }, function(err, data)
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
        //mongoose.connection.close();
      });
    });

    app.delete("/delcat", function(req, res) {
      //mongoose.connect(dbconfig.mongopath, {useNewUrlParser: true, useUnifiedTopology: true});
      console.log(req.query);

      managecatmodel.remove({ _id: req.query.catid }, function(err, data)
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
        //mongoose.connection.close();
      });
    });

    app.delete("/delsubcat", function(req, res) {
      //mongoose.connect(dbconfig.mongopath, {useNewUrlParser: true, useUnifiedTopology: true});
      console.log(req.query);

      managesubcatmodel.remove({ _id: req.query.subcatid }, function(err, data)
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
        //mongoose.connection.close();
      });
    });

    app.delete("/delprod", function(req, res) {
      //mongoose.connect(dbconfig.mongopath, {useNewUrlParser: true, useUnifiedTopology: true});
      console.log(req.query);

      manageprodmodel.remove({ _id: req.query.prodid }, function(err, data)
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
        //mongoose.connection.close();
      });
    });

//RESET PASSWORD THROUGH EMAIL

var resetpasswordschema = new mongoose.Schema({username:String,userhash:String,exptime:String}, { versionKey: false } );
var resetpassModel = mongoose.model("resetpass",resetpasswordschema,"resetpass");

app.post("/resetpassword", function(req, res) {

  //mongoose.connect(dbconfig.mongopath, {useNewUrlParser: true, useUnifiedTopology: true});
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
        //mongoose.connect(dbconfig.mongopath, {useNewUrlParser: true, useUnifiedTopology: true});
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
            //mongoose.connection.close();
        });
      }
    }
  });
});

app.get("/checktime", function(req, res) {
  //mongoose.connect(dbconfig.mongopath, {useNewUrlParser: true, useUnifiedTopology: true});
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
    //mongoose.connection.close();
  });
});

app.put("/setnewpass", function(req, res) {
  //mongoose.connect(dbconfig.mongopath, {useNewUrlParser: true, useUnifiedTopology: true});
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
    //mongoose.connection.close();
  });
});


//here we have created an API, get is http default method; / is for home directory
app.get("/",(req,res)=>{
    res.send("Welcome to Node Js")

})

app.get("/api/showmsg",(req,res)=>{
    res.send("This is a message")
})

//accessing api using angular

app.get("/api/sum",(req,res)=>{

    //9 april
    //
    // console.log(req.body);
    var a= parseInt(req.query.fno);  //variables in query string parameters
    var b= Number(req.query.sno);
    var sum= a + b;
    res.send("sum is "+ sum);
    //
    //
})


app.get("/inp",(req,res)=>{
    res.sendFile(__dirname+"/index.html",(err)=>{
        if(err)
        {
            console.log("Error");
        }
    })
})

app.post("/api/calcsum",(req,res)=>{

    //9 april
    //
    console.log(req.body);
    var a= parseInt(req.body.fno);  //variables in form data
    var b= Number(req.body.sno);
    var result;

    if(req.body.operation == "add")
    {
        // console.log("add");
        result= a+b;
    }
    else if(req.body.operation == 'sub')
    {
        // console.log("sub");
        result= a-b;
    }
    else if(req.body.operation == 'multiply')
    {
        result= a*b;
    }
    else if(req.body.operation == 'division')
    {
        result= a/b;
    }
    res.send("Result of your "+ req.body.operation+ " is " + result);
    //
    //
})

app.post("/api/json",(req,res)=>{
    console.log(req.body);

    res.send("Your Full Name is : "+ req.body.fname + " " + req.body.lname + " " + req.body.lname + "\n Your age is "+ req.body.age);

})


//server starts listening
app.listen(port,()=>{
    console.log("Server is running at port number 3000")
    //callback function runs when server starts running

});

process.on('exit', () => {
  mongoose.connection.close();
});

//nodemon --> restart node app whenever we do some changes in our node app and start it again auto when we save
// nodemon server
//npm install -g nodemon

//sending data to our api and receiving it



//9 april
//body parser is reqd -- middle ware ; have access to request and response object
// doesn't handle multipart form enc type
// in new express version,body parser is inbuilt v4+
// in old version - install body parser, require it and use it


// app.use(express.urlencoded({extended:false}));               --> to work with urlencoded
// app.use(express.json())                                      --> to work with json
//above should be declared at the top




//get method- query string
// req.query.variable_name  --> to make use of request variables

//post method- form data
//req.body.variable_name --> to make use of request variables


//
