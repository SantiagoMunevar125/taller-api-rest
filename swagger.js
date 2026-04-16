const swaggerJSDoc = require('swagger-jsdoc')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MyAPI',
      version: '1.0.0',
      description: 'Documentación de mi API con Swagger',
      license: {
        name: 'Licensed Under MIT',
        url: 'https://spdx.org/licenses/MIT.html'
      },
      contact: {
        name: 'Santiago Munevar',
        email: 'santiago.munevar@uptc.edu.co'
      }
    },

    servers: [
      {
        url: 'https://taller-api-rest-o1tt.onrender.com',
        description: 'Servidor de producción'
      },
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo'
      }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },

      schemas: {
        User: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Pacha'
            },
            email: {
              type: 'string',
              example: 'pacha@mail.com'
            },
            password: {
              type: 'string',
              example: '123456'
            }
          }
        },

        Game: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Halo'
            },
            genre: {
              type: 'string',
              example: 'FPS'
            },
            price: {
              type: 'number',
              example: 59.99
            }
          }
        },

        Company: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Nintendo'
            },
            country: {
              type: 'string',
              example: 'Japón'
            }
          }
        }
      }
    }

  },

  apis: ['./routes/*.js', './index.js']
}

const swaggerSpec = swaggerJSDoc(options)

module.exports = swaggerSpec