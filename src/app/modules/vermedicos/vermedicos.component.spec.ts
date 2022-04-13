import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VermedicosComponent } from './vermedicos.component';

describe('VermedicosComponent', () => {
  let component: VermedicosComponent;
  let fixture: ComponentFixture<VermedicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VermedicosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VermedicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
