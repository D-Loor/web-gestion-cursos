import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private baseUrl = environment.urlWS;
  
  constructor(private http:HttpClient) { }

  obtenerRoles() {
    const url$ = encodeURI(`${this.baseUrl}rol`);
    return this.http.get<any>(url$);
  }
}
