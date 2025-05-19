# Challenge Frontend

Este proyecto es una aplicación frontend desarrollada con React y Vite.

## Requisitos

- Node.js >= 18
- npm >= 9

## Instalación

Instala las dependencias del proyecto:

```sh
npm install
```

## Comandos principales

### Iniciar el frontend

```sh
npm run dev
```

### Iniciar el backend

```sh
npm run server
```

### Ejecutar tests unitarios

```sh
npm run test
```

### Ejecutar tests E2E con Cypress

Primero, asegúrate de que el servidor de desarrollo esté corriendo (`npm run dev`).

Luego, ejecuta:

```sh
npm run cypress:open
```

o para correr los tests en modo headless:

```sh
npm run cypress:run
```

## Scripts útiles

- `npm run dev` — Inicia el servidor de desarrollo.
- `npm run build` — Genera la build de producción.
- `npm run preview` — Previsualiza la build de producción.
- `npm run test` — Ejecuta los tests unitarios.
- `npm run cypress:open` — Abre la interfaz de Cypress.
- `npm run cypress:run` — Ejecuta los tests de Cypress en modo headless.

---

## Próximos avances / Futuras mejoras

- Mejorar la organización de archivos para mayor escalabilidad del proyecto.
- Implementar y mantener el diseño atómico (Atomic Design) en los componentes.
- Separación y organización clara de los tests unitarios y E2E.
- Contemplar y mejorar la accesibilidad en toda la aplicación.
- Implementar mecanismos de cache para optimizar el rendimiento.
- Manejo eficiente de imágenes y archivos estáticos.
- Mejorar la documentación técnica y de usuario.
