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
                description: 'Servidor de desarrollo'
            },
            {
                url: 'https://taller-api-rest-o1tt.onrender.com',
                description: 'Servidor de producción'
            }
        ]
    },

    apis: ['./routes/*.js', './index.js']
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec