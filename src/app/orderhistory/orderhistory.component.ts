import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.css']
})
export class OrderhistoryComponent implements OnInit {
  orderlist:string[];
  msg:string;
  flag:boolean=false;
  constructor(private cartsrvobj:CartService) { 
    this.fetchuserorders();
  }

  ngOnInit(): void {
  }
  
  fetchuserorders()
  {
    this.cartsrvobj.fetchuserorder(sessionStorage.getItem("username")).subscribe(
      {
        next:(resp:any[])=>
        {
          if(resp.length>0)
          {
            this.flag=true;
            this.orderlist=resp;
          }
          else
          {
            this.flag=false;
            this.msg="No Orders found";
          }
        },
        error:(err)=>
        {
          this.msg=err;
        }
      }
    )
  }

  
}
