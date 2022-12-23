import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Conn} from './conn'

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private myhttp:HttpClient) { }

  savetocart(cartdata)
  {
    return this.myhttp.post(Conn.nodeurl+ "/addtocart", cartdata, {responseType:"text"})
  }

  fetchcart(uname)
  {
    return this.myhttp.get(Conn.nodeurl+ "/fetchcart?un=" + uname,{responseType:"json"})
  }

  savetocheckout(mydata)
  {
    return this.myhttp.post(Conn.nodeurl+ "/checkout", mydata, {responseType:"text"})
  }

  fetchorderid(uname)
  {
    return this.myhttp.get(Conn.nodeurl+ "/getordernum?un=" + uname,{responseType:"json"})
  }

  updatestock(updtitems:any[])
  {
    return this.myhttp.put(Conn.nodeurl+ "/updatestock",updtitems,{responseType:"text"})
  }

  saveorderprods(orderitems)
  {
    return this.myhttp.post(Conn.nodeurl+ "/orderitems",orderitems,{responseType:"text"});
  }
  delcart()
  {
    return this.myhttp.delete(Conn.nodeurl+ "/emptycart?un=" + sessionStorage.getItem("username") ,{responseType:"text"});
  }
  
  //following is fetching order id from checkout
  fetchuserorder(uname)
  {
    return this.myhttp.get(Conn.nodeurl+ "/getuserorders?un=" + uname,{responseType:"json"})
  }

  //following is fetching orders from ordered products with the id passed as query params
  fetchorderprods(oid)
  {
    return this.myhttp.get(Conn.nodeurl+ "/getorderprods?oid=" + oid,{responseType:"json"})
  }

  //to display to admin
  fetchallorders()
  {
    return this.myhttp.get(Conn.nodeurl+ "/getallorders",{responseType:"json"})
  }

  updatestatus(data)
  {
    return this.myhttp.put(Conn.nodeurl+ "/updatetorderstatus",data,{responseType:"json"})
  }

  updatecart(data)
  {
    return this.myhttp.put(Conn.nodeurl+ "/updatecart",data,{responseType:"json"})
  }


}
