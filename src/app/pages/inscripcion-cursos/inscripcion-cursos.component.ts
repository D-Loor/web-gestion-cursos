import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuComponent } from '../base/menu/menu.component';
import { environment } from '../../../environments/environment';
import { PaginadoService } from '../../services/util/paginado.service';
import { CursoService } from '../../services/curso.service';
import { EstudianteService } from '../../services/estudiante.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscripcion-cursos',
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
    EstudianteService,
    PaginadoService
  ],
  templateUrl: './inscripcion-cursos.component.html',
  styleUrl: './inscripcion-cursos.component.scss'
})
export class InscripcionCursosComponent {

  private cursoService= inject(CursoService);
  private estudianteService= inject(EstudianteService);
  private paginadoService = inject(PaginadoService);
  formBuilder = inject(FormBuilder);

  listaInscripciones:any[] = [];
  listaInscripcionesFiltrada:any[] = [];
  listaEstudiantes:any[] = [];
  listaCursos:any[] = [];
  modalOpen = false;
  pageSize = environment.pageSize;
  currentPage = 1;
  accion = 'Crear';
  buscar = '';
  curso = '';
  estudiante = '';



  dataForm: FormGroup;

  constructor() {
    this.dataForm = this.formBuilder.group({
      id_curso_estudiante: [null],
      id_curso: ['', Validators.required],
      id_estudiante: ['', Validators.required],
      fecha_inscripcion: [{ value: '' }, Validators.required],
      fecha_finalizacion: [''],
      estado: [1, Validators.required]
    });
   }

  ngOnInit(): void {
    this.obtenerInscripciones();
    this.obtenerCursos();
    this.obtenerEstudiantes();
  }

  obtenerInscripciones(){
    this.cursoService.obtenerEstudiantesCursos().subscribe(
      (response) => {
        if (response.code === "200") {
          this.listaInscripciones = response.result;
          this.paginadoService.setListaCompleta(this.listaInscripciones);
        }else {
          console.log(response);
          Swal.fire({
            title: "Warning!",
            text: "Se ha presentado un problema!",
            icon: "warning"
          });
        }

        this.listaInscripcionesFiltrada = this.paginadoService.geListaFiltrada();
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

  obtenerCursos(){
    this.cursoService.obtenerCursosActivos().subscribe(
      (response) => {
        if (response.code === "200") {
          this.listaCursos = response.result;
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

  obtenerEstudiantes(){
    this.estudianteService.obtenerEstudiantes().subscribe(
      (response) => {
        if (response.code === "200") {
          this.listaEstudiantes = response.result;
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

  cargarData(data: any){
    this.dataForm.patchValue(data);
    this.accion = 'Editar';
    this.curso = data.curso.nombre;
    this.estudiante = data.estudiante.usuario.nombre + ' ' + data.estudiante.usuario.apellido;
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
      this.cursoService.inscribirEstudianteCurso(data).subscribe(
        (response) => {
          if (response.code === "200") {
            this.obtenerInscripciones();
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
    } else {
      this.cursoService.actualizarEstudianteCurso(data).subscribe(
        (response) => {
          if (response.code === "200") {
            this.obtenerInscripciones();
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
    this.cursoService.desistirEstudianteCurso(this.dataForm.get('id_curso_estudiante')?.value).subscribe(
      (response: any) => {
        if (response.code === "200") {
          this.obtenerInscripciones();
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
    this.paginadoService.filterData(this.buscar, ['curso.nombre', 'estudiante.usuario.nombre', 'estudiante.usuario.apellido']);
    this.listaInscripcionesFiltrada = this.paginadoService.geListaFiltrada();
  }

  goToPage(page: number) {
    this.paginadoService.setCurrentPage(page);
    this.currentPage = page;
    this.listaInscripcionesFiltrada = this.paginadoService.geListaFiltrada();
  }

  getTotalPages(): number {
    return this.paginadoService.getTotalPages();
  }

  getPageArray(): number[] {
    return this.paginadoService.getPageArray();
  }

  limpiar(){
    this.dataForm.reset();
    this.dataForm.get('fecha_inscripcion')?.setValue(new Date().toISOString().split('T')[0]);
    this.accion = 'Crear';
  }
}
