import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Verconsultas2Component } from './verconsultas2.component';

describe('Verconsultas2Component', () => {
  let component: Verconsultas2Component;
  let fixture: ComponentFixture<Verconsultas2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Verconsultas2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Verconsultas2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
