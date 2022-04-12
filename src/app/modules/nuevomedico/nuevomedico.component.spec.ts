import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevomedicoComponent } from './nuevomedico.component';

describe('NuevomedicoComponent', () => {
  let component: NuevomedicoComponent;
  let fixture: ComponentFixture<NuevomedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevomedicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevomedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
