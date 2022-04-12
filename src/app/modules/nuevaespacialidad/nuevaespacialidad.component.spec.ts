import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaespacialidadComponent } from './nuevaespacialidad.component';

describe('NuevaespacialidadComponent', () => {
  let component: NuevaespacialidadComponent;
  let fixture: ComponentFixture<NuevaespacialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaespacialidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaespacialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
