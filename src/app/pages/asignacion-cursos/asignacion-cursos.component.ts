import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuComponent } from '../base/menu/menu.component';
import { environment } from '../../../environments/environment';
import { PaginadoService } from '../../services/util/paginado.service';
import { CursoService } from '../../services/curso.service';
import { PersonalInstitutoService } from '../../services/personal-instituto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignacion-cursos',
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
    PersonalInstitutoService,
    PaginadoService
  ],
  templateUrl: './asignacion-cursos.component.html',
  styleUrl: './asignacion-cursos.component.scss'
})
export class AsignacionCursosComponent implements OnInit{
  private cursoService= inject(CursoService);
  private personalService= inject(PersonalInstitutoService);
  private paginadoService = inject(PaginadoService);
  formBuilder = inject(FormBuilder);

  listaAsiganciones:any[] = [];
  listaAsigancionesFiltrada:any[] = [];
  listaProfesores:any[] = [];
  listaCursos:any[] = [];
  modalOpen = false;
  pageSize = environment.pageSize;
  currentPage = 1;
  accion = 'Crear';
  buscar = '';
  curso = '';
  profesor = '';


  dataForm: FormGroup;

  constructor() {
    this.dataForm = this.formBuilder.group({
      id_curso_profesor: [null],
      id_curso: ['', Validators.required],
      id_personal_instituto: ['', Validators.required],
      fecha_asignacion: [{ value: '' }, Validators.required],
      fecha_finalizacion: [''],
      estado: [1, Validators.required]
    });
   }

  ngOnInit(): void {
    this.obtenerAsiganciones();
    this.obtenerCursos();
    this.obtenerProfesores();
  }

  obtenerAsiganciones(){
    this.cursoService.obtenerProfesoresCursos().subscribe(
      (response) => {
        if (response.code === "200") {
          this.listaAsiganciones = response.result;
          this.paginadoService.setListaCompleta(this.listaAsiganciones);
        }else {
          console.log(response);
          Swal.fire({
            title: "Warning!",
            text: "Se ha presentado un problema!",
            icon: "warning"
          });
        }

        this.listaAsigancionesFiltrada = this.paginadoService.geListaFiltrada();
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

  obtenerProfesores(){
    this.personalService.obtenerPersonalPorRol('Profesor').subscribe(
      (response) => {
        if (response.code === "200") {
          this.listaProfesores = response.result;
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
    this.profesor = data.profesor.usuario.nombre + ' ' + data.profesor.usuario.apellido;
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
      this.cursoService.asignarProfesorCurso(data).subscribe(
        (response) => {
          if (response.code === "200") {
            this.obtenerAsiganciones();
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
      this.cursoService.actualizarProfesorCurso(data).subscribe(
        (response) => {
          if (response.code === "200") {
            this.obtenerAsiganciones();
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
    this.cursoService.desasignarProfesorCurso(this.dataForm.get('id_curso_profesor')?.value).subscribe(
      (response: any) => {
        if (response.code === "200") {
          this.obtenerAsiganciones();
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
    this.paginadoService.filterData(this.buscar, ['curso.nombre', 'profesor.usuario.nombre', 'profesor.usuario.apellido']);
    this.listaAsigancionesFiltrada = this.paginadoService.geListaFiltrada();
  }

  goToPage(page: number) {
    this.paginadoService.setCurrentPage(page);
    this.currentPage = page;
    this.listaAsigancionesFiltrada = this.paginadoService.geListaFiltrada();
  }

  getTotalPages(): number {
    return this.paginadoService.getTotalPages();
  }

  getPageArray(): number[] {
    return this.paginadoService.getPageArray();
  }

  limpiar(){
    this.dataForm.reset();
    this.dataForm.get('fecha_asignacion')?.setValue(new Date().toISOString().split('T')[0]);
    this.accion = 'Crear';
  }
}
