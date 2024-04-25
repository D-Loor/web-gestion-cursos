import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { isGuestGuard, isUserAuthenticatedGuard, isAdmin } from './guards/auth.guard';
import { ModalidadComponent } from './pages/modalidad/modalidad.component';
import { CursoComponent } from './pages/curso/curso.component';
import { EstudianteComponent } from './pages/estudiante/estudiante.component';
import { PersonalInstitutoComponent } from './pages/personal-instituto/personal-instituto.component';
import { InscripcionCursosComponent } from './pages/inscripcion-cursos/inscripcion-cursos.component';
import { AsignacionCursosComponent } from './pages/asignacion-cursos/asignacion-cursos.component';


export const routes: Routes = [

    {
        path: 'login',
        pathMatch: 'full',
        canActivate: [isGuestGuard],
        component: LoginComponent
    },
    {
        path: 'dashboard',
        pathMatch: 'full',
        canActivate: [isUserAuthenticatedGuard],
        component: DashboardComponent
    },
    {
        path: 'modalidades',
        pathMatch: 'full',
        canActivate: [isUserAuthenticatedGuard],
        component: ModalidadComponent
    },
    {
        path: 'cursos',
        pathMatch: 'full',
        canActivate: [isUserAuthenticatedGuard],
        component: CursoComponent
    },
    {
        path: 'estudiantes',
        pathMatch: 'full',
        canActivate: [isUserAuthenticatedGuard],
        component: EstudianteComponent
    },
    {
        path: 'personal-instituto',
        pathMatch: 'full',
        canActivate: [isUserAuthenticatedGuard, isAdmin],
        component: PersonalInstitutoComponent
    },
    {
        path: 'inscripcion-cursos',
        pathMatch: 'full',
        canActivate: [isUserAuthenticatedGuard],
        component: InscripcionCursosComponent
    },
    {
        path: 'asignacion-cursos',
        pathMatch: 'full',
        canActivate: [isUserAuthenticatedGuard, isAdmin],
        component: AsignacionCursosComponent
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'login'
    }

];
