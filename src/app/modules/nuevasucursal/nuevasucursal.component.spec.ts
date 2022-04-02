import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevasucursalComponent } from './nuevasucursal.component';

describe('NuevasucursalComponent', () => {
  let component: NuevasucursalComponent;
  let fixture: ComponentFixture<NuevasucursalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevasucursalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevasucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
