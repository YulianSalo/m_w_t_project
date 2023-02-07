import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-showsubcat',
  templateUrl: './showsubcat.component.html',
  styleUrls: ['./showsubcat.component.css']
})
export class ShowsubcatComponent implements OnInit {

  constructor(private catsrvobj:AccountsService, private myroute:ActivatedRoute) { }

  allsubcatlist:string[];
  msg:string;
  cid:string;
  flag:boolean=false;
  admin_header:boolean=false;

  ngOnInit(): void {
    this.myroute.queryParams.subscribe(
      {
        next:(resp)=>
        {
          this.cid=resp["cid"];
          this.fetchsubcatbycatid();

        },
        error:(err)=>
        {

        }
      }
    )
  }

  fetchsubcatbycatid()
  {
    this.catsrvobj.fetchsubcatbycatid(this.cid).subscribe({
      next:(res:any[])=>{
        if(res.length == 0)
        {
          this.msg="No Subcategories to show"
          this.flag=false;
        }
        else
        {
          this.allsubcatlist= res;
          this.flag=true;
        }


      },
      error:(err)=>{
        this.msg=err;
      }
    })
  }

}
