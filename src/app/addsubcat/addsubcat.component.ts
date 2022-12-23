import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../accounts.service';
declare const $:any;
import {Conn} from '../conn'
@Component({
  selector: 'app-addsubcat',
  templateUrl: './addsubcat.component.html',
  styleUrls: ['./addsubcat.component.css']
})
export class AddsubcatComponent implements OnInit {

  scatname:string;
  myfile:File;
  msg:string;
  category:string="";
  allcatlist:String[];
  allsubcatlist:String[];
  flag:boolean=false;

  constructor(private catsrvobj: AccountsService, private myhttp:HttpClient) { 
    
  }

  ngOnInit(): void {
    this.scatname="";
    this.category="";
    this.flag=false;
    this.fetchcat();
  }

  fileselected(event)
  {
    this.myfile= event.target.files[0]
    console.log(event);
  };

  addsubcat()
  {
    $("#mssg").fadeIn(1000).fadeOut(1000);
    var mydata= new FormData

    mydata.append("catname",this.category);
    mydata.append("subcatname",this.scatname);
    mydata.append("subcatpic",this.myfile);

    this.catsrvobj.savescat2db(mydata).subscribe({
      next:(res)=>{
        this.msg= res;
        setTimeout(() => { this.ngOnInit() }, 1500);
      },
      error:(err)=>{
        this.msg= err;
      }
    })
  }

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

  fetchsubcatbycatid()
  {
    this.catsrvobj.fetchsubcatbycatid(this.category).subscribe({
      next:(res:any[])=>{
        if(res.length>0)
        {
          this.flag=true;
          this.allsubcatlist= res;
          this.msg=null;
        }
        else
        {
          this.flag=false;
          this.msg="No sub categories to display"
        }
      },
      error:(err)=>{
        this.msg=err;
      }
    })
  }

  scatdelete(scatid)
  {
      // alert(catid);
      var confrm= confirm("Are you sure want to delete?");
      if(confrm)
      {
          //note that we get a json object only as a response and not an array of objects
          this.myhttp.delete(Conn.nodeurl + "/delsubcat?subcatid="+scatid,{responseType:"json"}).subscribe({
            next:(res)=>{
              if(res["deletedCount"] == 1)
              {
                alert("Sub Category Deleted Successfully!")
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
