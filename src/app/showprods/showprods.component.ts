import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-showprods',
  templateUrl: './showprods.component.html',
  styleUrls: ['./showprods.component.css']
})
export class ShowprodsComponent implements OnInit {

  scid:string;
  allprodlist:any[];
  flag:boolean=false;
  msg:string;
  
  constructor(private catsrvobj:AccountsService, private myroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.myroute.queryParams.subscribe(
      {
        next:(resp)=>
        {
          this.scid=resp["scid"];
          this.fetchprodbyscid();

        },
        error:(err)=>
        {

        }
      }
    )
  }

  fetchprodbyscid()
  {
    this.catsrvobj.fetchprodbyscid(this.scid).subscribe({
      next:(res:any[])=>{
        if(res.length>0)
        {
          this.allprodlist= res;
          this.flag=true;
          this.msg=null;
        }
        else
        {
          this.flag=false;
          this.msg="No Products to show"
        }
        
      },
      error:(err)=>{
        this.msg=err;
      }
    })
  }

}
