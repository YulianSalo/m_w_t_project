import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import {Conn} from '../conn';
@Component({
  selector: 'app-showcart',
  templateUrl: './showcart.component.html',
  styleUrls: ['./showcart.component.css']
})
export class ShowcartComponent implements OnInit {

  cartprods:string[];
  msg:string;
  flag:boolean;
  gtotal:number=0;
  
  constructor(private cartsrvobj:CartService,private myhttp:HttpClient) {
   }

  ngOnInit(): void {
    this.getcart();
  }

  getcart()
  {
    this.cartsrvobj.fetchcart(sessionStorage.getItem("username")).subscribe(
      {
        next:(resp:any[])=>
        {
          if(resp.length==0)
          {
            this.flag=false;
          }
          else
          {
            this.cartprods=resp;
            this.flag=true;
            this.gtotal=0;
            for(var i=0;i<this.cartprods.length;i++)
            {
              this.gtotal+=this.cartprods[i]["totalcost"];
            }
            sessionStorage.setItem("billtotal",this.gtotal.toString());
          }
        },
        error:(err)=>
        {

        }
      }
    )
  }

  ondelete(prodid)
  {
      //  alert(prodid)

      var confrm= confirm("Are you sure want to delete?");
      if(confrm)
      {
          //note that we get a json object only as a response and not an array of objects
          this.myhttp.delete(Conn.nodeurl + "/delcartprod?prodid="+prodid,{responseType:"json"}).subscribe({
            next:(res)=>{
              if(res["deletedCount"] == 1)
              {
                alert("Item Deleted Successfully!")
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
