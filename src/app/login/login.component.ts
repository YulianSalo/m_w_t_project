import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsService } from '../accounts.service';
import {Conn} from '../conn';
import * as CryptoJS from 'crypto-js'
import { CookieService } from 'ngx-cookie-service';
import { Signup } from '../signup';
declare const $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string;
  password:string;
  msg:string;
  prodid:string;
  rembme:boolean;

  constructor( private cookiesrvobj: CookieService, private myrouter:Router , private loginservice:AccountsService,private myroute:ActivatedRoute, private router:Router) {

    this.myroute.queryParams.subscribe({
      next:(resp)=>{
        this.prodid=resp["pid"];
      },
      error:(err)=>{}
    })

    const cookieExists: boolean = this.cookiesrvobj.check('usercookie');

    if(cookieExists==true)
    {
      var userdata = JSON.parse(this.cookiesrvobj.get('usercookie'));
      this.loginservice.login(userdata.username).subscribe(
        {
          next:(resp:Signup[])=>
          {
            if(resp?.[0]==null)
            {
              this.msg="Incorrect Username";
              $("#msg").fadeIn(1000).fadeOut(2500);
            }
            else
            {
              if(resp[0].activated==true)
              {
                if(resp[0].pass==userdata.pass)
                {
                  sessionStorage.setItem("pname",resp[0].name);
                  sessionStorage.setItem("username",resp[0].username);
                  sessionStorage.setItem("usertype",resp[0].usertype);
                  if(resp[0].usertype=="admin")
                  {
                    this.myrouter.navigateByUrl("/adminpanel");
                  }
                  else
                  {
                    this.myrouter.navigateByUrl("/home")
                  }
                }
              } else {
                this.msg = "Please Activate Your Account!"
                $("#msg").fadeIn(1000).fadeOut(2500);
              }

            }
          },
          error:(err)=>
          {
            this.msg=err;
          }
        })
    }
  }

  ngOnInit(): void {

  }


  onlogin()
  {
    this.loginservice.login(this.username).subscribe(
      {
        next:(res)=>
            {
              if(res[0])
              {
                var decypswd= CryptoJS.AES.decrypt(res[0].pass,Conn.skey ).toString(CryptoJS.enc.Utf8);
                if(decypswd == this.password)
                {
                  if(res?.[0]?.activated == true)
                  {
                    if(this.rembme==true)
                    {
                      var cookiedata = {username:this.username,pass:res[0].pass};
                      this.cookiesrvobj.set("usercookie", JSON.stringify(cookiedata),20);
                    }
                    sessionStorage.setItem("pname",res[0].name);
                    sessionStorage.setItem("username",res[0].username);
                    sessionStorage.setItem("usertype",res[0].usertype);

                    if(this.prodid!=undefined)
                      this.myrouter.navigate(["/showpdetails"],{queryParams:{pid:this.prodid}});
                    else
                    {
                      if(res[0].usertype == "admin")
                        this.myrouter.navigateByUrl("/adminpanel")
                      else
                      this.myrouter.navigateByUrl("/home")
                    }
                  }
                  else {
                    this.msg="To Proceed Ahead, First Activate your account."
                  }
                }
                else {
                  this.msg="Incorrect Password"
                }
              }
              else {
                this.msg = "User Doesn't Exist, Please Create your Account First!"
                $("#msg").fadeIn(1000).fadeOut(500);
              }
            },
        error:(err)=>{
        }
      }
    )
  }
}



