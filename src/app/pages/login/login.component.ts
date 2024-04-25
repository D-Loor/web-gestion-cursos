import { Component, inject } from '@angular/core';
import { PersonalInstitutoService } from '../../services/personal-instituto.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    PersonalInstitutoService,
    TokenService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  router = inject(Router);
  personalInstitutoService = inject(PersonalInstitutoService);
  tokenService=inject(TokenService);
  formBuilder = inject(FormBuilder);

  loginForm: FormGroup;

  constructor() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (!this.loginForm.invalid) {
      this.personalInstitutoService.login(this.loginForm.value).subscribe(
        (response) => {
          if (response.code === "200") {
            localStorage.setItem('nombre', response.result.usuario.nombre + ' ' + response.result.usuario.apellido);
            localStorage.setItem('rol', response.result.rol.rol);
            this.tokenService.handleToken(response.token);
            this.router.navigate(['/dashboard']);
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
  
}
