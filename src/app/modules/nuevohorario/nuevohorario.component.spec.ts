import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevohorarioComponent } from './nuevohorario.component';

describe('NuevohorarioComponent', () => {
  let component: NuevohorarioComponent;
  let fixture: ComponentFixture<NuevohorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevohorarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevohorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
