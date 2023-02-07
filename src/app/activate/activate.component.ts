import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {

  uhash:string;
  msg:string;
  flag:boolean;

  constructor(private myroute:ActivatedRoute, private accsrvobj:AccountsService, private myrouter:Router) {
    this.myroute.queryParams.subscribe({
      next:(res)=>{
        this.uhash= res["userhash"];
        this.activateid();
      },
      error:(err)=>{

      }

    })
   }

  ngOnInit(): void {
  }

  activateid()
  {
    var hashval={
      uhash:this.uhash
    }
    this.accsrvobj.activateaccount(hashval).subscribe({
      next:(res)=>{
        if(res["modifiedCount"] ==1)
            {
              this.flag=true;

            }
            else
            {
              this.flag=false;
            }
      },
      error:(err)=>{
        this.flag=false;
      }
    })
  }

}
