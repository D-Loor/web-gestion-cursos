import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ModalidadService } from '../../services/modalidad.service';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuComponent } from '../base/menu/menu.component';
import { environment } from '../../../environments/environment';
import { PaginadoService } from '../../services/util/paginado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modalidad',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,    
    MenuComponent
  ],
  providers: [
    ModalidadService,
    PaginadoService
  ],
  templateUrl: './modalidad.component.html',
  styleUrl: './modalidad.component.scss'
})
export class ModalidadComponent implements OnInit{

  private modalidadService= inject(ModalidadService);
  private paginadoService = inject(PaginadoService);
  formBuilder = inject(FormBuilder);

  listaModalidades:any[] = [];
  listaModalidadesFiltrada:any[] = [];
  modalOpen = false;
  pageSize = environment.pageSize;
  currentPage = 1;
  accion = 'Crear';
  buscar = '';


  dataForm: FormGroup;

  constructor() {
    this.dataForm = this.formBuilder.group({
      id_modalidad: [null],
      modalidad: ['', Validators.required],
      estado: [1, Validators.required]
    });
   }

  ngOnInit(): void {
    this.obtenerModalidades();
  }

  obtenerModalidades(){
    this.modalidadService.obtenerModalidades().subscribe(
      (response) => {
        if (response.code === "200") {
          this.listaModalidades = response.result;
          this.paginadoService.setListaCompleta(this.listaModalidades);
        }else {
          console.log(response);
          Swal.fire({
            title: "Warning!",
            text: "Se ha presentado un problema!",
            icon: "warning"
          });
        }

        this.listaModalidadesFiltrada = this.paginadoService.geListaFiltrada();
      },
      (error) => {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: "Se ha presentado un error!",
          icon: "error"
        });
      }
    );
  }

  cargarData(data: any){
    this.dataForm.patchValue(data);
    this.accion = 'Editar';
  }

  accionar(){
    
    if (this.dataForm.invalid) {
      Swal.fire({
        title: "Warning!",
        text: "Debes completar el formulario!",
        icon: "warning"
      });
      return;
    }

    const data = this.dataForm.value;

    if (this.accion === 'Crear') {
      this.modalidadService.guardarModalidad(data).subscribe(
        (response) => {
          if (response.code === "200") {
            this.obtenerModalidades();
            Swal.fire({
              title: "Realizado!",
              text: "Se ha realizado con éxito este proceso!",
              icon: "success"
            });
          }else {
            console.log(response);
            Swal.fire({
              title: "Warning!",
              text: "Se ha presentado un problema!",
              icon: "warning"
            });
          }
        },
        (error) => {
          console.log(error);
          Swal.fire({
            title: "Error!",
            text: "Se ha presentado un error!",
            icon: "error"
          });
        }
      );
    } else {
      this.modalidadService.actualizarModalidad(data).subscribe(
        (response) => {
          if (response.code === "200") {
            this.obtenerModalidades();
            this.modalOpen = false;
            Swal.fire({
              title: "Realizado!",
              text: "Se ha realizado con éxito este proceso!",
              icon: "success"
            });
          }else {
            console.log(response);
            Swal.fire({
              title: "Warning!",
              text: "Se ha presentado un problema!",
              icon: "warning"
            });
          }
        },
        (error) => {
          console.log(error);
          Swal.fire({
            title: "Error!",
            text: "Se ha presentado un error!",
            icon: "error"
          });
        }
      );
    }
  }

  eliminar(){
    this.modalidadService.eliminarModalidad(this.dataForm.get('id_modalidad')?.value).subscribe(
      (response) => {
        if (response.code === "200") {
          this.obtenerModalidades();
          Swal.fire({
            title: "Realizado!",
            text: "Se ha realizado con éxito este proceso!",
            icon: "success"
          });
        }else {
          console.log(response);
          Swal.fire({
            title: "Warning!",
            text: "Se ha presentado un problema!",
            icon: "warning"
          });
        }
      },
      (error) => {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: "Se ha presentado un error!",
          icon: "error"
        });
      }
    );
  }

  filtrar(){
    this.paginadoService.filterData(this.buscar, ['modalidad']);
    this.listaModalidadesFiltrada = this.paginadoService.geListaFiltrada();
  }

  goToPage(page: number) {
    this.paginadoService.setCurrentPage(page);
    this.currentPage = page;
    this.listaModalidadesFiltrada = this.paginadoService.geListaFiltrada();
  }

  getTotalPages(): number {
    return this.paginadoService.getTotalPages();
  }

  getPageArray(): number[] {
    return this.paginadoService.getPageArray();
  }

  limpiar(){
    this.dataForm.reset();
    this.accion = 'Crear';
  }

}
