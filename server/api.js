const express = require('express');
const router = express.Router();

router.get("/api/showmsg",(req,res)=>{
  res.send("This is a message")
})

//accessing api using angular

router.get("/api/sum",(req,res)=>{

  var a= parseInt(req.query.fno);  //variables in query string parameters
  var b= Number(req.query.sno);
  var sum= a + b;
  res.send("sum is "+ sum);
})

router.post("/api/calcsum",(req,res)=>{

  console.log(req.body);
  var a= parseInt(req.body.fno);  //variables in form data
  var b= Number(req.body.sno);
  var result;

  if(req.body.operation == "add")
  {
      result= a+b;
  }
  else if(req.body.operation == 'sub')
  {
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

router.post("/api/json",(req,res)=>{
  console.log(req.body);

  res.send("Your Full Name is : "+ req.body.fname + " " + req.body.lname + " " + req.body.lname + "\n Your age is "+ req.body.age);

})

module.exports = router;
