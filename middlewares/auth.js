const jwt = require('jsonwebtoken')
const key = process.env.JWT_SECRET

function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).json({ error: 'Token requerido' })
    }

    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Formato de token inválido' })
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' })
    }

    const payload = jwt.verify(token, key)

    req.user = payload

    next()
  } catch (error) {
    return res.status(401).json({
      error: 'Token inválido o expirado',
      details: error.message 
    })
  }
}

module.exports = verifyToken