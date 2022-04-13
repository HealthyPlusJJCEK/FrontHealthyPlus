import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuidadoIntensivoComponent } from './cuidado-intensivo.component';

describe('CuidadoIntensivoComponent', () => {
  let component: CuidadoIntensivoComponent;
  let fixture: ComponentFixture<CuidadoIntensivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuidadoIntensivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuidadoIntensivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
