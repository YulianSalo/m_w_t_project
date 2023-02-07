import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { Signup } from '../signup';
import {Conn} from '../conn'
@Component({
  selector: 'app-listofmembers',
  templateUrl: './listofmembers.component.html',
  styleUrls: ['./listofmembers.component.css']
})
export class ListofmembersComponent implements OnInit {

  memblist:Signup[];
  msg:string;

  //step1: init http obj
  constructor(private myhttp:HttpClient, private memlistservice:AccountsService) { }

  //LISTOFMEMBERS WITH SERVICE AND CLASSES
  ngOnInit(): void {

    this.memlistservice.memlist().subscribe({
      next:(res)=>{
        this.memblist= res;
      },
      error:(err)=>{
        this.msg=err;
      }
    })
  }

  // //LISTOFMEMBERS WITH SERVICE
  // ngOnInit(): void {

  //   this.memlistservice.memlist().subscribe({
  //     next:(res)=>{
  //       this.memblist= res;
  //     },
  //     error:(err)=>{
  //       this.msg=err;
  //     }
  //   })
  // }

  ondelete(memid)
  {
      // alert(memid)

      var confrm= confirm("Are you sure want to delete?");
      if(confrm)
      {
          //note that we get a json object only as a response and not an array of objects
          this.myhttp.delete(Conn.nodeurl + "/deluser?uid="+memid,{responseType:"json"}).subscribe({
            next:(res)=>{
              if(res["deletedCount"] == 1)
              {
                alert("User Deleted Successfully!")
                this.ngOnInit()
                //this was the best part of todays lecture used to refresh the componenet
              }
            },
            error:(err)=>{
              this.msg=err;
            }
          })
    }
}

setadmin(memid)
{
  let type="admin"
  this.myhttp.put(Conn.nodeurl + "/changeusertype?uid="+memid+"&type="+type,{responseType:"json"}).subscribe({
    next:(res)=>{
      if(res["modifiedCount"] == 1)
      {
        alert("User type changed Successfully!")
        this.ngOnInit()
        //this was the best part of todays lecture used to refresh the componenet
      }
    },
    error:(err)=>{
      this.msg=err;
    }
  })
}

setnormal(memid)
{
  let type="normal"
  this.myhttp.put(Conn.nodeurl + "/changeusertype?uid="+memid+"&type="+type,{responseType:"json"}).subscribe({
    next:(res)=>{
      if(res["modifiedCount"] == 1)
      {
        alert("User type changed Successfully!")
        this.ngOnInit()
        //this was the best part of todays lecture used to refresh the componenet
      }
    },
    error:(err)=>{
      this.msg=err;
    }
  })
}

  // LISTOFMEMBERS WITHOUT SERVICE AND CLASSES

  // ngOnInit(): void {
  //   this.myhttp.get("http://localhost:3000/memlist").subscribe({
  //     next:(res:string[])=>{
  //       //alert(res);
  //       this.memblist= res;
  //     },
  //     error:(err)=>{
  //       //alert(err);
  //       this.msg=err;
  //     }
  //   })
  // }

}
