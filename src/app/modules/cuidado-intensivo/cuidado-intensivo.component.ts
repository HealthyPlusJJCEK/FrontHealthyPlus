import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cuidado-intensivo',
  templateUrl: './cuidado-intensivo.component.html',
  styleUrls: ['./cuidado-intensivo.component.css']
})
export class CuidadoIntensivoComponent implements OnInit {

  constructor() { }

  issloading=true;
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.issloading=false;
    },1000)
  }

}
