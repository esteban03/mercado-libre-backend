
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

