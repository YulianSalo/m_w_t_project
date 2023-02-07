import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsService } from '../accounts.service';
import { Conn } from '../conn';
import * as CryptoJS from 'crypto-js'

@Component({
  selector: 'app-changepswd',
  templateUrl: './changepswd.component.html',
  styleUrls: ['./changepswd.component.css']
})
export class ChangepswdComponent implements OnInit {

  currpass:string;
  newpass:string;
  cnewpass:string;
  msg:string;

  constructor(private chngpassservice:AccountsService,private loginsrvobj:AccountsService,private myrouter:Router) { }

  ngOnInit(): void {
  }

  changepass()
  {
    if(this.newpass == this.cnewpass)
    {
        this.loginsrvobj.login(sessionStorage.getItem("username")).subscribe({
          next:(res)=>{

            var decypswd= CryptoJS.AES.decrypt(res[0].pass,Conn.skey ).toString(CryptoJS.enc.Utf8);
              console.log(decypswd);
              if(decypswd == this.currpass)
              {
                var encypswd= CryptoJS.AES.encrypt(this.newpass, Conn.skey).toString();
                var databody={
                      uname:sessionStorage.getItem("username"),
                      npass:encypswd
                }

                this.chngpassservice.changepass(databody).subscribe({

                  next:(res)=>{
                    if(res["modifiedCount"] ==1)
                    {
                      // this.msg="Password Changed Successfully";
                      alert("Password Changed Successfully, Re-login to proceed")
                      sessionStorage.clear();
                      this.myrouter.navigateByUrl("/login");
                    }
                    else
                    {
                      this.msg="Incorrect Current Password"
                    }
                  },
                  error:(err)=>{
                    this.msg=err;
                  }
                })

              }
              else
              {
                this.msg="Incorrect Current Password"
              }

          },
          error:(err)=>{
              this.msg=err;
          }
        })

    }
    else
    {
      this.msg="New Passwords Doesn't Match"
    }
  }

}
