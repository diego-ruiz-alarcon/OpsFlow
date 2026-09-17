# OpsFlow — Centro de Operaciones

## Descripción

**OpsFlow** es una interfaz web para la gestión y supervisión de operaciones logísticas. El proyecto permite visualizar información operacional e interactuar con diferentes elementos mediante JavaScript.

La aplicación fue desarrollada como parte de una actividad académica enfocada en la implementación de interacciones dinámicas en una página web.

## Tecnologías utilizadas

* HTML5
* CSS3
* JavaScript
* Git
* GitHub
* GitHub Pages

## Estructura del proyecto

```text
OpsFlow/
├── index.html
├── styles.css
├── app.js
├── README.md
└── .gitignore
```

## Interacciones JavaScript

El proyecto contiene 10 interacciones desarrolladas con JavaScript:

### 01. Actualización de estado

Permite actualizar el estado de la operación y mostrar la hora en que se realizó la actualización.

### 02. Cambio de estado visual

Permite marcar un servicio como prioritario. El botón cambia visualmente, se completa la estrella y se muestra un mensaje de confirmación.

### 03. Contador operativo

Permite marcar tareas como completadas. El sistema actualiza automáticamente:

* La cantidad de tareas completadas.
* El porcentaje de avance.
* La barra de progreso.
* El estado visual de cada tarea.

### 04. Mostrar / ocultar detalles

Permite mostrar u ocultar información adicional de una operación mediante un botón.

### 05. Vista previa en tiempo real

Permite escribir un mensaje y visualizarlo inmediatamente en una sección de vista previa. También incluye un contador de caracteres.

### 06. Selección y cálculo

Permite seleccionar un tipo de vehículo e indicar una cantidad. JavaScript calcula automáticamente la capacidad total de despachos.

### 07. Rango / progreso

Permite modificar el porcentaje de disponibilidad mediante un control de rango. La aplicación actualiza el porcentaje y la barra de progreso en tiempo real.

### 08. Crear / eliminar elementos

Permite crear nuevas incidencias dinámicamente y eliminarlas mediante un botón.

### 09. Filtrado

Permite filtrar los despachos según su estado:

* Todos
* En ruta
* Pendientes
* Completados

### 10. Formulario con validación

Permite registrar incidencias mediante un formulario. JavaScript valida que los campos obligatorios estén completos antes de registrar la información.

Además, la severidad seleccionada afecta el progreso operativo y el contador de alertas.

## Funcionamiento

Para ejecutar el proyecto localmente:

1. Descargar o clonar el repositorio.
2. Abrir la carpeta del proyecto.
3. Abrir el archivo `index.html` en un navegador web.

No se requiere un servidor adicional para ejecutar la versión básica del proyecto.

## Git y control de versiones

El desarrollo del proyecto se organiza utilizando Git mediante una rama de trabajo y commits que permiten registrar los cambios realizados durante el desarrollo.

La versión final se publica mediante **GitHub Pages**.

## Publicación

Una vez configurado GitHub Pages, el proyecto estará disponible mediante una dirección web asociada al repositorio.

**URL del proyecto:**
*Pendiente de publicar en GitHub Pages.*

## Autor

Proyecto académico desarrollado para la actividad EPE 1.
