import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private cookiesrvobj:CookieService) {
    
    //clear will clear all the values stored inside the session
    sessionStorage.clear();
    this.cookiesrvobj.delete("usercookie")
   }

  ngOnInit(): void {
  }

}
