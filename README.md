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
        +String    name
        +String    country
        +Number    foundedYear
        +String    website
        +String    description
        +ObjectId[]  games
    }

    class Game {
        +ObjectId  _id
        +String    title
        +String    genre
        +Number    releaseYear
        +String    platform
        +Number    rating
        +String    description
        +ObjectId  company
    }

    Company "1" --> "0..*" Game : tiene
```

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
        F[(Cluster de Base de Datos)]
        G[(Colección: companies)]
        H[(Colección: games)]
        F --- G
        F --- H
    end

    A -- "HTTP/HTTPS + Bearer Token" --> C
    E -- "Mongoose ODM" --> F
```

### Flujo de Autenticación

```mermaid
sequenceDiagram
    actor C as Cliente
    participant A as API /auth
    participant J as JWT
    participant DB as MongoDB

    C->>A: POST /api/auth/login {username, password}
    A->>DB: Buscar usuario
    DB-->>A: Usuario encontrado
    A->>J: Firmar payload
    J-->>A: Token generado
    A-->>C: { token: "eyJ..." }

    Note over C,DB: Peticiones subsiguientes

    C->>A: GET /api/companies (Authorization: Bearer <token>)
    A->>J: Verificar token
    J-->>A: Payload válido ✓
    A->>DB: Consulta
    DB-->>A: Datos
    A-->>C: { state: true, data: [...] }
```

---

## 🔐 Seguridad y Autenticación

La API usa **JSON Web Tokens (JWT)** para proteger todos los endpoints de escritura.

### Obtener un token

```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "tu_usuario",
  "password": "tu_contraseña"
}
```

**Respuesta:**
```json
{
  "state": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Usar el token en peticiones protegidas

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> ⚠️ Los endpoints `GET` son públicos. Los endpoints `POST`, `PUT` y `DELETE` requieren token válido.

---

## 🚀 Endpoints

**Base URL:** `https://taller-api-rest.onrender.com`

### 🔑 Auth

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/auth/register` | Registrar nuevo usuario | ❌ |
| `POST` | `/api/auth/login` | Iniciar sesión y obtener token | ❌ |

### 🏢 Companies

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/companies` | Listar todas las compañías | ❌ |
| `GET` | `/api/companies/:id` | Obtener compañía + juegos (populate) | ❌ |
| `POST` | `/api/companies` | Crear nueva compañía | ✅ |
| `PUT` | `/api/companies/:id` | Actualizar compañía | ✅ |
| `DELETE` | `/api/companies/:id` | Eliminar compañía | ✅ |

### 🎮 Games

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/games` | Listar todos los videojuegos | ❌ |
| `GET` | `/api/games/:id` | Obtener videojuego por ID | ❌ |
| `POST` | `/api/games` | Crear nuevo videojuego | ✅ |
| `PUT` | `/api/games/:id` | Actualizar videojuego | ✅ |
| `DELETE` | `/api/games/:id` | Eliminar videojuego | ✅ |

---

## 📦 Modelos de Datos

### Company

```javascript
{
  name:        String,   // requerido — nombre de la compañía
  country:     String,   // país de origen
  foundedYear: Number,   // año de fundación
  website:     String,   // URL del sitio web
  description: String,   // descripción
  games:       [ObjectId] // referencias a Game (1:N)
}
```

### Game

```javascript
{
  title:       String,   // requerido — título del juego
  genre:       String,   // género (Acción, RPG, Estrategia...)
  releaseYear: Number,   // año de lanzamiento
  platform:    String,   // plataforma (PC, PS5, Switch...)
  rating:      Number,   // calificación 0–10
  description: String,   // descripción
  company:     ObjectId  // referencia a Company (FK)
}
```

---

## 📖 Documentación Swagger

La documentación interactiva está disponible en:

```
https://taller-api-rest.onrender.com/api-docs
```

Desde Swagger UI puedes autenticarte con JWT y probar todos los endpoints directamente en el navegador.

---

## ⚡ Inicio Rápido (Local)

### Prerequisitos

- Node.js 18+ instalado
- Cuenta en MongoDB Atlas (o MongoDB local)

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/SantiagoMunevar125/taller-api-rest.git
cd taller-api-rest

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
```

### Variables de entorno (`.env`)

```env
PORT=3000
MONGODB_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/gamevault
JWT_SECRET=tu_secreto_super_seguro
```

### Ejecutar

```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

La API estará disponible en `http://localhost:3000`

---

## 🧪 Ejemplos de Uso

### Crear una compañía

```bash
curl -X POST https://taller-api-rest.onrender.com/api/companies \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nintendo Co.",
    "country": "Japón",
    "foundedYear": 1889,
    "website": "https://nintendo.com",
    "description": "Empresa líder en entretenimiento interactivo."
  }'
```

### Crear un videojuego vinculado a una compañía

```bash
curl -X POST https://taller-api-rest.onrender.com/api/games \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Legend of Zelda: Breath of the Wild",
    "genre": "Aventura",
    "releaseYear": 2017,
    "platform": "Nintendo Switch",
    "rating": 9.7,
    "company": "<company_id>"
  }'
```

### Obtener compañía con todos sus juegos

```bash
curl https://taller-api-rest.onrender.com/api/companies/<id>
```

**Respuesta:**
```json
{
  "state": true,
  "data": {
    "_id": "...",
    "name": "Nintendo Co.",
    "country": "Japón",
    "foundedYear": 1889,
    "games": [
      {
        "_id": "...",
        "title": "The Legend of Zelda: Breath of the Wild",
        "genre": "Aventura",
        "rating": 9.7
      }
    ]
  }
}
```

---

## 📁 Estructura del Proyecto

```
taller-api-rest/
├── src/
│   ├── models/
│   │   ├── Company.js        # Schema Mongoose — Compañía
│   │   └── Game.js           # Schema Mongoose — Videojuego
│   ├── controllers/
│   │   ├── controll-company.js  # Lógica CRUD compañías
│   │   └── controll-game.js     # Lógica CRUD videojuegos
│   ├── routes/
│   │   ├── routes-company.js    # Rutas /api/companies
│   │   ├── routes-game.js       # Rutas /api/games
│   │   └── auth.js              # Rutas /api/auth
│   └── middleware/
│       └── verifyToken.js       # Middleware JWT
├── index.js                  # Entry point — Express + Swagger
├── .env                      # Variables de entorno (no subir a git)
├── .gitignore
└── package.json
```

---

## 🎯 Criterios de Evaluación

| Criterio | Puntaje | Estado |
|----------|---------|--------|
| Documentos del sistema (Diagrama de Clases + Despliegue) | 15 pts | ✅ |
| Documentación Swagger | 10 pts | ✅ |
| Seguridad JWT | 15 pts | ✅ |
| Persistencia MongoDB Atlas | 20 pts | ✅ |
| Funcionalidad CRUD completa | 40 pts | ✅ |
| **Total** | **100 pts** | |

---

## 👤 Autor

**Santiago Munevar**
Estudiante — Electiva-II (60) · UPTC
Periodo Académico I-2026

---

<div align="center">
<sub>Universidad Pedagógica y Tecnológica de Colombia · Tunja, Boyacá</sub>
</div>
