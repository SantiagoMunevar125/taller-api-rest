const mongoose = require('mongoose')

const URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/empresas_games'

async function connectDB() {
    try {
        await mongoose.connect(URI)
        console.log('DB conectada correctamente')
    } catch (error) {
        console.error('Error de conexion', error.message)
        process.exit(1)
    }
}

connectDB()

module.exports = connectDB