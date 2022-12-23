import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../accounts.service';
declare const $:any;
import {Conn} from '../conn';
@Component({
  selector: 'app-manageproduct',
  templateUrl: './manageproduct.component.html',
  styleUrls: ['./manageproduct.component.css']
})
export class ManageproductComponent implements OnInit {

  scatname:string;
  myfile:File;
  msg:string;
  category:string="";
  subcat:string="";
  prodname:string;
  rate:string;
  disc:string;
  stock:string;
  description:string;

  allcatlist:String[];
  allsubcatlist:any[];
  allprodlist:any[];
  matchedsubcatlist:any[]=[];

  flag:boolean=false;

  catval:string;

  constructor(private catsrvobj:AccountsService,private myhttp:HttpClient) { }

  ngOnInit(): void {
    this.fetchcat();
    this.flag=false;
    this.category="";
    this.subcat="";
    this.prodname="";
    this.rate="";
    this.disc="";
    this.stock="";
    this.description="";
    // this.fetchsubcat();
    
  }

  fileselected(event)
  {
    this.myfile= event.target.files[0]
    console.log(event);
  };

  addproduct()
  {
    $("#mssg").fadeIn(1000).fadeOut(2500);

    var mydata= new FormData
    mydata.append("catname",this.category);
    mydata.append("subcatname",this.subcat);
    mydata.append("prodname",this.prodname);
    mydata.append("rate",this.rate);
    mydata.append("disc",this.disc);
    mydata.append("stock",this.stock);
    mydata.append("description",this.description);
    mydata.append("prodpic",this.myfile);

    this.catsrvobj.saveprod2db(mydata).subscribe({
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

  // fetchsubcat()
  // {
  //   this.catsrvobj.fetchsubcat(scid).subscribe({
  //     next:(res:any[])=>{
  //       this.allsubcatlist= res;
  //     },
  //     error:(err)=>{
  //       this.msg=err;
  //     }
  //   })
  // }

  fetchsubcatbycatid()
  {
    this.catsrvobj.fetchsubcatbycatid(this.category).subscribe({
      next:(res:any[])=>{
        this.allsubcatlist= res;
      },
      error:(err)=>{
        this.msg=err;
      }
    })
  }

  showsubcat()
  {
    //to clear previous category
    this.matchedsubcatlist.splice(0, this.matchedsubcatlist.length);

    for(let i=0;i < this.allsubcatlist.length; i++)
    {
      if (this.category == this.allsubcatlist[i].category)
       {this.matchedsubcatlist.push(this.allsubcatlist[i]);}
    }
  }

  fetchprodbyscid()
  {
    this.catsrvobj.fetchprodbyscid(this.subcat).subscribe({
      next:(res:any[])=>{
        if(res.length>0)
        {
          this.allprodlist= res;
          this.flag=true;
          this.msg=null;
        }
        else
        {
          this.flag=false;
          this.msg="No Products to show"
        }
        
      },
      error:(err)=>{
        this.msg=err;
      }
    })
  }

  proddelete(prodid)
  {
      // alert(catid);
      var confrm= confirm("Are you sure want to delete?");
      if(confrm)
      {
          //note that we get a json object only as a response and not an array of objects
          this.myhttp.delete(Conn.nodeurl + "/delprod?prodid="+prodid,{responseType:"json"}).subscribe({
            next:(res)=>{
              if(res["deletedCount"] == 1)
              {
                alert("Product Deleted Successfully!")
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
