const Game = require("../models/Game.js")
const Company = require("../models/Company.js")

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
    const game = new Game(req.body)

    // validar que exista la empresa
    const companyExists = await Company.findById(game.company)

    if (!companyExists) {
      return res.status(404).json({ state: false, message: "Empresa no encontrada" })
    }

    const result = await game.save()

    // asociar juego a la empresa
    await Company.findByIdAndUpdate(
      result.company,
      { $push: { games: result._id } }
    )

    return res.status(201).json({ state: true, data: result })

  } catch (error) {
    return res.status(500).json({ state: false, error: error.message })
  }
}

// Actualizar juego
async function update(req, res){
  const { id } = req.params

  try {
    const result = await Game.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    )

    if (!result) {
      return res.status(404).json({ state: false, message: "Juego no encontrado" })
    }

    return res.status(200).json({ state: true, data: result })

  } catch (error) {
    return res.status(500).json({ state: false, error: error.message })
  }
}

async function remove(req, res){
  const { id } = req.params
  try {
    const result = await Game.findByIdAndDelete(id)
    if (!result) return res.status(404).json({ state: false, message: "Juego no encontrado" })

    await Company.findByIdAndUpdate(result.company, { $pull: { games: id } })

    return res.status(200).json({ state: true, data: result, message: "Eliminado con éxito" })
  } catch (error) {
    return res.status(500).json({ state: false, error: error.message })
  }
}

module.exports = {
  getAll,
  findById,
  save,
  update,
  remove
}