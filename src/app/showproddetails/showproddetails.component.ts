import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsService } from '../accounts.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-showproddetails',
  templateUrl: './showproddetails.component.html',
  styleUrls: ['./showproddetails.component.css']
})
export class ShowproddetailsComponent implements OnInit {
  
  prodid:string;
  pdetails:string[];
  pname:string;
  ppic:string;
  rt:number;
  disamt:number;
  remamt:number;
  dis:number;
  stock:number;
  stockloop:number[]=[];
  flag:boolean;
  qty:string="";
  msg:string;
  desc:string;

  uflag:boolean=false;
  cartobjid:string;
  cartprodlist:any[]

  constructor(
    private myroute:ActivatedRoute, 
    private catsrvobj:AccountsService,
    private cartsrvobj:CartService, 
    private myrouter:Router
    ) {
    this.myroute.queryParams.subscribe(
      {
        next:(resp)=>
        {
          this.prodid=resp["pid"];
          this.fetchproddetails();

        },
        error:(err)=>
        {

        }
      }
    )
   }

  ngOnInit(): void {
    this.showcartprod();
  }

  fetchproddetails()
  {
    this.catsrvobj.fetchproddetailsbyid(this.prodid).subscribe(
      {
        next:(resp:any[])=>
        {
          this.pdetails=resp;
          this.rt=this.pdetails[0]["rate"];
          this.dis=this.pdetails[0]["discount"];
          this.disamt=(this.dis*this.rt)/100;
          this.remamt=this.rt-this.disamt;
          this.stock=this.pdetails[0]["stock"];
          this.pname=this.pdetails[0]["product"];
          this.ppic=this.pdetails[0]["prodpic"];
          this.desc=this.pdetails[0]["description"];
          if(this.stock<=0)
          {
            this.flag=false;
          }
          else
          {
            this.flag=true;
          }
          if(this.stock>10)
          {
            for(var x=1;x<=10;x++)
            {
              this.stockloop.push(x);
            }
          }
          else
          {
            for(var x=1;x<=this.stock;x++)
            {
              this.stockloop.push(x);
            }
          }
        },
        error:(err)=>
        {

        }
      }
    )

  }

  showcartprod(){
    this.cartsrvobj.fetchcart(sessionStorage.getItem("username")).subscribe({
      next:(res:any[])=>{
        this.cartprodlist=[];
        this.cartprodlist= res;
        for(var i=0;i<this.cartprodlist.length;i++)
        {
          if(this.prodid == this.cartprodlist[i].prodid)
          {
            this.uflag=true;
            this.qty=this.cartprodlist[i].qty;
            this.cartobjid= this.cartprodlist[i].prodid;
            break;
          }
          else
          {
            this.uflag=false;
          }
        }
        
      },
      error:(err)=>{
        
      }
    })
  }

  addtocart()
  {
    if(sessionStorage.getItem("username")!=null)
    {
      var tcost=Number(this.qty)*this.remamt;
      var mydata = {prodid:this.prodid, prodname:this.pname,rate:this.remamt,qty:this.qty,totalcost:tcost,picture:this.ppic,username:sessionStorage.getItem("username")}
      this.cartsrvobj.savetocart(mydata).subscribe(
        {
          next:(resp:string)=>
          {
            if(resp=="success")
            {
              this.myrouter.navigateByUrl("/showcart");
            }
            else
            {
              this.msg="Problem while adding to cart";
            }
          },
          error:(err)=>
          {
            alert("there is some error")
            alert(err)
            this.msg=err;
          }
        }
      )
    }
    else
    {
      this.myrouter.navigateByUrl("/login?pid="+this.prodid);
    }
  }

  updatecart()
  {
    if(sessionStorage.getItem("username")!=null)
    {
      var tcost=Number(this.qty)*this.remamt;
      var mydata = {id:this.cartobjid,qty:this.qty,totalcost:tcost}
      this.cartsrvobj.updatecart(mydata).subscribe(
        {
          next:(resp:any[])=>
          {
            if(resp["nModified"]==1)
            {
              this.myrouter.navigateByUrl("/showcart");
            }
            else
            {
              this.msg="Problem while adding to cart";
            }
          },
          error:(err)=>
          {
            alert("there is some error")
            alert(err)
            this.msg=err;
          }
        }
      )
    }
    else
    {
      this.myrouter.navigateByUrl("/login?pid="+this.prodid);
    }
  }

  // prodcheck() {
  //   this.cartservobj
  //     .fetchcartbyitem(this.prodid, sessionStorage.getItem('username'))
  //     .subscribe({
  //       next: (res: any[]) => {
  //         if (res.length > 0) {
  //           if (res[0].qty <= this.stock) {
  //             this.quantity = res[0].qty;
  //           } else {
  //             this.quantity = String(this.stock);
  //             this.msg =
  //               'The quantity has been updated to maximum stocks available!!';
  //           }
  //           this.buttonflag = true;
  //         } else {
  //           this.buttonflag = false;
  //           this.quantity = '';
  //         }
  //       },
  //       error: (err) => {
  //         console.log(err);
  //       },
  //     });
  // }

  // updatecart() {
  //   var newtotcost = Number(this.quantity) * this.nrate;
  //   var mydata = {
  //     pid: this.prodid,
  //     un: sessionStorage.getItem('username'),
  //     ncost: newtotcost,
  //     qty: this.quantity,
  //   };
  //   this.cartservobj.updatecartitem(mydata).subscribe({
  //     next: (resp) => {
  //       if (resp['nModified'] == 1) {
  //         this.myrouter.navigateByUrl('/cart');
  //       } else {
  //         alert('Not Updated');
  //       }
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }



}
