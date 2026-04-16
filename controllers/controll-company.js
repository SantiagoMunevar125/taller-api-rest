const Company = require("../models/Company.js")
const mongoose = require('mongoose')
const Game = require("../models/Game.js")

// Obtener todas las empresas
async function getAll(req, res){
  try {
    const result = await Company.find().populate('games')

    return res.status(200).json({ state: true, data: result})

  } catch (error) {
    return res.status(500).json({ state: false, error: error.message })
  }
}

// Obtener empresa por ID
async function findById(req, res){
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      state: false,
      message: "ID inválido, debe tener formato válido de MongoDB"
    })
  }

  try {
    const result = await Company.findById(id).populate('games')

    if (!result) {
      return res.status(404).json({ state: false, error: "Empresa no encontrada", details: "Verifica que el ID sea correcto" })
    }

    return res.status(200).json({ state: true, data: result })

  } catch (error) {
    return res.status(500).json({ state: false, error: error.message })
  }
  
}

// Crear empresa
async function save(req, res){
  const { id, name, country } = req.body

  try {
    if (!id || !name || !country) {
      return res.status(400).json({
        state: false,
        error: 'Campos incompletos',
        details: 'Debes enviar id, name y country'
      })
    }

    if (isNaN(id)) {
      return res.status(400).json({
        state: false,
        error: 'ID inválido',
        details: 'El id debe ser un número'
      })
    }

    const existingId = await Company.findOne({ id })
    if (existingId) {
      return res.status(400).json({
        state: false,
        error: 'Empresa duplicada',
        details: `Ya existe una empresa con el ID ${id}`
      })
    }

    const existingName = await Company.findOne({ name })
    if (existingName) {
      return res.status(400).json({
        state: false,
        error: 'Empresa duplicada',
        details: `Ya existe una empresa con el nombre "${name}"`
      })
    }

    const company = new Company(req.body)
    const result = await company.save()

    return res.status(201).json({ state: true, data: result })

  } catch (error) {

    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0]

      return res.status(400).json({
        state: false,
        error: 'Dato duplicado',
        details: `El campo "${field}" ya existe. Debe ser único`
      })
    }

    return res.status(500).json({
      state: false,
      error: 'Error del servidor',
      details: error.message
    })
  }
}

// Actualizar empresa
async function update(req, res){
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      state: false,
      message: "ID inválido, debe tener formato válido de MongoDB"
    })
  }

  try {
    const result = await Company.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    )

    if (!result) {
      return res.status(404).json({
        state: false,
        error: 'Empresa no encontrada',
        details: 'No existe una empresa con ese ID'
      })
    }

    return res.status(200).json({ state: true, data: result })

  } catch (error) {

    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0]

      return res.status(400).json({
        state: false,
        error: 'Dato duplicado',
        details: `El campo "${field}" ya existe`
      })
    }

    return res.status(500).json({
      state: false,
      error: 'Error del servidor',
      details: error.message
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

    await Game.deleteMany({ company: id })

    const result = await Company.findByIdAndDelete(id)

    if (!result) {
      return res.status(404).json({
        state: false,
        message: "Empresa no encontrada"
      })
    }

    return res.status(200).json({
      state: true,
      data: result
    })

  } catch (error){
    return res.status(500).json({
      state: false,
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