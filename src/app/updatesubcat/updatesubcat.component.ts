import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-updatesubcat',
  templateUrl: './updatesubcat.component.html',
  styleUrls: ['./updatesubcat.component.css']
})
export class UpdatesubcatComponent implements OnInit {

  category:string="";
  scatname:string;
  myfile:File;
  msg:string;
  subcatimg:string;
  
  allcatlist:String[];
  allsubcatlist:String[];

  scid:any;

  constructor(private catsrvobj:AccountsService, private myroute:ActivatedRoute) {
    
    this.myroute.queryParams.subscribe({
      
      next:(params)=>{
        this.scid= params["subcatid"];
        this.fetchscatdetails();
      }
    })
  }
  //activated route is used in order to grab the query params
  
  
  ngOnInit(): void {
    this.fetchcat();
  }

  fileselected(event)
  {
    this.myfile= event.target.files[0]
    console.log(event);
  };

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


  fetchscatdetails()
  {
    this.catsrvobj.fetchsubcatdetailsbyid(this.scid).subscribe(
      {
        next:(resp:any[])=>
        {
          this.category=resp[0].category;
          this.scatname=resp[0].subcatname;
          this.subcatimg=resp[0].subcatpic;

        },
        error:(err)=>
        {
          this.msg=err;
        }
      }
    );
  }


  updatesubcat()
  {
    var mydata= new FormData

    if(this.myfile != null) // user has chosen new file
    {
      mydata.append("cid",this.category);
      mydata.append("scatname",this.scatname); //either old/new name
      mydata.append("scatpic",this.myfile);  //new pic
      mydata.append("oldpicname",this.subcatimg); //sent for deletion
      mydata.append("scid",this.scid);
    }
    else
    {
      mydata.append("cid",this.category);
      mydata.append("scatname",this.scatname);
      mydata.append("oldpicname",this.subcatimg); //sent for retaining old name
      mydata.append("scid",this.scid);
    }

    this.catsrvobj.updatesubcat(mydata).subscribe(
      {
        next:(res) =>{
          if(res['nModified']==1)
          {
            this.msg= "Sub Category Updated Successfully"
          }
          else
          {
            this.msg= "Sub Category Not Updated Successfully"
          }
        },

        error:(err) =>{

        }
      }
    )
    
  }

}
