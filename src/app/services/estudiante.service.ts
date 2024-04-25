import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  private baseUrl = environment.urlWS;
  
  constructor(private http:HttpClient) { }

  obtenerEstudiantes() {
    const url$ = encodeURI(`${this.baseUrl}estudiante`);
    return this.http.get<any>(url$);
  }

  obtenerTotalEstudiantes() {
    const url$ = encodeURI(`${this.baseUrl}total-estudiantes`);
    return this.http.get<any>(url$);    
  }

  obtenerCursosInscritosEstudiante(id: number) {
    const url$ = encodeURI(`${this.baseUrl}obtener-cursos-estudiante/${id}`);
    return this.http.get<any>(url$);
  }

  guardarEstudiante(data: any) {
    const url$ = encodeURI(`${this.baseUrl}estudiante`);
    return this.http.post<any>(url$, data);
  }

  actualizarEstudiante(data: any) {
    const url$ = encodeURI(`${this.baseUrl}estudiante/${data.id_estudiante}`);
    return this.http.put<any>(url$, data);
  }

  eliminarEstudiante(id: number) {
    const url$ = encodeURI(`${this.baseUrl}estudiante/${id}`);
    return this.http.delete<any>(url$);
  }
}
