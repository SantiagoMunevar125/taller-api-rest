const Game = require("../models/Game.js")
const Company = require("../models/Company.js")
const mongoose = require('mongoose')

// Obtener todos los juegos
async function getAll(req, res){
  try {
    const result = await Game.find({}).populate('company')

    return res.status(200).json({ state: true, data: result })

  } catch (error) {
    return res.status(500).json({ state: false, error: error.message })
  }
}

// Obtener juego por ID
async function findById(req, res){
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      state: false,
      message: "ID inválido, debe tener formato válido de MongoDB"
    })
  }

  try {
    const result = await Game.findById(id).populate('company')

    if (!result) {
      return res.status(404).json({ state: false, message: "Juego no encontrado" })
    }

    return res.status(200).json({ state: true, data: result })

  } catch (error) {
    return res.status(500).json({ state: false, error: error.message })
  }
}

// Crear juego
async function save(req, res){
  try {
    const { name, company } = req.body

    if (!name || !company) {
      return res.status(400).json({
        state: false,
        message: "Debes enviar 'name' y 'company'"
      })
    }

    if (!mongoose.Types.ObjectId.isValid(company)) {
      return res.status(400).json({
        state: false,
        message: "El ID de la empresa no es válido"
      })
    }
    
    const companyExists = await Company.findById(company)

    if (!companyExists) {
      return res.status(404).json({
        state: false,
        message: "La empresa que intentas asociar no existe"
      })
    }

    const gameExists = await Game.findOne({ name })
    if (gameExists) {
      return res.status(400).json({
        state: false,
        message: "Ya existe un juego con ese nombre"
      })
    }

    const game = new Game(req.body)
    const result = await game.save()

    await Company.findByIdAndUpdate(
      result.company,
      { $push: { games: result._id } }
    )

    return res.status(201).json({
      state: true,
      data: result
    })

  } catch (error) {

    if (error.name === "ValidationError") {
      return res.status(400).json({
        state: false,
        message: "Error de validación",
        details: Object.values(error.errors).map(e => e.message)
      })
    }

    if (error.code === 11000) {
      return res.status(400).json({
        state: false,
        message: "Dato duplicado",
        field: Object.keys(error.keyValue)[0]
      })
    }

    return res.status(500).json({
      state: false,
      message: "Error interno del servidor",
      error: error.message
    })
  }
}

// Actualizar juego
async function update(req, res){
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      state: false,
      message: "ID inválido, debe tener formato válido de MongoDB"
    })
  }

  try {

    const result = await Game.findByIdAndUpdate(
      id,
      req.body,
      { returnDocument: 'after', runValidators: true }
    )

    if (!result) {
      return res.status(404).json({
        state: false,
        message: "Juego no encontrado"
      })
    }

    return res.status(200).json({
      state: true,
      data: result
    })

  } catch (error) {

    if (error.name === "ValidationError") {
      return res.status(400).json({
        state: false,
        message: "Datos inválidos",
        details: Object.values(error.errors).map(e => e.message)
      })
    }

    if (error.code === 11000) {
      return res.status(400).json({
        state: false,
        message: "Dato duplicado",
        field: Object.keys(error.keyValue)[0]
      })
    }

    return res.status(500).json({
      state: false,
      message: "Error interno",
      error: error.message
    })
  }
}

async function remove(req, res){
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      state: false,
      message: "ID inválido, debe tener formato válido de MongoDB"
    })
  }

  try {
    const result = await Game.findByIdAndDelete(id)

    if (!result) {
      return res.status(404).json({
        state: false,
        message: "Juego no encontrado"
      })
    }

    await Company.findByIdAndUpdate(
      result.company,
      { $pull: { games: id } }
    )

    return res.status(200).json({
      state: true,
      message: "Juego eliminado correctamente",
      data: result
    })

  } catch (error) {
    return res.status(500).json({
      state: false,
      message: "Error interno",
      error: error.message
    })
  }
}

module.exports = {
  getAll,
  findById,
  save,
  update,
  remove
}