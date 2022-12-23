import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser'
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  personName:string;
  loginStatus:boolean=false;
  admin_header:boolean=false;
  stxt:string;

  constructor(private mytitle:Title, private myrouter:Router) { 
    
    //following is an event we created not a function which will be invoked auto whenever we do navigationEnd Event

    myrouter.events.subscribe({
      next:(event) => 
      {
        if (event instanceof NavigationEnd) 
        {
          //navigationEnd --> as soon as our new comp is being loaded --> before new comp loaded
          //navigationStart --> as soon as our current comp is being directed to new comp --> after old comp left
          this.ngOnInit();
        }
      }
    }) 
  }

  ngOnInit(): void {

    if(sessionStorage.getItem("pname") == undefined)
    {
      this.loginStatus=false;
      this.personName="Guest";
    }
    else
    {
      this.loginStatus=true;
      this.personName= sessionStorage.getItem("pname");
    }

    if(sessionStorage.getItem("usertype")== "admin")
    {
      this.admin_header=true;
    }
    else
    {
      this.admin_header=false;
    }

    //but now the problem we are facing is this, we can't view our name unless we refresh
    //so to deal with it we have (ROUTER NAVIGATION INSTANCE) router.events --> navigateEnd, navigateStart etc methods
  }

  setTitle(tit:string)
  {
    this.mytitle.setTitle(tit)
  }

  onsearch()
  {
    this.myrouter.navigate(["/searchresults"],{ queryParams: { s: this.stxt } });
  }

}
