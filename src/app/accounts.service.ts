import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Signup } from './signup';
import { SignupComponent } from './signup/signup.component';
import {Conn} from './conn'

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private myhttp:HttpClient) { }

  login(uname:string):Observable<Signup[]>
  {
    var bodydata={
      uname:uname,
    }
    return this.myhttp.post <Signup[]>(Conn.nodeurl+"/login", bodydata, {responseType:"json"} )
  }

  //so basically we get an observable of type signup
  srchuser(uname:string):Observable <Signup>
  {
     return this.myhttp.get <Signup> (Conn.nodeurl+"/searchuser?uname="+uname, {responseType:"json"})
     //by doing <Account> i am actually converting the json object received to a class object so that i can literally
     //use the class objects attributes like normally
  }

  memlist():Observable <Signup[]>
  {
    //following is using classes
    return this.myhttp.get <Signup[]> (Conn.nodeurl+"/memlist")
    
    //following is without classes
    // return this.myhttp.get("/memlist")
  }

  changepass(databody)
  {
    return this.myhttp.put(Conn.nodeurl+"/changepass", databody, {responseType:"json"});
  }

  forgetpass(databody)
  {
    return this.myhttp.put(Conn.nodeurl+"/forgetpassword", databody, {responseType:"json"});
  }

  savecat2db(mydata)
  {
    return this.myhttp.post(Conn.nodeurl+"/addcat", mydata, {responseType:"text"})
  }

  fetchallcat()
  {
    return this.myhttp.get (Conn.nodeurl+"/fetchallcat", {responseType:"json"})
  }

  savescat2db(mydata)
  {
    return this.myhttp.post(Conn.nodeurl+"/addsubcat", mydata, {responseType:"text"})
  }

  fetchallsubcat()
  {
    return this.myhttp.get(Conn.nodeurl+"/fetchallsubcat", {responseType:"json"})
  }

  fetchsubcatbycatid(catid)
  {
    return this.myhttp.get (Conn.nodeurl+"/fetchsubcatbycatid?catid="+catid ,{responseType:"json"})
  }

  saveprod2db(mydata)
  {
    return this.myhttp.post(Conn.nodeurl+"/addprod", mydata, {responseType:"text"})
  }

  catupdate(updatedata)
  {
    return this.myhttp.post(Conn.nodeurl+"/updatecat", updatedata, {responseType:"json"})
  }

  fetchsubcatdetailsbyid(scid)
  {
    return this.myhttp.get(Conn.nodeurl+"/fetchscatdetailsbyid?subcatid="+scid, {responseType:"json"})
  }

  updatesubcat(updatedData)
  {
    return this.myhttp.put(Conn.nodeurl+"/updatesubcat", updatedData, {responseType:"json"});
  }

  fetchprodbyscid(scid)
  {
    return this.myhttp.get(Conn.nodeurl+"/fetchprodbyscid?subcatid="+scid, {responseType:"json"})
  }

  fetchproddetailsbyid(prodid)
  {
    return this.myhttp.get(Conn.nodeurl+"/fetchproddetailsbyid?prodid="+prodid, {responseType:"json"})
  }

  activateaccount(hashval)
  {
    return this.myhttp.put(Conn.nodeurl+"/activateaccount", hashval, {responseType:"json"});
  }

  updateproduct(updatedData)
  {
    return this.myhttp.put(Conn.nodeurl+"/updateprod", updatedData, {responseType:"json"});
  }

  setnewpass(data)
  {
    return this.myhttp.put(Conn.nodeurl+ "/setnewpass", data, {responseType:'json'})
  }

}
