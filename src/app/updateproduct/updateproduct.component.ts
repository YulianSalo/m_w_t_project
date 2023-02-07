import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css']
})
export class UpdateproductComponent implements OnInit {

  constructor(private catsrvobj:AccountsService, private myroute:ActivatedRoute) {
    this.myroute.queryParams.subscribe({

      next:(params)=>{
        this.prodid= params["prodid"];
        this.fetchproddetails();
      }
    })
   }
  //used
  allcatlist:String[];
  allscatlist:any[];

  prodid:string;
  prodimg:string;
  scid:string;

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


  allprodlist:any[];
  matchedsubcatlist:any[]=[];

  flag:boolean=false;

  ngOnInit(): void {
    this.fetchcat();
    // this.fetchallsubcat();
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

  // fetchallsubcat()
  // {
  //   this.catsrvobj.fetchallsubcat().subscribe({
  //     next:(res:any[])=>{
  //       this.allscatlist= res;
  //     },
  //     error:(err)=>{
  //       this.msg=err;
  //     }
  //   })
  // }

  fetchsubcatbycatid()
  {
    this.allscatlist=[];
    this.subcat="";
    this.catsrvobj.fetchsubcatbycatid(this.category).subscribe({
      next:(res:any[])=>{
        this.allscatlist= res;
      },
      error:(err)=>{
        this.msg=err;
      }
    })
  }

  fetchproddetails()
  {
    this.catsrvobj.fetchproddetailsbyid(this.prodid).subscribe(
      {
        next:(resp:any[])=>
        {
          this.category=resp[0].category;
          this.fetchsubcatbycatid();
          this.prodname=resp[0].product;
          this.subcat=resp[0].subcatname;
          this.rate=resp[0].rate;
          this.disc=resp[0].discount;
          this.stock=resp[0].stock;
          this.description=resp[0].description;
          this.prodimg=resp[0].prodpic;

        },
        error:(err)=>
        {
          this.msg=err;
        }
      }
    );
  }


  updateprod()
  {
    var mydata= new FormData

    if(this.myfile != null) // user has chosen new file
    {
      mydata.append("category",this.category);
      mydata.append("subcatname",this.subcat);
      mydata.append("product",this.prodname);
      mydata.append("newprodpic",this.myfile);  //new pic
      mydata.append("oldpicname",this.prodimg); //sent for deletion
      mydata.append("rate",this.rate);
      mydata.append("discount",this.disc);
      mydata.append("stock",this.stock);
      mydata.append("description",this.description);
      mydata.append("prodid",this.prodid);


    }
    else
    {
      mydata.append("category",this.category);
      mydata.append("subcatname",this.subcat);
      mydata.append("product",this.prodname);
      mydata.append("oldpicname",this.prodimg); //sent for retention
      mydata.append("rate",this.rate);
      mydata.append("discount",this.disc);
      mydata.append("stock",this.stock);
      mydata.append("description",this.description);
      mydata.append("prodid",this.prodid);

    }

    this.catsrvobj.updateproduct(mydata).subscribe({
      next:(res)=>
        {
          if(res['modifiedCount']==1)
          {
            this.msg= "Product Updated Successfully"
          }
          else
          {
            this.msg= "Product Not Updated Successfully"
          }
        },
      error:(err)=>
        {
        }
    })

  }


}
