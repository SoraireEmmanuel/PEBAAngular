import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoProtocoloComponent } from './nuevo-protocolo.component';

describe('NuevoProtocoloComponent', () => {
  let component: NuevoProtocoloComponent;
  let fixture: ComponentFixture<NuevoProtocoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoProtocoloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoProtocoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
