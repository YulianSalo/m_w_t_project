const express = require('express');
const router = express.Router();
const mongoose = require("./mongoose");

var CartSchema = new mongoose.Schema( {prodid:String, prodname:String,rate:String,qty:Number,totalcost:Number,picture:String,username:String}, { versionKey: false } );
var CartModel = mongoose.model("cart", CartSchema,"cart");

var CheckoutSchema = new mongoose.Schema( {username:String, billamt:Number,orderdt:String,status:String,saddress:String,pmode:String,coname:String,cardno:String,holdername:String,cvv:String,exp:String}, { versionKey: false } );
var CheckoutModel = mongoose.model("checkout", CheckoutSchema,"checkout");

var orderprodsSchema = new mongoose.Schema( {orderid:String,pid:String,pname:String,prate:Number,qty:Number,tc:Number,ppic:String,username:String }, { versionKey: false } );
var orderprodsmodel = mongoose.model("orderproducts", orderprodsSchema,"orderproducts");

router.post("/addtocart", function(req, res)
{
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
    });
  });

  router.put("/updatecart", function(req, res) {
    CartModel.updateOne({ prodid: req.body.id, username: req.body.username}, { $set: { qty: req.body.qty, totalcost: req.body.totalcost}},function(err,data) {
      if (err)
      {
        console.log("FAILED");
        console.log(err);
        res.send("Failed");
      }
      else
      {
        console.log("SUCCESS");
        console.log(data);
        res.send(data);
      }
    });
  });


  router.get("/fetchcart", function(req, res) {
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
    });
  });

  router.delete("/delcartprod", function(req, res) {
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
    });
  });

  //Checkout
  router.post("/checkout", function(req, res)
  {


      console.log(req.body);

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

      });
    });

    router.get("/getordernum", function(req, res) {
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

      }).sort({orderdt:-1});
      //sort({orderdt:-1}) used for fetching all the orders of current user
      //by sorting it from the latest order to first
    });


  //update stock after the successful order
  router.put("/updatestock",function(req,res)
  {
    let updateresp;


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
  router.post("/orderitems",function(req,res)
  {
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

  router.delete("/emptycart", function(req, res) {

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

    });
  });

  router.get("/getuserorders", function(req, res) {

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

    }).sort({"orderdt":-1});
  });

  router.get("/getorderprods", function(req, res) {
        console.log(req.query);
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

    });
  });

  router.get("/getallorders", function(req, res) {
        console.log(req.query);
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

    }).sort({"orderdt":-1});
  });


//update the status of the order
  router.put("/updatetorderstatus", function(req, res) {

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

    });
  });

  module.exports = router;
