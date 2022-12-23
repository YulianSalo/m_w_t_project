import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Signup } from './signup';
import { Conn } from './conn'
@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private myhttp:HttpClient) { }

  //here as the observable response was - signup successful wch is string so observable<string>
  save2db(signupobj2:Signup):Observable<string>
  {
    return this.myhttp.post(Conn.nodeurl + "/signup",signupobj2, {responseType:"text"})
    //note here type of post method is observable
    // also we are not subscribing the observable here bcoz we were not able to see the asynchronus response sent by node to us
    // as initially response was empty so we can't see anything , later when callback function runs after getting response from node
    // before it our resp would have already run earlier

    // thats we subscribe it inside the app component
  }
}
