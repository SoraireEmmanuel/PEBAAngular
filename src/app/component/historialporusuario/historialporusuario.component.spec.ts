import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialporusuarioComponent } from './historialporusuario.component';

describe('HistorialporusuarioComponent', () => {
  let component: HistorialporusuarioComponent;
  let fixture: ComponentFixture<HistorialporusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialporusuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialporusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
