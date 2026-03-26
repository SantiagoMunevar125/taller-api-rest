const express = require('express');
const routes_company = express.Router();

const {
  getAll,
  save,
  findById,
  update,
  remove
} = require('../controllers/controll-company.js');

/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: Operaciones relacionadas con empresas
 */

/**
 * @swagger
 * /companies:
 *   get:
 *     summary: Obtener todas las empresas
 *     description: Retorna una lista de empresas registradas con sus respectivos detalles.
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de empresas obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 state:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 65a1c9a2e123456789abcd12
 *                       id:
 *                         type: number
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: Rockstar
 *                       country:
 *                         type: string
 *                         example: USA
 *       401:
 *         description: No autorizado - Token JWT ausente, expirado o inválido.
 *       500:
 *         description: Error interno del servidor
 */
routes_company.get('/', getAll);

/**
 * @swagger
 * /companies/{id}:
 *   get:
 *     summary: Obtener una empresa por ID
 *     description: Busca una empresa específica por su identificador único de MongoDB y realiza un populate de sus juegos.
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único de la empresa (ObjectId)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Empresa encontrada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 state:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     id:
 *                       type: number
 *                     name:
 *                       type: string
 *                     country:
 *                       type: string
 *                     games:
 *                       type: array
 *                       items:
 *                         type: object
 *       401:
 *         description: No autorizado - Se requiere un token válido.
 *       404:
 *         description: Empresa no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 state:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Empresa no encontrada
 *       500:
 *         description: Error del servidor
 */
routes_company.get('/:id', findById);

/**
 * @swagger
 * /companies:
 *   post:
 *     summary: Crear una nueva empresa
 *     description: Inserta una nueva empresa en la base de datos.
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: Datos necesarios para registrar una empresa
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - country
 *             properties:
 *               id:
 *                 type: number
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: Rockstar
 *               country:
 *                 type: string
 *                 example: USA
 *     responses:
 *       201:
 *         description: Empresa creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 state:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *       400:
 *         description: Datos inválidos o faltantes
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
routes_company.post('/', save);

/**
 * @swagger
 * /companies/{id}:
 *   put:
 *     summary: Actualizar una empresa existente
 *     description: Modifica los datos de una empresa identificada por su ID.
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la empresa a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       description: Campos de la empresa que se desean actualizar
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Rockstar Games
 *               country:
 *                 type: string
 *                 example: USA
 *     responses:
 *       200:
 *         description: Empresa actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 state:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Empresa no encontrada
 *       500:
 *         description: Error del servidor
 */
routes_company.put('/:id', update);

/**
 * @swagger
 * /companies/{id}:
 *   delete:
 *     summary: Eliminar una empresa
 *     description: Elimina de forma permanente una empresa de la base de datos.
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la empresa a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Empresa eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 state:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Empresa no encontrada
 *       500:
 *         description: Error del servidor
 */
routes_company.delete('/:id', remove);

module.exports = routes_company;