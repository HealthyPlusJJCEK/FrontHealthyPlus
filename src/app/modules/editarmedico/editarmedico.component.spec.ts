import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarmedicoComponent } from './editarmedico.component';

describe('EditarmedicoComponent', () => {
  let component: EditarmedicoComponent;
  let fixture: ComponentFixture<EditarmedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarmedicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarmedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
