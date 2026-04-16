const express = require('express');
const routes_game = express.Router();

const verifyToken = require('../middlewares/auth.js');

const {
  getAll,
  save,
  findById,
  update,
  remove
} = require('../controllers/controll-game.js');

/**
 * @swagger
 * tags:
 *   name: Games
 *   description: Operaciones relacionadas con juegos
 */

/**
 * @swagger
 * /api/games:
 *   get:
 *     summary: Lista de juegos
 *     description: Retorna una colección de juegos
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Respuesta satisfactoria
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 state:
 *                   type: boolean
 *                   description: Indica éxito en la consulta
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
 *                         example: GTA V
 *                       genre:
 *                         type: string
 *                         example: Action
 *                       company:
 *                         type: object
 *                         description: Empresa asociada
 *       401:
 *         description: No autorizado - Token JWT faltante o inválido
 *       500:
 *         description: Error del servidor
 */
routes_game.get('/', verifyToken, getAll);

/**
 * @swagger
 * /api/games/{id}:
 *   get:
 *     summary: Recuperar un juego por ID
 *     description: Busca un juego específico por su ID
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del juego
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Juego encontrado
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
 *                     genre:
 *                       type: string
 *                     company:
 *                       type: object
 *       401:
 *         description: No autorizado - Token JWT faltante o inválido
 *       404:
 *         description: Juego no encontrado
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
 *                   example: Juego no encontrado
 *       500:
 *         description: Error del servidor
 */
routes_game.get('/:id', verifyToken, findById);

/**
 * @swagger
 * /api/games:
 *   post:
 *     summary: Crear un juego
 *     description: Inserta un nuevo juego en la base de datos
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: Datos del juego a crear
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - genre
 *               - company
 *             properties:
 *               id:
 *                 type: number
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: GTA V
 *               genre:
 *                 type: string
 *                 example: Action
 *               company:
 *                 type: string
 *                 example: 64f1c9a2e123456789abcd12
 *     responses:
 *       201:
 *         description: Juego creado correctamente
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
routes_game.post('/', verifyToken, save);

/**
 * @swagger
 * /api/games/{id}:
 *   put:
 *     summary: Actualizar un juego
 *     description: Modifica la información de un juego existente
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del juego
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       description: Datos a actualizar
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: GTA V Remastered
 *               genre:
 *                 type: string
 *                 example: Action
 *     responses:
 *       200:
 *         description: Juego actualizado correctamente
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
 *         description: Juego no encontrado
 *       500:
 *         description: Error del servidor
 */
routes_game.put('/:id', verifyToken, update);

/**
 * @swagger
 * /api/games/{id}:
 *   delete:
 *     summary: Eliminar un juego
 *     description: Elimina un juego de la base de datos
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del juego
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Juego eliminado correctamente
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
 *         description: Juego no encontrado
 *       500:
 *         description: Error del servidor
 */
routes_game.delete('/:id', verifyToken, remove);

module.exports = routes_game;