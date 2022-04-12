import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevacitaComponent } from './nuevacita.component';

describe('NuevacitaComponent', () => {
  let component: NuevacitaComponent;
  let fixture: ComponentFixture<NuevacitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevacitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevacitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
