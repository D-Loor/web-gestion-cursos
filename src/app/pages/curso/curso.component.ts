import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuComponent } from '../base/menu/menu.component';
import { environment } from '../../../environments/environment';
import { PaginadoService } from '../../services/util/paginado.service';
import { CursoService } from '../../services/curso.service';
import { ModalidadService } from '../../services/modalidad.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-curso',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MenuComponent
  ],
  providers: [
    CursoService,
    ModalidadService,
    PaginadoService
  ],
  templateUrl: './curso.component.html',
  styleUrl: './curso.component.scss'
})
export class CursoComponent implements OnInit {

  private cursoService = inject(CursoService);
  private modalidadService = inject(ModalidadService);
  private paginadoService = inject(PaginadoService);
  formBuilder = inject(FormBuilder);

  listaCursos: any[] = [];
  listaCursosFiltrada: any[] = [];
  listaModalidades: any[] = [];
  modalOpen = false;
  pageSize = environment.pageSize;
  currentPage = 1;
  accion = 'Crear';
  buscar = '';


  dataForm: FormGroup;

  constructor() {
    this.dataForm = this.formBuilder.group({
      id_curso: [null],
      id_modalidad: [null],
      nombre: ['', Validators.required],
      hora_inicio: ['', Validators.required],
      hora_fin: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      inscritos: [0, Validators.required],
      estado: [1, Validators.required]
    });
  }

  ngOnInit(): void {
    this.obtenerCursos();
    this.obtenerModalidades();
  }

  obtenerCursos() {
    this.cursoService.obtenerCursos().subscribe(
      (response) => {
        if (response.code === "200") {
          this.listaCursos = response.result;
          this.paginadoService.setListaCompleta(this.listaCursos);
        } else {
          console.log(response);
          Swal.fire({
            title: "Warning!",
            text: "Se ha presentado un problema!",
            icon: "warning"
          });
        }
        this.listaCursosFiltrada = this.paginadoService.geListaFiltrada();
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

  obtenerModalidades() {
    this.modalidadService.obtenerModalidades().subscribe(
      (response) => {
        if (response.code === "200") {
          this.listaModalidades = response.result;
        } else {
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

  cargarData(data: any) {
    this.dataForm.patchValue(data);
    this.accion = 'Editar';
  }

  accionar() {
    this.dataForm.get('inscritos')?.setValue(0);
    if (this.dataForm.invalid) {
      Swal.fire({
      title: "Warning!",
      text: "Debes completar el formulario!",
      icon: "warning"
    });
      return;
    }
    
   

    if (this.accion === 'Crear') { 
      this.dataForm.get('hora_inicio')?.setValue(this.dataForm.get('hora_inicio')?.value+":00");
      this.dataForm.get('hora_fin')?.setValue(this.dataForm.get('hora_fin')?.value+":00");
      const data = this.dataForm.value;
      this.cursoService.guardarCurso(data).subscribe(
        (response) => {
          if (response.code === "200") {
            this.obtenerCursos();
            this.modalOpen = false;
            Swal.fire({
              title: "Realizado!",
              text: "Se ha realizado con éxito este proceso!",
              icon: "success"
            });
          } else {
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
      this.cursoService.actualizarCurso(this.dataForm.value).subscribe(
        (response) => {
          if (response.code === "200") {
            this.obtenerCursos();
            this.modalOpen = false;
            Swal.fire({
              title: "Realizado!",
              text: "Se ha realizado con éxito este proceso!",
              icon: "success"
            });
          } else {
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

  eliminar() {
    this.cursoService.eliminarCurso(this.dataForm.get('id_curso')?.value).subscribe(
      (response) => {
        if (response.code === "200") {
          this.obtenerCursos();
          Swal.fire({
            title: "Realizado!",
            text: "Se ha realizado con éxito este proceso!",
            icon: "success"
          });
        } else {
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

  filtrar() {
    this.paginadoService.filterData(this.buscar, ['nombre']);
    this.listaCursosFiltrada = this.paginadoService.geListaFiltrada();
  }

  goToPage(page: number) {
    this.paginadoService.setCurrentPage(page);
    this.currentPage = page;
    this.listaCursosFiltrada = this.paginadoService.geListaFiltrada();
  }

  getTotalPages(): number {
    return this.paginadoService.getTotalPages();
  }

  getPageArray(): number[] {
    return this.paginadoService.getPageArray();
  }

  limpiar() {
    this.dataForm.reset();
    this.accion = 'Crear';
  }
}
