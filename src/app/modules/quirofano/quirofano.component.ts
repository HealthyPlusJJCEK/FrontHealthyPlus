import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quirofano',
  templateUrl: './quirofano.component.html',
  styleUrls: ['./quirofano.component.css']
})
export class QuirofanoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  issloading=true;
  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.issloading=false;
    },1000)
  }

}
