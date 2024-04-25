import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { TokenService } from '../../../services/token.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    TokenService
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  rol!: string;
  nombre!: string;
  rolAdmin = environment.roles.admin;

  router = inject(Router);
  tokenService=inject(TokenService);

  ngOnInit() {
    this.rol = localStorage.getItem('rol') || '';
    this.nombre = localStorage.getItem('nombre') || '';
  }

  cerrarCesion() {
    this.tokenService.revokeToken();
    this.router.navigate(['/login']);
  }

}
