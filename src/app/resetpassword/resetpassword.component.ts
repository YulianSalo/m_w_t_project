import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {Conn} from '../conn'

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  username:string;
  msg:string;
  constructor( private myhttp:HttpClient) { }
  ngOnInit(): void {
  }
  onpassreset()
  {
    var mydata = {uname:this.username};
    this.myhttp.post(Conn.nodeurl + "/resetpassword",mydata,{responseType:"text"}).subscribe(
      {
        next:(resp)=>
        {
          this.msg=resp;
        },
        error:(err)=>
        {
          this.msg=err;
        }
      }
    )
  }

}
