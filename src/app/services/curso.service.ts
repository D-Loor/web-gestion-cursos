import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private baseUrl = environment.urlWS;
  
  constructor(private http:HttpClient) { }

  obtenerCursos() {
    const url$ = encodeURI(`${this.baseUrl}curso`);
    return this.http.get<any>(url$);
  }

  obtenerCursosActivos() {
    const url$ = encodeURI(`${this.baseUrl}cursos-activos`);
    return this.http.get<any>(url$);
  }

  obtenerTotalCursos(){
    const url$ = encodeURI(`${this.baseUrl}total-cursos`);
    return this.http.get<any>(url$);
  }

  obtenerTopCursos(nTop: number, nMeses: number){
    const url$ = encodeURI(`${this.baseUrl}top-cursos-estudiantes/${nTop}/${nMeses}`);
    return this.http.get<any>(url$);
  }

  obtenerTopEstudiantes(nTop: number){
    const url$ = encodeURI(`${this.baseUrl}top-estudiantes-cursos/${nTop}`);
    return this.http.get<any>(url$);
  }

  guardarCurso(data: any) {
    const url$ = encodeURI(`${this.baseUrl}curso`);
    return this.http.post<any>(url$, data);
  }

  actualizarCurso(data: any) {
    const url$ = encodeURI(`${this.baseUrl}curso/${data.id_curso}`);
    return this.http.put<any>(url$, data);
  }

  eliminarCurso(id: number) {
    const url$ = encodeURI(`${this.baseUrl}curso/${id}`);
    return this.http.delete<any>(url$);
  }

  obtenerEstudiantesCursos() {
    const url$ = encodeURI(`${this.baseUrl}curso-estudiantes`);
    return this.http.get<any>(url$);
  }

  inscribirEstudianteCurso(data: any) {
    const url$ = encodeURI(`${this.baseUrl}curso-estudiantes`);
    return this.http.post<any>(url$, data);
  }

  actualizarEstudianteCurso(data: any) {
    const url$ = encodeURI(`${this.baseUrl}curso-estudiantes/${data.id_curso_estudiante}`);
    return this.http.put<any>(url$, data);
  }

  desistirEstudianteCurso(id: number) {
    const url$ = encodeURI(`${this.baseUrl}curso-estudiantes/${id}`);
    return this.http.delete<any>(url$);
  }

  obtenerProfesoresCursos() {
    const url$ = encodeURI(`${this.baseUrl}curso-profesores`);
    return this.http.get<any>(url$);
  }

  asignarProfesorCurso(data: any) {
    const url$ = encodeURI(`${this.baseUrl}curso-profesores`);
    return this.http.post<any>(url$, data);
  }

  actualizarProfesorCurso(data: any) {
    const url$ = encodeURI(`${this.baseUrl}curso-profesores/${data.id_curso_profesor}`);
    return this.http.put<any>(url$, data);
  }

  desasignarProfesorCurso(id: number) {
    const url$ = encodeURI(`${this.baseUrl}curso-profesores/${id}`);
    return this.http.delete<any>(url$);
  }

}
