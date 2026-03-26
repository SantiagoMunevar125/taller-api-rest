const swaggerJSDoc = require('swagger-jsdoc')

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'MyAPI',
            version: '1.0.0',
            description: 'Documentacion de mi API con Swagger',
            license: {
                name: 'Licensed Under MIT',
                url: 'https://spdx.org/licenses/MIT.html'
            },
            contact: {
                name: 'Santiago Munevar',
                email: 'santiago.munevar@uptc.edu.co'
            }
        },

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },

        security: [
            {
                bearerAuth: []
            }
        ],

        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor Compañias - Videojuegos API'
            }
        ]
    },

    apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec