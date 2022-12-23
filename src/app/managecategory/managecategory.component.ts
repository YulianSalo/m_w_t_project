import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsService } from '../accounts.service';
import {Conn} from '../conn'
declare const $:any;

@Component({
  selector: 'app-managecategory',
  templateUrl: './managecategory.component.html',
  styleUrls: ['./managecategory.component.css']
})
export class ManagecategoryComponent implements OnInit {

  catname:string;
  catpic:string;
  catid:string;
  myfile:File;
  // file data is to be stored in file only

  msg:string;
  allcatlist:string[];
  flag:boolean=false;

  constructor(private myhttp:HttpClient, private savecatService:AccountsService, private catsrvobj:AccountsService, private myrouter:Router) { }

  ngOnInit(): void {
    this.fetchcat();
  }

  addcategory()
  {
    $("#mssg").fadeIn(1000).fadeOut(1000);

    var mydata= new FormData
    //here FormData is a class and we are creating an object of that class
    //this is used instead of json object bcoz json object can't send binary data 

    mydata.append("catname",this.catname);
    mydata.append("catpic",this.myfile);

    //also to send form data containing files we have to change the enc type to multipart/form-data

    //following is used to check whether we can send binary data into json or not
    // var databody={
    //   cname:this.catname,
    //   picname:this.myfile.name,
    //   picfile: this.myfile
    //   //sending whole file
    // }

    this.savecatService.savecat2db(mydata).subscribe({
      next:(res)=>{
        this.msg= res;
        // setTimeout(() => { this.myrouter.navigateByUrl('/signup') }, 1000);
        setTimeout(() => { this.ngOnInit() }, 1500);
      },
      error:(err)=>{
        this.msg= err;
      }
    })

  }

  fileselected(event)
  {
    this.myfile= event.target.files[0]
    console.log(event);

  };

  fetchcat()
  {
    this.catsrvobj.fetchallcat().subscribe({
      next:(res:any[])=>{
        this.allcatlist= res;
      },
      error:(err)=>{
        this.msg=err;
      }
    })
  }

  onupdate(cid,cname,cpic)
  {
    this.flag=true;
    this.catname = cname;
    this.catpic= cpic;
    this.catid= cid;
  }
  
  oncancel()
  {
    this.catname=null;
    this.flag=false;
  }

  catupdate()
  {
    var mydata= new FormData;
    $("#mssg").fadeIn(1000).fadeOut(2500);
    if(this.myfile != null) // user has chosen new file
    {
      mydata.append("catname",this.catname);
      mydata.append("catpic",this.myfile);  
      mydata.append("oldcatpic",this.catpic); //sent for deletion
      mydata.append("catid",this.catid);
    }
    else
    {
      mydata.append("catname",this.catname);
      mydata.append("oldcatpic",this.catpic); //sent for retaining old name
      mydata.append("catid",this.catid);
    }

    this.catsrvobj.catupdate(mydata).subscribe(
      {
        next:(res) =>{
          if(res['nModified']==1)
          {
            this.msg= "Category Updated Successfully"
          }
          else
          {
            this.msg= "Category Not Updated Successfully"
          }
        },

        error:(err) =>{

        }
      }
    )
    
  }

  catdelete(catid)
  {
      // alert(catid);
      var confrm= confirm("Are you sure want to delete?");
      if(confrm)
      {
          //note that we get a json object only as a response and not an array of objects
          this.myhttp.delete(Conn.nodeurl + "/delcat?catid="+catid,{responseType:"json"}).subscribe({
            next:(res)=>{
              if(res["deletedCount"] == 1)
              {
                alert("Category Deleted Successfully!")
                this.ngOnInit();
                //this was the best part of todays lecture used to refresh the componenet
              }
            },
            error:(err)=>{
              this.msg=err;
            }
          })
      }
  }

}
