import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EstudianteService } from './estudiante.service';
import { environment } from '../../environments/environment';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let httpMock: HttpTestingController;
  let url = environment.urlWS;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EstudianteService]
    });
    service = TestBed.inject(EstudianteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve students', () => {
    const dummyStudents = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];

    service.obtenerEstudiantes().subscribe(students => {
      expect(students).toEqual(dummyStudents);
    });

    const req = httpMock.expectOne(`${url}estudiante`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyStudents);
  });

  it('should retrieve student courses', () => {
    const dummyCourses = [{ id: 1, name: 'Math' }, { id: 2, name: 'Science' }];
    const studentId = 123;

    service.obtenerCursosInscritosEstudiante(studentId).subscribe(courses => {
      expect(courses).toEqual(dummyCourses);
    });

    const req = httpMock.expectOne(`${url}obtener-cursos-estudiante/${studentId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCourses);
  });

  it('should save a student', () => {
    const dummyStudent = { id: 1, name: 'John Doe', age: 25 };

    service.guardarEstudiante(dummyStudent).subscribe(response => {
      expect(response).toEqual(dummyStudent);
    });

    const req = httpMock.expectOne(`${url}estudiante`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyStudent);
    req.flush(dummyStudent);
  });

  it('should update a student', () => {
    const dummyStudent = { id_estudiante: 1, name: 'John Doe', age: 25 };

    service.actualizarEstudiante(dummyStudent).subscribe(response => {
      expect(response).toEqual(dummyStudent);
    });

    const req = httpMock.expectOne(`${url}estudiante/${dummyStudent.id_estudiante}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(dummyStudent);
    req.flush(dummyStudent);
  });

  it('should delete a student', () => {
    const studentId = 1;

    service.eliminarEstudiante(studentId).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${url}estudiante/${studentId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

});
