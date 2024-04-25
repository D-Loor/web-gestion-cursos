import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import e from 'express';

@Injectable({
  providedIn: 'root'
})
export class PaginadoService {

  private pageSize = environment.pageSize;
  private currentPage = 1;
  private listaCompleta: any[] = [];
  private listaAux: any[] = [];
  private listaFiltrada: any[] = [];

  constructor() { }

  getPageSize(): number {
    return this.pageSize;
  }

  setPageSize(value: number) {
    this.pageSize = value;
    this.updateListaFiltrada();
  }

  getCurrentPage(): number {
    return this.currentPage;
  }

  setCurrentPage(value: number) {
    this.currentPage = value;
    this.updateListaFiltrada();
  }

  setListaCompleta(value: any[]) {
    this.listaCompleta = value;
    this.listaAux = value;
    this.updateListaFiltrada();
  }


  geListaFiltrada(): any[] {
    return this.listaFiltrada;
  }

  private updateListaFiltrada() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.listaFiltrada = this.listaAux.slice(startIndex, endIndex);
  }

  getTotalPages(): number {
    return Math.ceil(this.listaAux.length / this.pageSize);
  }

  getPageArray(): number[] {
    const totalPages = this.getTotalPages();
    const pageArray = [];
    for (let i = 1; i <= totalPages; i++) {
      pageArray.push(i);
    }
    return pageArray;
  }

  obtenerValorAnidado(obj: any, prop: string): any {
    const propiedades = prop.split('.');
    let valor = obj;
  
    for (const propiedad of propiedades) {
      valor = valor[propiedad];
      if (valor === undefined) {
        return undefined;
      }
    }
  
    return valor;
  }

  filterData(buscar: string, propiedadesFiltrar?: string[]) {
    if (buscar) {
      this.listaAux = this.listaCompleta.filter((item) => {
        return propiedadesFiltrar
          ? propiedadesFiltrar.some((prop) => {
              const valor = this.obtenerValorAnidado(item, prop);
              return valor ? String(valor).toLowerCase().includes(buscar.toLowerCase()) : false;
            })
          : Object.keys(item).some((key) => {
              return String(item[key]).toLowerCase().includes(buscar.toLowerCase());
            });
      });
    } else {
      this.listaAux = this.listaCompleta
    }

    this.updateListaFiltrada();
  }

  
  
  
}
