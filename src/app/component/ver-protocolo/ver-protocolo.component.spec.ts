import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerProtocoloComponent } from './ver-protocolo.component';

describe('VerProtocoloComponent', () => {
  let component: VerProtocoloComponent;
  let fixture: ComponentFixture<VerProtocoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerProtocoloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerProtocoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
