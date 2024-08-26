
# Mercado Libre API Backend

Este repositorio contiene la implementación del backend para el test práctico de Mercado Libre. Este proyecto ha sido desarrollado utilizando Node.js y Express, y está diseñado para manejar las solicitudes API necesarias para una aplicación de búsqueda y visualización de productos. Adicionalmente, se proporciona un entorno Docker para facilitar la configuración y despliegue de la aplicación.

## Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Ejecución con Docker](#ejecución-con-docker)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Endpoints](#endpoints)

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu máquina:

- Node.js >= 16.x
- npm >= 7.x
- Docker y Docker Compose (opcional, para entorno Dockerizado)

## Instalación sin docker

1. Clona este repositorio:

    ```bash
    git clone https://github.com/esteban03/mercado-libre-backend.git
    ```

2. Navega a la carpeta del proyecto:

    ```bash
    cd mercado-libre-backend
    ```

3. Instala las dependencias necesarias:

    ```bash
    npm install
    ```

## Configuración

El proyecto utiliza un archivo `.env` para configurar variables de entorno. Puedes copiar el archivo `.env.example` y renombrarlo a `.env`:

```bash
cp .env.example .env
```

Luego, ajusta las variables según sea necesario.

## Ejecución sin docker

Para ejecutar el servidor, utiliza el siguiente comando:

```bash
  npm start
```


## Ejecución con Docker

Este proyecto incluye un archivo `Dockerfile` y `docker-compose.yml` para facilitar la configuración y el despliegue utilizando Docker.

### Iniciar el Proyecto con Docker

Para levantar la aplicación utilizando Docker, sigue los siguientes pasos:

  ```bash
  docker-compose up
  ```

La aplicación estará disponible en `http://localhost:3000`.

### Ejecución de Pruebas con Docker

Para ejecutar las pruebas utilizando Docker Compose, puedes utilizar el siguiente comando:

```bash
docker-compose -f docker-compose.test.yml up
```

Esto levantará el entorno de pruebas y ejecutará los tests automáticamente.

## Estructura del Proyecto

La estructura del proyecto está organizada de la siguiente manera:

```
mercado-libre-backend/
├── .gitignore
├── .env
├── .env.example
├── Dockerfile
├── docker-compose.yml
├── docker-compose.test.yml
├── package.json
├── package-lock.json
├── app.js
├── routes/
│   ├── api.js
│   ├── index.js
├── tests/
│   ├── item.tests.js
```

- `.gitignore`: Lista de archivos y directorios que Git debe ignorar.
- `.env`: Archivo que contiene variables de entorno, incluyendo configuraciones sensibles como claves API.
- `.env.example`: Ejemplo de archivo `.env` para mostrar las variables necesarias.
- `Dockerfile`: Archivo para construir la imagen Docker del proyecto.
- `docker-compose.yml`: Define y configura los servicios Docker para desarrollo.
- `docker-compose.test.yml`: Configura los servicios Docker para ejecutar pruebas.
- `package.json`: Define las dependencias y scripts necesarios para el proyecto.
- `package-lock.json`: Archivo generado automáticamente que describe las versiones exactas de las dependencias instaladas.
- `app.js`: Archivo principal del servidor, encargado de iniciar la aplicación y manejar las solicitudes HTTP.
- `routes/`: Carpeta que contiene las rutas de la aplicación.
  - `index.js`: Define ruta principal.
  - `items.js`: Define utas solicitadas en el test.
  - `routes.js`: Archivo para registrar las rutas o urls del proyecto. 
- `tests/`: Carpeta que contiene las pruebas automatizadas.

## Endpoints

El backend implementa los siguientes endpoints:

- `GET /api/items?q=:query`  
  Busca productos en la API de Mercado Libre y devuelve los resultados en el formato solicitado.

- `GET /api/items/:id`  
  Obtiene el detalle de un producto específico por su ID.


## Decisiones Técnicas

### Nota sobre las llamadas a servicios externos:

En un entorno de desarrollo real, normalmente realizaría mocking de las llamadas a servicios externos, como las APIs de Mercado Libre, para evitar dependencias en servicios de terceros y asegurar pruebas más rápidas y confiables. Esto también me permitiría simular diferentes escenarios, como respuestas exitosas, errores de red, o respuestas no válidas.

Sin embargo, para los efectos de esta prueba, he optado por no realizar mocking de las APIs de Mercado Libre, permitiendo que las solicitudes se realicen directamente a los servicios reales. De esta manera, se puede verificar que la integración con las APIs se ha realizado correctamente en un entorno real.

### Gestión de Variables de Entorno

He utilizado la librería dotenv para manejar las variables de entorno de manera segura. Esto me permite mantener la configuración sensible, como claves de API o configuraciones específicas de la base de datos, fuera del código fuente.


### Pruebas

Incluí una suite de pruebas utilizando Jest, enfocándome en las rutas. Estas pruebas aseguran que la lógica del backend funciona correctamente bajo diferentes escenarios. Si hubiera más tiempo, expandiría las pruebas para incluir más casos de borde y pruebas de integración.
Las pruebas no incluyen mocks de las APIs de Mercado Libre para efectos de esta prueba específica. Sin embargo, en un entorno de producción, es recomendable implementar mocks para evitar dependencias externas durante la ejecución de las pruebas.

### Rutas

Centralicé el registro de todas las rutas de la aplicación en un único archivo, routes.js. Esta decisión permite un manejo más sencillo y organizado de las rutas, facilitando la gestión y modificación de las mismas sin tener que buscar en múltiples archivos. Además, esto mejora la legibilidad y mantiene el app.js limpio y enfocado en la configuración y arranque del servidor.

### Servidor

Por simplicidad, decidí administrar todo el servidor desde app.js, incluyendo la configuración de middlewares, registro de rutas, y arranque del servidor. Esta decisión permite mantener el flujo de configuración en un solo lugar, lo que simplifica la comprensión especialmente en el contexto de una prueba técnica.