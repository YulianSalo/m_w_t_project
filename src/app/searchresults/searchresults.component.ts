import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Conn} from '../conn';
@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.css']
})
export class SearchresultsComponent implements OnInit {

  productslist:string[];
  msg:string;
  flag:boolean=false;
  searchtxt:string;
  constructor(private myroute:ActivatedRoute, private myhttp:HttpClient) { }

  ngOnInit(): void {
    this.myroute.queryParams.subscribe(
      {
        next:(resp)=>
        {
          this.searchtxt=resp["s"];
          this.searchprods();

        },
        error:(err)=>
        {

        }
      }
    )
  }

  searchprods()
  {
    this.myhttp.get(Conn.nodeurl + "/fetchproductbyname?s=" + this.searchtxt,{responseType:"json"}).subscribe(
      {
        next:(resp:any[])=>
        {
          this.productslist=resp;
          if(this.productslist.length==0)
          {
            this.msg="No Products";
            this.flag=false;
          }
          else
          {
            this.flag=true;
          }
        },
        error:(err)=>
        {
          this.msg=err;
        }
      }
    )
  }
}
