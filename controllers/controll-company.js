const Company = require("../models/Company.js")

// Obtener todas las empresas
async function getAll(req, res){
  try {
    const result = await Company.find({})

    return res.status(200).json({ state: true, data: result})

  } catch (error) {
    return res.status(500).json({ state: false, error: error.message })
  }
}

// Obtener empresa por ID
async function findById(req, res){
  const { id } = req.params

  try {
    const result = await Company.findById(id).populate('games')

    if (!result) {
      return res.status(404).json({ state: false, message: "Empresa no encontrada" })
    }

    return res.status(200).json({ state: true, data: result })

  } catch (error) {
    return res.status(500).json({ state: false, error: error.message })
  }
}

// Crear empresa
async function save(req, res){
  try {
    const company = new Company(req.body)
    const result = await company.save()

    return res.status(201).json({ state: true, data: result })

  } catch (error) {
    return res.status(500).json({ state: false, error: error.message })
  }
}

// Actualizar empresa
async function update(req, res){
  const { id } = req.params

  try {
    const result = await Company.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    )

    if (!result) {
      return res.status(404).json({ state: false, message: "Empresa no encontrada" })
    }

    return res.status(200).json({ state: true, data: result })

  } catch (error) {
    return res.status(500).json({ state: false, error: error.message
    })
  }
}

// Eliminar empresa
async function remove(req, res){
  const { id } = req.params

  try {
    const result = await Company.findByIdAndDelete(id)

    if (!result) {
      return res.status(404).json({ state: false, message: "Empresa no encontrada" })
    }

    return res.status(200).json({ state: true, data: result })

  } catch (error){
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