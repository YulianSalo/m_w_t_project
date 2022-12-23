import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  flag:boolean;
  saddr:string;
  pmode:string="";
  coname:string="";
  hname:string;
  cardno:Number;
  expmonth:Number;
  expyear:Number;
  cvv:Number;
  msg:string;

  constructor(private cartsrvobj:CartService, private myrouter:Router) { }

  ngOnInit(): void {
  }

  oncheckout()
  {
    var exp=this.expmonth + "/" + this.expyear;

    var mydata = {username:sessionStorage.getItem("username"), billamt:sessionStorage.getItem("billtotal"),status:"Payment Received, Order Processing",saddress:this.saddr,pmode:this.pmode,coname:this.coname,cardno:this.cardno,holdername:this.hname,cvv:this.cvv,exp:exp}

    this.cartsrvobj.savetocheckout(mydata).subscribe(
      {
        next:(resp:string)=>
        {
          if(resp=="success")
          {
            this.myrouter.navigateByUrl("/ordersummary");
            
          }
        },
        error:(err)=>
        {
          this.msg=err;
        }
      }
    )
  }

  showcarddetails()
  {
    if(this.pmode == "card")
    {
      this.flag=true;
    }
    else 
    {
      this.flag=false;
    }
  }

}
