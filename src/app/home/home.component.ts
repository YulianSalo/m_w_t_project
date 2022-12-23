import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  screenHeight: number;
  screenWidth: number;
  showHeader:boolean=true;

  imageObject: Array<object> = [
    {
      image: 'images/banner.jpg',
      thumbImage: 'images/11.jpg',
      alt: 'banner 1',
      title: 'title 1 of image',
    },
    {
      image: 'images/banner2.jpg',
      thumbImage: 'images/22.jpg',
      alt: 'banner 2',
      title: 'title 2 of image',
    },
  ];
  constructor() { 
    this.getScreenSize();
  }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
      this.screenHeight = window.innerHeight;
      this.screenWidth = window.innerWidth;
      console.log(this.screenHeight, this.screenWidth);
      if(this.screenWidth < 800)
        this.showHeader = false;
      else 
        this.showHeader = true;
      } 
      

}
