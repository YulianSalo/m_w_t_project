import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-ordersummary',
  templateUrl: './ordersummary.component.html',
  styleUrls: ['./ordersummary.component.css']
})
export class OrdersummaryComponent implements OnInit {

  orderid:string;
  cartprods:any[];
  updateitems:any[]=[];
  orderprods:any[]=[];
  //this array will be sent to the node containing product id and stock ordered

  constructor(private cartsrvobj:CartService) { 
    this.fetchordernumber();
  }

  ngOnInit(): void {
  }

  fetchordernumber()
  {
    
    this.cartsrvobj.fetchorderid(sessionStorage.getItem("username")).subscribe(
      {
        next:(resp:any[])=>
        {
          console.log(resp);
          this.orderid=resp[0]["_id"];
          this.fetchcart();
        
        },
        error:(err)=>
        {

        }
      }
    )
  }

  //fetch order id --> fetch cart --> update stockdb -> add order details to new schema --> empty cart

  //as soon as we get our order id next task is to update the cart , for that first we will fetch cart details
  fetchcart()
  {
    this.cartsrvobj.fetchcart(sessionStorage.getItem("username")).subscribe(
      {
        next:(resp:any[])=>
        {
            this.cartprods=resp;
            this.updatestockdb();
        },
        error:(err)=>
        {

        }
      }
    )
  }

  //following is an efficient way of updating stock details without putting load on server 
  updatestockdb()
  {
    for(let x=0;x<this.cartprods.length;x++)
    {
      let updatedata={pid:this.cartprods[x]["prodid"],qty:this.cartprods[x]["qty"]};
      this.updateitems.push(updatedata);
    }
    this.cartsrvobj.updatestock(this.updateitems).subscribe(
      {
        next:()=>
        {
          this.saveorderitems();
        },
        error:()=>
        {

        }
      }
    )
  }

  saveorderitems()
  {
    this.orderprods=[];
    for(let x=0;x<this.cartprods.length;x++)
    {
      let myprod={orderid:this.orderid,pid:this.cartprods[x]["prodid"],pname:this.cartprods[x]["prodname"],prate:this.cartprods[x]["rate"],qty:this.cartprods[x]["qty"],tc:this.cartprods[x]["totalcost"],ppic:this.cartprods[x]["picture"], username:sessionStorage.getItem("username")}

      this.orderprods.push(myprod);
    }
    this.cartsrvobj.saveorderprods(this.orderprods).subscribe(
      {
        next:()=>
        {
          this.cartdel();
        },
        error:()=>
        {

        }
      }
    )
    
  }

  cartdel()
  {
    this.cartsrvobj.delcart().subscribe(
      {
        next:(resp)=>
        {

        },
        error:(err)=>
        {

        }
      }
    )
  }

}
