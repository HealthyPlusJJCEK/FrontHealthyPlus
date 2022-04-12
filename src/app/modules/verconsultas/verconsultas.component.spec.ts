import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerconsultasComponent } from './verconsultas.component';

describe('VerconsultasComponent', () => {
  let component: VerconsultasComponent;
  let fixture: ComponentFixture<VerconsultasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerconsultasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerconsultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
