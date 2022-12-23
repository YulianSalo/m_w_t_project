import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Signup } from '../signup';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.css']
})
export class AddadminComponent implements OnInit {

  nm:string;
  phone:number;
  msg:string;
  email:string;
  password:string;
  
  signupobj:Signup;

  constructor(private myhttp: HttpClient, private signupservice:SignupService) { }

  ngOnInit(): void {
  }

  onsignup()
  {
    this.signupobj= new Signup(this.nm,this.phone,this.email,this.password, "admin");
    
    //here save2db type is observer
    this.signupservice.save2db(this.signupobj).subscribe({
      next:(resp)=>{
        this.msg= resp;
      },
      error:(err)=>{
        this.msg= err;
      }
    })
    
  }

}
