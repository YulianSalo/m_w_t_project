import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Conn } from '../conn';
import * as CryptoJS from 'crypto-js'
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.css']
})
export class ResetpassComponent implements OnInit {

  flag:boolean=true;
  newpass:string;
  cnewpass:string;
  msg:string;
  userhash:string;
  expirytime:string;
  username:string;
  constructor(private myroute:ActivatedRoute, private myhttp:HttpClient, private accsrvobj:AccountsService) {
    this.myroute.queryParams.subscribe(
      {
        next:(resp)=>
        {
          this.userhash = resp["code"];
          this.myhttp.get(Conn.nodeurl + "/checktime?hash=" + this.userhash,{responseType:"json"}).subscribe(
            {
              next:(resp:any[])=>
              {
                if(resp.length==0)
                {
                  this.flag=false;
                  this.msg="Try again";
                }
                else
                {
                  this.expirytime=resp[0].exptime;
                  this.username=resp[0].username;
                  var currentDate = new Date();
                  console.log(currentDate)
                  if(currentDate.toString()>this.expirytime)
                  {
                    this.flag=false;
                    this.msg="Link Expired. Please request new link";
                  }
                  else
                  {
                    this.flag=true;
                  }

                }
              },
              error:(err)=>
              {

              }
            }
          )
        },
        error(err)
        {

        }
      }
    )

   }

  ngOnInit(): void {
  }
  resetpass()
  {
    if(this.cnewpass!=this.newpass)
    {
      this.msg="New Passwords Doesn't Match"
    }
    else
    {
      var encypswd= CryptoJS.AES.encrypt(this.newpass, Conn.skey).toString();
      var data={
        npass:encypswd,
        uname:this.username
      }
      this.accsrvobj.setnewpass(data).subscribe({
        next:(res)=>{
          if(res['modifiedCount']==1)
          {
            this.msg= "Password Changed Successfully"
          }
          else
          {
            this.msg= "Password Doesn't Changed Successfully"
          }
        },
        error:(err)=>{
          this.msg=err;
        }
      })
    }


  }

}
