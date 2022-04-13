import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuirofanoComponent } from './quirofano.component';

describe('QuirofanoComponent', () => {
  let component: QuirofanoComponent;
  let fixture: ComponentFixture<QuirofanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuirofanoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuirofanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
