<div align="center">

# 🎮 GameVault API

### API RESTful para Gestión de Compañías y Videojuegos

[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-5.x-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-Cloud-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://cloud.mongodb.com)
[![JWT](https://img.shields.io/badge/JWT-Autenticación-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)](https://jwt.io)
[![Swagger](https://img.shields.io/badge/Swagger-Docs-85EA2D?style=flat-square&logo=swagger&logoColor=black)](https://swagger.io)
[![Deploy](https://img.shields.io/badge/Deploy-Render.com-46E3B7?style=flat-square&logo=render&logoColor=white)](https://render.com)

**Taller API RESTFul · Electiva-II (60) · UPTC · Periodo I-2026**

[📖 Documentación Swagger](#-documentación-swagger) · [🚀 Endpoints](#-endpoints) · [⚡ Inicio Rápido](#-inicio-rápido)

</div>

---

## 📋 Descripción

API RESTful construida en **Node.js + Express** que gestiona la relación **uno a muchos (1:N)** entre compañías desarrolladoras de videojuegos y sus respectivos títulos. Implementa autenticación mediante **JWT**, persistencia en **MongoDB Atlas** y documentación interactiva con **Swagger UI**.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología | Versión | Propósito |
|------|-----------|---------|-----------|
| **Runtime** | Node.js | 22.x | Entorno de ejecución |
| **Framework** | Express | 5.x | Servidor HTTP y enrutamiento |
| **ODM** | Mongoose | 9.x | Modelado de datos MongoDB |
| **Seguridad** | jsonwebtoken | 9.x | Autenticación JWT |
| **Base de Datos** | MongoDB Atlas | Cloud | Persistencia en la nube |
| **Docs** | Swagger UI + JSDoc | 6.x / 5.x | Documentación interactiva |
| **Deploy** | Render.com | — | Despliegue del servicio |

---

## 🏛️ Arquitectura del Sistema

### Diagrama de Clases (Relación 1:N)

```mermaid
classDiagram
    direction LR

    class Company {
        +ObjectId  _id
        +Number    id
        +String    name
        +String    country
        +ObjectId[]  games
    }

    class Game {
        +ObjectId  _id
        +Number    id
        +String    name
        +String    genre
        +Number    price
        +ObjectId  company
    }

    Company "1" --> "0..*" Game : tiene
```

> La relación 1:N se implementa con un array de referencias `ObjectId` en `Company.games` y una referencia inversa `Game.company`. Al consultar una empresa por ID se hace `.populate('games')` para resolver los documentos completos.

### Diagrama de Despliegue

```mermaid
graph TD
    subgraph Cliente["🌐 Cliente"]
        A[Navegador / Swagger UI / Frontend]
    end

    subgraph Render["☁️ Render.com — Servidor"]
        B[Node.js Runtime]
        C[Express Router]
        D[JWT Middleware]
        E[Controllers]
        B --> C --> D --> E
    end

    subgraph Atlas["🍃 MongoDB Atlas — Nube"]
        F[(Cluster)]
        G[(companies)]
        H[(games)]
        F --- G
        F --- H
    end

    A -- "HTTP/HTTPS + Bearer Token" --> C
    E -- "Mongoose ODM" --> F
```

### Flujo de Autenticación JWT

```mermaid
sequenceDiagram
    actor C as Cliente
    participant M as verifyToken Middleware
    participant J as JWT
    participant DB as MongoDB

    C->>M: DELETE /api/companies/:id + Bearer token
    M->>J: jwt.verify(token, JWT_SECRET)
    J-->>M: Payload válido ✓
    M->>DB: findByIdAndDelete(id)
    DB-->>M: Documento eliminado
    M-->>C: { state: true, data: {...} }

    Note over C,DB: Sin token o token inválido

    C->>M: POST /api/companies (sin token)
    M-->>C: 401 { error: "Token requerido" }
```

---

## 🔐 Seguridad y Autenticación

La API usa **JSON Web Tokens (JWT)** para proteger los endpoints de escritura. El middleware `verifyToken` valida el token en el header de cada petición protegida.

### Usar el token en peticiones protegidas

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> Los endpoints `GET` son públicos. Los endpoints `POST`, `PUT` y `DELETE` requieren token JWT válido en el header.

---

## 🚀 Endpoints

**Base URL:** `https://taller-api-rest.onrender.com`

### 🏢 Companies

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|:----:|
| `GET` | `/api/companies` | Listar todas las compañías | ❌ |
| `GET` | `/api/companies/:id` | Obtener compañía con sus juegos (populate) | ❌ |
| `POST` | `/api/companies` | Crear nueva compañía | ✅ |
| `PUT` | `/api/companies/:id` | Actualizar compañía por ID | ✅ |
| `DELETE` | `/api/companies/:id` | Eliminar compañía por ID | ✅ |

### 🎮 Games

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|:----:|
| `GET` | `/api/games` | Listar todos los videojuegos | ❌ |
| `GET` | `/api/games/:id` | Obtener videojuego por ID | ❌ |
| `POST` | `/api/games` | Crear nuevo videojuego | ✅ |
| `PUT` | `/api/games/:id` | Actualizar videojuego por ID | ✅ |
| `DELETE` | `/api/games/:id` | Eliminar videojuego por ID | ✅ |

---

## 📦 Modelos de Datos

### Company (`models/Company.js`)

```javascript
{
  id:      Number,     // requerido, único — identificador numérico
  name:    String,     // requerido — solo letras y espacios (/^[a-zA-Z\s]+$/)
  country: String,     // requerido — país de origen
  games:   [ObjectId]  // referencias a Game (relación 1:N)
}
```

### Game (`models/Game.js`)

```javascript
{
  id:      Number,    // requerido, único — identificador numérico
  name:    String,    // requerido — nombre del videojuego
  genre:   String,    // requerido — género (Acción, RPG, Aventura...)
  price:   Number,    // requerido — precio del juego
  company: ObjectId   // requerido — referencia a Company (FK)
}
```

---

## 💡 Ejemplos de Uso

### Crear una compañía

```bash
curl -X POST https://taller-api-rest.onrender.com/api/companies \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "name": "Rockstar",
    "country": "USA"
  }'
```

**Respuesta `201`:**
```json
{
  "state": true,
  "data": {
    "_id": "65a1c9a2e123456789abcd12",
    "id": 1,
    "name": "Rockstar",
    "country": "USA",
    "games": []
  }
}
```

### Crear un videojuego vinculado a una compañía

```bash
curl -X POST https://taller-api-rest.onrender.com/api/games \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "name": "GTA V",
    "genre": "Accion",
    "price": 29.99,
    "company": "65a1c9a2e123456789abcd12"
  }'
```

### Obtener compañía con todos sus juegos (populate)

```bash
curl https://taller-api-rest.onrender.com/api/companies/65a1c9a2e123456789abcd12
```

**Respuesta `200`:**
```json
{
  "state": true,
  "data": {
    "_id": "65a1c9a2e123456789abcd12",
    "id": 1,
    "name": "Rockstar",
    "country": "USA",
    "games": [
      {
        "_id": "65a1c9a2e123456789abcd99",
        "id": 1,
        "name": "GTA V",
        "genre": "Accion",
        "price": 29.99,
        "company": "65a1c9a2e123456789abcd12"
      }
    ]
  }
}
```

### Actualizar una compañía

```bash
curl -X PUT https://taller-api-rest.onrender.com/api/companies/65a1c9a2e123456789abcd12 \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rockstar Games",
    "country": "USA"
  }'
```

### Eliminar un videojuego

```bash
curl -X DELETE https://taller-api-rest.onrender.com/api/games/65a1c9a2e123456789abcd99 \
  -H "Authorization: Bearer <token>"
```

---

## 📖 Documentación Swagger

La documentación interactiva está disponible en:

```
https://taller-api-rest.onrender.com/api-docs
```

Desde Swagger UI puedes explorar y ejecutar cualquier endpoint directamente desde el navegador.

---

## ⚡ Inicio Rápido (Local)

### Prerequisitos

- Node.js 18 o superior
- Cuenta en MongoDB Atlas

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/SantiagoMunevar125/taller-api-rest.git
cd taller-api-rest

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales
```

### Variables de entorno (`.env`)

```env
PORT=3000
MONGODB_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/gamevault
JWT_SECRET=tu_secreto_super_seguro
```

### Ejecutar

```bash
# Modo desarrollo (nodemon)
npm run dev

# Modo producción
npm start
```

API disponible en `http://localhost:3000` · Swagger en `http://localhost:3000/api-docs`

---

## 📁 Estructura del Proyecto

```
taller-api-rest/
├── models/
│   ├── Company.js          # Schema — id, name, country, games[]
│   └── Game.js             # Schema — id, name, genre, price, company
├── controllers/
│   ├── controll-company.js # getAll, findById (populate), save, update, remove
│   └── controll-game.js    # getAll, findById, save, update, remove
├── routes/
│   ├── routes-company.js   # GET/POST /companies · GET/PUT/DELETE /companies/:id
│   └── routes-game.js      # GET/POST /games · GET/PUT/DELETE /games/:id
├── middleware/
│   └── verifyToken.js      # Middleware JWT — protege POST, PUT, DELETE
├── index.js                # Entry point — Express, Mongoose, Swagger
├── .env                    # Variables de entorno (no subir a git ⚠️)
└── package.json
```

---

## 👤 Autor

**Santiago Munevar**  
Estudiante — Electiva-II (60) · UPTC  
Periodo Académico I-2026

---

<div align="center">
<sub>Universidad Pedagógica y Tecnológica de Colombia · Sogamoso, Boyacá</sub>
</div>
