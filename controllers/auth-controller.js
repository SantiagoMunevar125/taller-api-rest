const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const key = process.env.JWT_SECRET

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({
        error: 'El usuario ya existe'
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
      name,
      email,
      password: hashedPassword
    })

    await user.save()

    res.status(201).json({
      message: 'Usuario registrado correctamente'
    })

  } catch (error) {
    res.status(500).json({
      error: 'Error al registrar usuario',
      details: error.message
    })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        error: 'Credenciales inválidas'
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({
        error: 'Credenciales inválidas'
      })
    }

    const token = jwt.sign(
      { id: user._id },
      key,
      { expiresIn: '1h' }
    )

    res.json({
      message: 'Login exitoso',
      token
    })

  } catch (error) {
    res.status(500).json({
      error: 'Error en login',
      details: error.message
    })
  }
}