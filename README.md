# Piedra, Papel o Tijera

Webapp de Piedra, Papel o Tijera.

Incluye:

- Frontend (TypeScript + Parcel)
- Backend (API REST) para juego online con Firebase Realtime Database

## Deploy

Frontend (GitHub Pages):

[https://JorgeAA78.github.io/gh-page-ppt](https://JorgeAA78.github.io/gh-page-ppt)

Backend (API):

TODO: agregar URL del deploy del backend

## Documentación API (Postman)

Documentación publicada (Postman Documenter):

[https://documenter.getpostman.com/view/49147880/2sBXVZpaAk](https://documenter.getpostman.com/view/49147880/2sBXVZpaAk)

La colección de Postman está en este repo:

- `PPT-Online.postman_collection.json`

Importala en Postman con **Import** y ejecutá los requests en orden.

Variables que usa la colección:

- `baseUrl` (por defecto `http://localhost:3001`)
- `userId`
- `userId2`
- `roomId`
- `shortCode`

## Levantar el proyecto en local

### Requisitos

- Node.js + npm
- Un proyecto Firebase con **Realtime Database** habilitada

### 1) Backend (API REST)

1. Crear el archivo `server/.env`:

   ```env
   PORT=3001
   FIREBASE_DATABASE_URL=https://TU-PROYECTO-default-rtdb.firebaseio.com/
   SERVICE_ACCOUNT_PATH=./serviceAccountKey.json
   ```

2. Descargar el **Service Account** desde Firebase Console y guardarlo en:

   - `server/serviceAccountKey.json`

3. Instalar dependencias y correr:

   ```bash
   npm install
   npm run dev
   ```

4. Healthcheck:

   - `GET http://localhost:3001/health`

### 2) Frontend

1. Desde la raíz del proyecto:

   ```bash
   npm install
   npm run dev
   ```

2. Parcel levantará el sitio (normalmente en `http://localhost:1234`).

## Notas

- `server/.env` y `server/serviceAccountKey.json` están ignorados por git (no se versionan).
