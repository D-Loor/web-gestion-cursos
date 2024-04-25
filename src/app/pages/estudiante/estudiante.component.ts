import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuComponent } from '../base/menu/menu.component';
import { environment } from '../../../environments/environment';
import { PaginadoService } from '../../services/util/paginado.service';
import { EstudianteService } from '../../services/estudiante.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estudiante',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,    
    MenuComponent
  ],
  providers: [
    EstudianteService,
    PaginadoService
  ],
  templateUrl: './estudiante.component.html',
  styleUrl: './estudiante.component.scss'
})
export class EstudianteComponent implements OnInit{

  private estudianteService= inject(EstudianteService);
  private paginadoService = inject(PaginadoService);
  formBuilder = inject(FormBuilder);

  listaEstudiantes:any[] = [];
  listaEstudiantesFiltrada:any[] = [];
  listaCursosInscritos:any[] = [];

  modalOpen = false;
  pageSize = environment.pageSize;
  currentPage = 1;
  accion = 'Crear';
  buscar = '';
  nombreEstudiante = '';

  dataForm: FormGroup;

  constructor() {
    this.dataForm = this.formBuilder.group({
      id_estudiante: [null],
      id_usuario: [null],
      edad: [null , Validators.required],
      ci: ['', Validators.required],
      usuario: this.formBuilder.group({
        id_usuario: [null],
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        email: ['', Validators.required]
      })
    });
   }

  ngOnInit(): void {
    this.obtenerEstudiantes();
  }

  obtenerEstudiantes(){
    this.estudianteService.obtenerEstudiantes().subscribe(
      (response) => {
        if (response.code === "200") {
          this.listaEstudiantes = response.result;
          this.paginadoService.setListaCompleta(this.listaEstudiantes);
        }else {
          console.log(response);
          Swal.fire({
            title: "Warning!",
            text: "Se ha presentado un problema!",
            icon: "warning"
          });
        }
        this.listaEstudiantesFiltrada = this.paginadoService.geListaFiltrada();
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

  presentarCursosTomados(id_estudiante: number, usuario: any){
    this.listaCursosInscritos = [];
    this.nombreEstudiante = usuario.nombre + ' ' + usuario.apellido;
    
    this.estudianteService.obtenerCursosInscritosEstudiante(id_estudiante).subscribe(
      (response) => {
        if (response.code === "200") {
          this.listaCursosInscritos = response.result;
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
      this.estudianteService.guardarEstudiante(data).subscribe(
        (response) => {
          if (response.code === "200") {
            this.obtenerEstudiantes();
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
      this.estudianteService.actualizarEstudiante(data).subscribe(
        (response) => {
          if (response.code === "200") {
            this.obtenerEstudiantes();
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
    this.estudianteService.eliminarEstudiante(this.dataForm.get('id_estudiante')?.value).subscribe(
      (response) => {
        if (response.code === "200") {
          this.obtenerEstudiantes();
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
    this.paginadoService.filterData(this.buscar, ['usuario.nombre', 'usuario.apellido', 'ci']);
    this.listaEstudiantesFiltrada = this.paginadoService.geListaFiltrada();
  }

  goToPage(page: number) {
    this.paginadoService.setCurrentPage(page);
    this.currentPage = page;
    this.listaEstudiantesFiltrada = this.paginadoService.geListaFiltrada();
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
