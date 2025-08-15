# Desafío 03 - Like Me (Parte I)

Este proyecto es parte del desafío **Like Me (Parte I)**.  
Incluye un backend en Node.js + Express conectado a PostgreSQL y un frontend en React (material de apoyo entregado por la academia).

## Requerimientos cumplidos
- Habilitar CORS en el servidor (`cors`)
- Conexión a PostgreSQL usando `pg`
- Ruta **GET** `/posts` que devuelve todos los registros
- Ruta **POST** `/posts` que agrega un nuevo registro (con imagen por defecto de [picsum.photos](https://picsum.photos) si no se envía URL)

Además, agregué las rutas de **like** y **eliminar** para poder usar todos los botones del frontend.

---

## Captura de funcionamiento
![Captura de pantalla](./img/Screenshot%202025-08-15%20at%2002.58.38.png)

---

## Instrucciones

### 1. Clonar el repositorio
```bash
git clone <https://github.com/carlosandradev/desafio03LikeMe1>
```
---

### 2. Configurar la base de datos

- En PostgreSQL ejecutar
```bash
\i db.sql
```
- Esto crea la base de datos likeme y la tabla posts.

---

### 3. Levantar el Backend
```bash
cd backend
npm install
npm start
```
- Servidor disponible en http://localhost:3000

---

### 4. Levantar el frontend
- En otra terminal

```bash
cd frontend
npm install
npm run dev
```
- Se abre la URL que muestre Vite  http://localhost:5173


