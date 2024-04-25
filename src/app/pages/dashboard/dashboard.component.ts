import { Component, OnInit, inject } from '@angular/core';
import { MenuComponent } from '../base/menu/menu.component';
import { CursoService } from '../../services/curso.service';
import { EstudianteService } from '../../services/estudiante.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MenuComponent,
    HttpClientModule
  ],
  providers:[
    CursoService,
    EstudianteService
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private cursoService = inject(CursoService);
  private estudianteService = inject(EstudianteService);
 
  nTop = 3;
  private nMeses = 6
  totalCursos = 0;
  totalEstudiantes = 0;
  listaCursos: any[] = [];
  listaEstudiantes: any[] = [];

  ngOnInit(): void {
    this.obtenerTotalCursos();
    this.obtenerTotalEstudiantes();
    this.obtenerTopCursos();
    this.obtenerTopEstudiantes();
  }

  obtenerTotalCursos() {
    this.cursoService.obtenerTotalCursos().subscribe(
      (response: any) => {
        if (response.code === "200") {
          this.totalCursos = response.result;
        } else {
          console.log(response);
          Swal.fire({
            title: "Warning!",
            text: "Se ha presentado un problema!",
            icon: "warning"
          });
        }
      },
      (error: any) => {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: "Se ha presentado un error!",
          icon: "error"
        });
      }
    );
  }

  obtenerTotalEstudiantes() {
    this.estudianteService.obtenerTotalEstudiantes().subscribe(
      (response: any) => {
        if (response.code === "200") {
          this.totalEstudiantes = response.result;
        } else {
          console.log(response);
          Swal.fire({
            title: "Warning!",
            text: "Se ha presentado un problema!",
            icon: "warning"
          });
        }
      },
      (error: any) => {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: "Se ha presentado un error!",
          icon: "error"
        });
      }
    );
  }
  
  obtenerTopCursos(){
    this.cursoService.obtenerTopCursos(this.nTop, this.nMeses).subscribe(
      (response: any) => {
        if (response.code === "200") {
          this.listaCursos = response.result;
        } else {
          console.log(response);
          Swal.fire({
            title: "Warning!",
            text: "Se ha presentado un problema!",
            icon: "warning"
          });
        }
      },
      (error: any) => {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: "Se ha presentado un error!",
          icon: "error"
        });
      }
    );
  }

  obtenerTopEstudiantes(){
    this.cursoService.obtenerTopEstudiantes(this.nTop).subscribe(
      (response: any) => {
        if (response.code === "200") {
          this.listaEstudiantes = response.result;
        } else {
          console.log(response);
          Swal.fire({
            title: "Warning!",
            text: "Se ha presentado un problema!",
            icon: "warning"
          });
        }
      },
      (error: any) => {
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
