
# Informe Técnico del Proyecto

## Descripción General

Este proyecto es una plataforma web para la creación, búsqueda, y respuesta a encuestas. Está desarrollado utilizando tecnologías de frontend como HTML, CSS, y JavaScript, junto con un backend basado en Node.js y Express, que se comunica con una base de datos NoSQL (MongoDB). La plataforma permite a los usuarios registrarse, iniciar sesión, crear encuestas personalizadas, buscar encuestas existentes, y responder a ellas.

## Estructura del Proyecto

La estructura del proyecto está organizada en las siguientes carpetas y archivos clave:

```
mi-proyecto/
│
├── backend/
│   ├── controllers/
│   │   ├── autenticacionController.js
│   │   ├── encuestaController.js
│   │   └── usuarioController.js
│   ├── models/
│   │   ├── usuario.js
│   │   ├── encuesta.js
│   │   ├── respuesta.js
│   │   └── mensaje.js
│   ├── routes/
│   │   ├── autenticacionRoutes.js
│   │   ├── encuestaRoutes.js
│   │   └── contactoRoutes.js
│   ├── middleware/
│   │   ├── autenticacion.js
│   ├── config/
│   │   ├── database.js
│   │   ├── seguridad.js
│   ├── app.js
│   └── server.js
│
├── frontend/
│   ├── css/
│   │   ├── estilos.css
│   ├── js/
│   │   ├── validacion.js
│   │   ├── auth.js
│   │   ├── encuesta.js
│   │   ├── contacto.js
│   │   ├── tomar-encuesta.js
│   │   ├── responder-encuesta.js
│   ├── index.html
│   ├── contacto.html
│   ├── encuesta.html
│   ├── tomar-encuesta.html
│   ├── responder-encuesta.html
│   ├── login.html
│   ├── registro.html
│
├── docs/
│   ├── openapi.yaml
│
└── config.env
```

## Funcionalidades Principales

### Autenticación de Usuarios

- **Registro y Login:** Los usuarios pueden registrarse en la plataforma proporcionando un nombre, correo electrónico y contraseña. Después de registrarse, pueden iniciar sesión para acceder a funciones protegidas.
- **Protección de Rutas:** Las páginas de creación, búsqueda y respuesta de encuestas están protegidas para que solo los usuarios autenticados puedan acceder a ellas.

### Creación de Encuestas

- **Interfaz Dinámica:** Los usuarios pueden crear encuestas personalizadas con múltiples preguntas. Pueden agregar preguntas dinámicamente mediante un botón "Agregar Pregunta".
- **Validación:** Se asegura que ninguna pregunta esté vacía antes de permitir la creación de la encuesta.

### Tomar Encuestas

- **Búsqueda y Filtrado:** Los usuarios pueden buscar encuestas disponibles utilizando una barra de búsqueda. Las encuestas pueden ser filtradas por título.
- **Responder Encuestas:** Los usuarios pueden seleccionar una encuesta y responder las preguntas. Se asegura que todas las respuestas sean completadas antes de permitir la finalización de la encuesta.

### Formulario de Contacto

- **Envío de Mensajes:** Los usuarios pueden enviar mensajes a través del formulario de contacto, que son almacenados en la base de datos.
- **Protección:** Solo los usuarios autenticados pueden acceder y utilizar el formulario de contacto.

## Implementación Técnica

### Backend

El backend está construido utilizando Node.js y Express. Utiliza MongoDB como base de datos para almacenar usuarios, encuestas, respuestas y mensajes de contacto. Los controladores gestionan la lógica de negocio y las rutas exponen la API RESTful para interactuar con el frontend.

### Frontend

El frontend está desarrollado con HTML, CSS, y JavaScript. Se utilizan archivos JavaScript específicos para manejar la lógica de cada página, como la validación de formularios, la manipulación del DOM, y la interacción con la API del backend.

### Seguridad

- **JWT (JSON Web Tokens):** Se utiliza para autenticar y proteger las rutas del backend.

### Variables de Entorno

El archivo `config.env` se utiliza para almacenar variables de entorno sensibles como la conexión a la base de datos y las claves secretas para JWT.

## Configuración e Instalación

### Requisitos Previos

- Node.js y npm instalados.
- MongoDB en funcionamiento.

### Pasos de Instalación

1. Clonar el repositorio:
   ```bash
   git clone <url-del-repositorio>
   ```
2. Navegar a la carpeta del proyecto:
   ```bash
   cd mi-proyecto
   ```
3. Instalar las dependencias del backend:
   ```bash
   npm install
   ```
4. Configurar el archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/db
   JWT_SECRET=clave_secreta
   ```
5. Iniciar el servidor:
   ```bash
   npm run dev
   ```
6. Acceder al frontend abriendo los archivos HTML en el navegador.

## Conclusión

Este proyecto proporciona una plataforma completa para la gestión de encuestas, que incluye funcionalidades de autenticación, creación y respuesta a encuestas, y un formulario de contacto. Está diseñado con buenas prácticas de seguridad y es escalable para futuras mejoras.
