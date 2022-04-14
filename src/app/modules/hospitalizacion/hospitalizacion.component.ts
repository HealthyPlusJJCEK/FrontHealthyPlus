import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-hospitalizacion',
  templateUrl: './hospitalizacion.component.html',
  styleUrls: ['./hospitalizacion.component.css']
})
export class HospitalizacionComponent implements OnInit {

  constructor( private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle("Hospitalidad")
  }
  issloading=true;
  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.issloading=false;
    },1000)
  }


}
