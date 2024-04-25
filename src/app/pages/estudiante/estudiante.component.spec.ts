import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudianteComponent } from './estudiante.component';
import { EstudianteService } from '../../services/estudiante.service';
import { PaginadoService } from '../../services/util/paginado.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('EstudianteComponent', () => {
  let component: EstudianteComponent;
  let fixture: ComponentFixture<EstudianteComponent>;
  let estudianteServiceSpy: jasmine.SpyObj<EstudianteService>; 
  let paginadoService: PaginadoService;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('EstudianteService', ['obtenerEstudiantes', 'obtenerCursosInscritosEstudiante', 'guardarEstudiante', 'actualizarEstudiante', 'eliminarEstudiante']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      providers: [EstudianteService, PaginadoService, FormBuilder, { provide: EstudianteService, useValue: spy } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudianteComponent);
    component = fixture.componentInstance;
    estudianteServiceSpy = TestBed.inject(EstudianteService) as jasmine.SpyObj<EstudianteService>; // Convertir a tipo SpyObj
    paginadoService = TestBed.inject(PaginadoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve students', () => {
    const dummyStudents = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' }
    ];
    const response = { code: "200", result: dummyStudents };
  
    estudianteServiceSpy.obtenerEstudiantes.and.returnValue(of(response));
  
    component.obtenerEstudiantes();
  
    expect(component.listaEstudiantes).toEqual(dummyStudents);
  });

});
