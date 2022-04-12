import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Vercitas2Component } from './vercitas2.component';

describe('Vercitas2Component', () => {
  let component: Vercitas2Component;
  let fixture: ComponentFixture<Vercitas2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Vercitas2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Vercitas2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
