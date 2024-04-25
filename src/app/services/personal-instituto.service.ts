import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonalInstitutoService {

  private baseUrl = environment.urlWS;

  constructor(private http: HttpClient) { }

  login(data: any) {
    const url$ = encodeURI(`${this.baseUrl}login`);
    return this.http.post<any>(url$, data);
  }

  obtenerPersonal() {
    const url$ = encodeURI(`${this.baseUrl}persona-instituto`);
    return this.http.get<any>(url$);
  }

  obtenerPersonalPorRol(rol:string) {
    const url$ = encodeURI(`${this.baseUrl}obtener-personal-rol/${rol}`);
    return this.http.get<any>(url$);
  }

  guardarPersonal(data: any) {
    const url$ = encodeURI(`${this.baseUrl}persona-instituto`);
    return this.http.post<any>(url$, data);
  }

  actualizarPersonal(data: any) {
    const url$ = encodeURI(`${this.baseUrl}persona-instituto/${data.id_persona_instituto}`);
    return this.http.put<any>(url$, data);
  }

  eliminarPersonal(id: number) {
    const url$ = encodeURI(`${this.baseUrl}persona-instituto/${id}`);
    return this.http.delete<any>(url$);
  }
}
