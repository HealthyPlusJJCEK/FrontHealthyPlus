import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersucursalesComponent } from './versucursales.component';

describe('VersucursalesComponent', () => {
  let component: VersucursalesComponent;
  let fixture: ComponentFixture<VersucursalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersucursalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VersucursalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
