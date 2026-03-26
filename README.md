# API RESTFul - Gestión de Compañías y Videojuegos 🚀

Proyecto desarrollado para la asignatura **Electiva-II (60)** de la **UPTC**, periodo 1-2026. Consiste en una API RESTFul robusta para la gestión de una relación uno a muchos (1:N) entre compañías desarrolladoras y sus videojuegos.

## 🛠️ Tecnologías Utilizadas
* **Node.js & Express**: Entorno de ejecución y framework web.
* **Mongoose**: Modelado de objetos para MongoDB.
* **JWT (JSON Web Tokens)**: Mecanismo de seguridad para autenticación.
* **Swagger**: Documentación interactiva de endpoints.
* **MongoDB Atlas**: Persistencia de datos en la nube.

## 🔐 Seguridad y Autenticación
La API implementa seguridad mediante JWT. Para acceder a los endpoints protegidos, es necesario:
1. Generar un token en el endpoint `/token`.
2. Incluir el token en el header de las peticiones: `Authorization: Bearer <tu_token>`.

## 📊 Arquitectura del Sistema

### Diagrama de Clases (Relación 1:N)
```mermaid
classDiagram
    direction LR
    Company "1" -- "*" Game : has
    class Company {
        +ObjectId _id
        +Number id
        +String name
        +String country
        +Array games
    }
    class Game {
        +ObjectId _id
        +Number id
        +String name
        +String genre
        +Number price
        +ObjectId company
    }