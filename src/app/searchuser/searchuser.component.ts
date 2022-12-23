import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { Signup } from '../signup';

@Component({
  selector: 'app-searchuser',
  templateUrl: './searchuser.component.html',
  styleUrls: ['./searchuser.component.css']
})
export class SearchuserComponent implements OnInit {

  uname:string;
  msg:string;
  name:string;
  phone:string;
  flag:boolean=false;
  //creating a global class
  srchuserdata:Signup

  constructor(private myhttp:HttpClient, private searchservice:AccountsService) { }

  ngOnInit(): void {
  }

  //SEARCHING USER WITH SERVICE AND A CLASS

  searchuser()
  {
    
    this.searchservice.srchuser(this.uname).subscribe({
      //in res we are getting an array of objects of type signup bcoz i don't have class accounts but signup
      next:(res)=>{
        if(res[0]== null)
        {
          this.flag=false;
          this.msg= "User doesn't exist"
          this.srchuserdata.name=null;
          this.srchuserdata.phone=null;
          this.srchuserdata.username=null;
          this.srchuserdata.pass=null;
        }
        else
        {
          this.flag=true;
          this.msg="";
          //the following will simply copy the array element 1 , which is a class object in global object
          //and then we can directly refer to it
          this.srchuserdata= res[0];
        }
      },
      error:(err)=>{
        alert(err);
      }
    })
    
  }

  // SEARCHING USER WITHOUT SERVICE AND CLASSES

  // searchuser()
  // {
  //   //in get method we dont have body, so to send something we use query parameters whose syntax is:
  //   // ?attribute=10 //hardcoded value
  //   // "?attribute=" + this.varname
  //   this.myhttp.get("http://localhost:3000/searchuser?uname="+this.uname, {responseType:"json"}).subscribe({
  //     next:(res:any[])=>{
  //       if(res.length == 0)
  //       {
  //         this.msg= "User doesn't exist"
  //         this.name="";
  //         this.phone=""
  //       }
  //       else
  //       {
  //         this.msg="";
  //         this.name= res[0].name;
  //         this.phone=res[0].phone;
  //       }
  //     },
  //     error:(err)=>{
  //       alert(err);
  //     }
  //   })
    
  // }

  
}
