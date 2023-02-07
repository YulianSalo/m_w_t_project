const express = require('express');
const router = express.Router();
const mongoose = require("./mongoose");

//for file upload via forms
const multer = require('multer')
const DIR='src/uploads'

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

var CategorySchema = new mongoose.Schema( {categoryname:String, categorypic:String}, {versionKey: false });
var managecatmodel = mongoose.model("managecat", CategorySchema, "managecat");

//file upload
//upload is the malter object with storage as we specified and single means we are adding a single item
//catpic is the name of the file which we have routerended in our FormData
router.post("/addcat", upload.single('catpic'), function(req,res)
{

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

  });
});


router.get("/fetchallcat", function(req, res) {

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

});


var SubCategorySchema = new mongoose.Schema( {category:String , subcatname:String, subcatpic:String}, {versionKey: false });
var managesubcatmodel = mongoose.model("managesubcat", SubCategorySchema, "managesubcat");

router.post("/addsubcat", upload.single('subcatpic'), function(req,res)
{

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

  });
});


router.get("/fetchallsubcat", function(req, res) {

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

  });
});

router.get("/fetchsubcatbycatid", function(req, res) {

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

  });
});


var ProductSchema = new mongoose.Schema( {category:String , subcatname:String, product:String,rate:Number,
  discount:Number, stock:Number, description:String, prodpic:String}, {versionKey: false });

var manageprodmodel = mongoose.model("manageprod", ProductSchema, "manageprod");

router.post("/addprod", upload.single('prodpic'), function(req,res)
{

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

  });
});

router.post("/updatecat", upload.single('catpic'), function(req,res)
{

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

  });
});

router.get("/fetchscatdetailsbyid", function(req, res) {

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

  });
});

router.put("/updatesubcat", upload.single("scatpic"), function (req, res) {
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

router.put("/updateprod", upload.single("newprodpic"), function (req, res) {
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

router.get("/fetchprodbyscid", function(req, res) {

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

  });
});

router.get("/fetchproddetailsbyid", function(req, res) {

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

  });
});

//to search a product from search field using regex
router.get("/fetchproductbyname", function(req, res) {


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

  });
});


router.delete("/delcat", function(req, res) {

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

  });
});

router.delete("/delsubcat", function(req, res) {

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

  });
});

router.delete("/delprod", function(req, res) {

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

  });
});

module.exports = router;
