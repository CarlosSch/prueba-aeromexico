# Prueba Aeroméxico

Aplicacion construida con **Next.js 16** y **React 19** que consume un backend mock via `json-server`. Incluye Redux Toolkit para el estado global y estilos en **SASS** siguiendo la convención **BEM**.

## Requisitos previos

- Node.js **>= 18.18**
- npm **>= 10**

Comandos para revisar las versiones:

```bash
node -v
npm -v
```

## Instalación

```bash
npm install
```

## Ejecución en desarrollo

```bash
npm run dev
```

`npm run dev` usa `concurrently` para lanzar al mismo tiempo:

- `npm run dev:next` -> FRONTEND en http://localhost:3000
- `npm run dev:api` -> API en http://localhost:4000 leyendo `json-server/db.json`

Los comandos se pueden ejecuar por separado.

## Scripts

- `npm run dev` – Frontend + API mock.
- `npm run dev:next` – Solo Next.js.
- `npm run dev:api` – Solo `json-server`.
- `npm run lint` – Revisa el estilo con ESLint.
- `npm run test` – Ejecuta las pruebas unitarias (Jest + React Testing Library).
- `npm run test:coverage` – Genera reporte de pruebas.
- `npm run build` – Compila la app para producción.
- `npm start` – Sirve la build en el puerto 3000.

## Husky y control de calidad

Agrege **Husky** para asegurar que el código cumplierá las reglas antes de crear commits:

1. Hook `pre-commit`: corre `npm run prettier:format`, `npm run lint-staged` y `npm run test`. Si algo falla el commit se cancela.
2. Hook `commit-msg`: valida el mensaje usando Commitlint (`npx commitlint --edit $1`) para mantener un historial legible.

## Pruebas y calidad

```bash
npm test
npm run lint
npm run test:coverage
```

## ¿Qué es lo que más te gustó de TU desarrollo?

Lo que más me gustó de mi desarrollo fue haber construido una arquitectura limpia y escalable, aplicando principios de Clean Code, SOLID y DRY.

Diseñé la estructura modular con enfoque screaming architecture, separando claramente el dominio, los módulos de negocio y los componentes compartidos.

También disfruté mucho configurar todo el entorno de calidad y control de código:

Husky, para automatizar validaciones pre-commit y pre-push, ejecutando lint, prettier y test antes de cada commit.

ESLint y Prettier, para mantener un estilo de código uniforme en todo el equipo y detectar errores de forma temprana.

Commitlint, para estandarizar los mensajes de commit bajo las convenciones Conventional Commits.

## Si hubieras tenido más tiempo ¿qué hubieras mejorado o qué más hubieras hecho?

Agregaría más soporte responsivo para mobile e incluir soporte multi lenguaje con i18n. Tambien me hubiera encantado implementar un ordenamiento por nombre, episodios, etc.

## Descríbenos un pain point o bug con el que te hayas encontrado y como lo solucionaste

Durante la implementación de pruebas unitarias con Jest y RTL con Redux Toolkit, me encontré con un problema al testear componentes que usaban el hook useAppDispatch() y acciones asíncronas (createAsyncThunk).

El jest.Mock, lo convertí primero a unknown. Así eliminé el error de tipos y pude verificar que el dispatch se llamaba correctamente.

---
