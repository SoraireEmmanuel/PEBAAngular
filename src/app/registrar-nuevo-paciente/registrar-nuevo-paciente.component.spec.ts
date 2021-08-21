import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarNuevoPacienteComponent } from './registrar-nuevo-paciente.component';

describe('RegistrarNuevoPacienteComponent', () => {
  let component: RegistrarNuevoPacienteComponent;
  let fixture: ComponentFixture<RegistrarNuevoPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarNuevoPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarNuevoPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
