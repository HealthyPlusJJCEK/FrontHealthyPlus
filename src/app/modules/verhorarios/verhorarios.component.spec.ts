import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerhorariosComponent } from './verhorarios.component';

describe('VerhorariosComponent', () => {
  let component: VerhorariosComponent;
  let fixture: ComponentFixture<VerhorariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerhorariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerhorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
