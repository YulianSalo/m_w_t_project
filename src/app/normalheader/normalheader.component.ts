import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-normalheader',
  templateUrl: './normalheader.component.html',
  styleUrls: ['./normalheader.component.css']
})
export class NormalheaderComponent implements OnInit {

  msg:string;
  allcatlist:string[];

  constructor(private catsrvobj:AccountsService) { }

  ngOnInit(): void {
    this.fetchcat();
  }

  fetchcat()
  {
    this.catsrvobj.fetchallcat().subscribe({
      next:(res:any[])=>{
        this.allcatlist= res;
      },
      error:(err)=>{
        this.msg=err;
      }
    })
  }

}
