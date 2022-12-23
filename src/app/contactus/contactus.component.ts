import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Conn } from '../conn';


@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  pname:string;
  phone:string;
  emailid:string;
  message:string;
  msg:string;

  constructor(private myhttp:HttpClient) { }

  ngOnInit(): void {
  }

  sendmsg()
  {
    var maildata={
      name:this.pname,
      phone:this.phone,
      emailid:this.emailid,
      message:this.message

    }
    this.myhttp.post(Conn.nodeurl+ '/contactus',maildata,{responseType:'text'}).subscribe({
      next:(res)=>{
          this.msg=res;
      },
      error:(err)=>{
          this.msg=err;
      }
    })
  }

}
