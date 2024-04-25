import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuComponent } from '../base/menu/menu.component';
import { environment } from '../../../environments/environment';
import { PaginadoService } from '../../services/util/paginado.service';
import { PersonalInstitutoService } from '../../services/personal-instituto.service';
import { RolService } from '../../services/rol.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profesores',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MenuComponent
  ],
  providers: [
    PersonalInstitutoService,
    RolService,
    PaginadoService
  ],
  templateUrl: './personal-instituto.component.html',
  styleUrl: './personal-instituto.component.scss'
})
export class PersonalInstitutoComponent {
  private personalInstitutoService = inject(PersonalInstitutoService);
  private rolService = inject(RolService);
  private paginadoService = inject(PaginadoService);
  formBuilder = inject(FormBuilder);

  listaPersonal: any[] = [];
  listaPersonalFiltrada: any[] = [];
  listaRoles: any[] = [];
  modalOpen = false;
  pageSize = environment.pageSize;
  currentPage = 1;
  accion = 'Crear';
  buscar = '';
  administrador = environment.roles.admin;


  dataForm: FormGroup;

  constructor() {
    this.dataForm = this.formBuilder.group({
      id_personal_instituto: [null],
      id_usuario: [null],
      id_rol: [null],
      password: [''],
      confirmar_password: [''],
      usuario: this.formBuilder.group({
        id_usuario: [null],
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        email: ['', Validators.required]
      })
    });
  }

  ngOnInit(): void {
    this.obtenerPersonal();
    this.obtenerRoles();
  }

  obtenerPersonal() {
    this.personalInstitutoService.obtenerPersonal().subscribe(
      (response) => {
        if (response.code === "200") {
          this.listaPersonal = response.result;
          this.paginadoService.setListaCompleta(this.listaPersonal);
        } else {
          console.log(response);
          Swal.fire({
            title: "Warning!",
            text: "Se ha presentado un problema!",
            icon: "warning"
          });
        }
        this.listaPersonalFiltrada = this.paginadoService.geListaFiltrada();
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

  obtenerRoles() {
    this.rolService.obtenerRoles().subscribe(
      (response) => {
        if (response.code === "200") {
          this.listaRoles = response.result;
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
      let pass = this.dataForm.get('password')?.value;
      if (!pass || this.dataForm.get('password')?.value != this.dataForm.get('confirmar_password')?.value) {
        Swal.fire({
          title: "Warning!",
          text: "Las Contraseñas deben ser Válidas y Coincidir!",
          icon: "warning"
        });
        return;
      }

      this.personalInstitutoService.guardarPersonal(data).subscribe(
        (response) => {
          if (response.code === "200") {
            this.obtenerPersonal();
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
      this.personalInstitutoService.actualizarPersonal(data).subscribe(
        (response) => {
          if (response.code === "200") {
            this.obtenerPersonal();
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
    this.personalInstitutoService.eliminarPersonal(this.dataForm.get('id_personal_instituto')?.value).subscribe(
      (response) => {
        if (response.code === "200") {
          this.obtenerPersonal();
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
    this.paginadoService.filterData(this.buscar, ['usuario.nombre', 'usuario.apellido']);
    this.listaPersonalFiltrada = this.paginadoService.geListaFiltrada();
  }

  goToPage(page: number) {
    this.paginadoService.setCurrentPage(page);
    this.currentPage = page;
    this.listaPersonalFiltrada = this.paginadoService.geListaFiltrada();
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
