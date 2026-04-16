require('dotenv').config()

const path = require('path')
const express = require('express')
const jwt = require('jsonwebtoken')

const cors = require('cors')

const routes_company = require('./routes/routes-company.js')
const routes_game = require('./routes/routes-game.js')

require('./drivers/connect-db.js')

const APP = new express()
APP.use(cors())
APP.use(express.json())
APP.use(express.urlencoded({ extended: false }))
APP.use(express.static(path.join(__dirname, 'public')))

const verifyToken = require('./middlewares/auth.js')
const swaggerUI = require('swagger-ui-express')
const swaggerSpec = require('./swagger')

const key = process.env.JWT_SECRET
const PORT = process.env.PORT || 3000

const authRoutes = require('./routes/auth.js')
APP.use('/auth', authRoutes)

APP.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

/**
 * @swagger
 * /token:
 *   post:
 *     summary: Generar token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: 123
 *               name:
 *                 type: string
 *                 example: Pacha
 *     responses:
 *       200:
 *         description: Token generado
 */
APP.post('/token', (req, res) => {
  const { id, name } = req.body

  const token = jwt.sign(
    {
      sub: id,
      name
    },
    key,
    { expiresIn: '1h' }
  )

  console.log(id, name)

  res.json({ token })
})

/**
 * @swagger
 * /public:
 *   get:
 *     summary: Ruta publica
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Respuesta publica
 */
APP.get('/public', (req, res) => {
  res.send("Soy publico, todos pueden verme")
})

/**
 * @swagger
 * /private:
 *   get:
 *     summary: Ruta privada
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Respuesta privada
 *       401:
 *         description: Token invalido o ausente
 */
APP.get('/private', verifyToken, (req, res) => {
  res.json({
    message: "Ruta privada",
    user: req.user
  })
})

APP.use('/api/companies',  routes_company)
APP.use('/api/games',  routes_game)
APP.use('/', require('./routes/index.js'))

APP.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})