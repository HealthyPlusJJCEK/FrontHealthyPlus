import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emergencias',
  templateUrl: './emergencias.component.html',
  styleUrls: ['./emergencias.component.css']
})
export class EmergenciasComponent implements OnInit {

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
