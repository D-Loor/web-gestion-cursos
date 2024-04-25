import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { environment } from '../../environments/environment';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};

export const isUserAuthenticatedGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = inject(TokenService).isAuthenticated();

  if (isAuthenticated)
    return true;

  inject(Router).navigateByUrl('/login');
  return false;
};

export const isGuestGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = inject(TokenService).isAuthenticated();

  if (!isAuthenticated)
    return true;

  inject(Router).navigateByUrl('/dashboard');
  return false;
};

export const isAdmin: CanActivateFn = (route, state) => {
  const rol = localStorage.getItem('rol') || '';

  if (rol === environment.roles.admin)
    return true;

  inject(Router).navigateByUrl('/dashboard');
  return false;
};