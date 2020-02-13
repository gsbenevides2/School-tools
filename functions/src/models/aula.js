const mongoose = require('mongoose')

const AulaSchema = new mongoose.Schema({
 materia: String,
 week: String,
 position:Number,
 professor: String,
 time: String,
})

module.exports = mongoose.model('Aula', AulaSchema)
