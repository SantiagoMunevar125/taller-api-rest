const router = require('express').Router()
/**
 * @swagger
 * /:
 *   get:
 *     summary: Ruta principal
 *     tags: [Root]
 *     respondes:
 *       200:
 *         description: Respuesta satisfactoria
 */
router.get('/',(req, res)=>
res.status(200).json({ state: true, message: "Wasaa"}))

module.exports = router