# Proyecto Web para la gestión de cursos

Este proyecto es un Frontend desarrollado con Angular, destinado a la gestión de cursos en una plataforma educativa.

## Requisitos

- Node: ^18.13.0 || ^20.9.0
- Angular: ^17.3.0

## Instalación

1. Clonar el repositorio:

git clone https://github.com/D-Loor/web-gestion-cursos

2. Instalar las dependencias utilizando npm:

npm install

3. Iniciar el servidor de desarrollo:

npm run start


El servidor estará disponible en `http://localhost:4200`.

## Uso

El aplicativo utiliza el archivo proxy.conf.json para redirigir las solicitudes HTTP a servidores externos, en este caso se tiene configurado los diversos endPoints del ws-gestion-cursos tomando http://127.0.0.1:8000 de nuestro BackEnd local.

## Funcionalidades por secciones

Modalidad: Corresponde al tipo de curso(Presencial, Virtual, etc), tiene la implementación del CRUD.

Curso: Corresponde a los cursos que se van a gestionar, tiene la implementación del CRUD.

Estudiante: Corresponde a los estudiantes que se van a poder inscribir a los cursos, tiene la implementación del CRUD, Además se tiene la opción de poder ver los cursos a los cuales está inscrito un estudiante.

Personal Instituto: Corresponde a usuarios que pertenecen al instituto(Administrador, Profesor, etc), estos están relacionados por medio de un rol que es gestionado en base, tiene la implementación del CRUD.

Asignación Cursos: Aqí se va a realizar asignaciones a Profesores que han sido registrado como Personal Instituto, considerando que un Profesor puede tener una o varias asignaciones de cursos y un Curso puede tener uno o varios Profesores asignados, tiene la implementación del CRUD.

Inscripción Cursos: Aqí se va a realizar las inscripciones de Estudiantes a Cursos, considerando que un Estudiante puede tener una o varias inscripciones de curso y un Curso puede tener uno o varias inscripciones de Estudiantes, tiene la implementación del CRUD.

Dashboard: Se cuenta con la presentación de total de Cursos, total de Estudiantes, Top 3 Cursos con mayor número de inscritos y Top 3 de Estudiantes con mayores número de inscripciones, aquí se cuenta con la opción ver más la cuál dependiendo la información presenta los datos o redirige a la sección seleccionada.

Nota: Todas las secciones están habilitadas únicamente para el Personal del Instituto que tenga rol de Administrador, caso contrario no tendrá acceso a las secciones(Asignación Cursos y Personal Instituto).

## Créditos

- Diego Loor (https://github.com/D-Loor)

## Contacto

Si tienes alguna pregunta o sugerencia, no dudes en ponerte en contacto conmigo:

- Correo electrónico: diego18.loor@gmail.com
