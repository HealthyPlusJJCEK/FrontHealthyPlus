import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerespaclidadesComponent } from './verespaclidades.component';

describe('VerespaclidadesComponent', () => {
  let component: VerespaclidadesComponent;
  let fixture: ComponentFixture<VerespaclidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerespaclidadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerespaclidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
