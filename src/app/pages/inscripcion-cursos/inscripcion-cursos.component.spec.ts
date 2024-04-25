import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionCursosComponent } from './inscripcion-cursos.component';

describe('InscripcionCursosComponent', () => {
  let component: InscripcionCursosComponent;
  let fixture: ComponentFixture<InscripcionCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscripcionCursosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InscripcionCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
