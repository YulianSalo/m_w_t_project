import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-showcat',
  templateUrl: './showcat.component.html',
  styleUrls: ['./showcat.component.css']
})
export class ShowcatComponent implements OnInit {

  allcatlist:string[];
  msg:string;

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
