import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoprotocoloporidComponent } from './nuevoprotocoloporid.component';

describe('NuevoprotocoloporidComponent', () => {
  let component: NuevoprotocoloporidComponent;
  let fixture: ComponentFixture<NuevoprotocoloporidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoprotocoloporidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoprotocoloporidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
