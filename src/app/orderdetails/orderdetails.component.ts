import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {

  orderid:string;
  orderprods:string[];
  constructor(private cartsrvobj:CartService, private myroute:ActivatedRoute) { 

    this.myroute.queryParams.subscribe(
      {
        next:(resp)=>
        {
          this.orderid=resp["oid"];
          this.fetchorderproducts();
        },
        error:()=>
        {

        }
      }
    )
  }

  ngOnInit(): void {
  }
  fetchorderproducts()
  {
    this.cartsrvobj.fetchorderprods(this.orderid).subscribe(
      {
        next:(resp:any[])=>
        {
          this.orderprods=resp;
        },
        error:(err)=>
        {
          alert(err);
        }
      }
    )
  }


}
