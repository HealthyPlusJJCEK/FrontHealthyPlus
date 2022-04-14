import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-quirofano',
  templateUrl: './quirofano.component.html',
  styleUrls: ['./quirofano.component.css']
})
export class QuirofanoComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle("Quifofano")
  }
  issloading=true;
  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.issloading=false;
    },1000)
  }

}
