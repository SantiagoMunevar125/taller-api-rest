const jwt = require('jsonwebtoken')
const key = process.env.JWT_SECRET

function verifyToken(req, res, next) {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            return res.status(401).json({ error: 'Token requerido' })
        }

        const [, token] = authHeader.split(' ')

        if (!token) {
            return res.status(401).json({ error: 'Formato de token invalido' })
        }
// 
        const payload = jwt.verify(token, key)
        req.user = payload
        next()
    } catch (error) {
        return res.status(401).json({ error: error.message })
    }
}

module.exports = verifyToken