import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModalidadService {

  private baseUrl = environment.urlWS;
  
  constructor(private http:HttpClient) { }

  obtenerModalidades() {
    const url$ = encodeURI(`${this.baseUrl}modalidad`);
    return this.http.get<any>(url$);
  }

  obtenerModalidadesActivas() {
    const url$ = encodeURI(`${this.baseUrl}modalidades-activas`);
    return this.http.get<any>(url$);
  }

  guardarModalidad(data: any) {
    const url$ = encodeURI(`${this.baseUrl}modalidad`);
    return this.http.post<any>(url$, data);
  }

  actualizarModalidad(data: any) {
    const url$ = encodeURI(`${this.baseUrl}modalidad/${data.id_modalidad}`);
    return this.http.put<any>(url$, data);
  }

  eliminarModalidad(id: number) {
    const url$ = encodeURI(`${this.baseUrl}modalidad/${id}`);
    return this.http.delete<any>(url$);
  }
}
