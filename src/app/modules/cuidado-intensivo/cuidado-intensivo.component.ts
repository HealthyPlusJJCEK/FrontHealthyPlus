import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-cuidado-intensivo',
  templateUrl: './cuidado-intensivo.component.html',
  styleUrls: ['./cuidado-intensivo.component.css']
})
export class CuidadoIntensivoComponent implements OnInit {

  constructor(private title: Title) { }

  issloading=true;
  ngOnInit(): void {
    this.title.setTitle("Cuidados intensivos")
  }
  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.issloading=false;
    },1000)
  }

}
