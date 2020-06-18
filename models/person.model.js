const mongoose = require('mongoose')

const Schema = mongoose.Schema

const personSchema = new Schema({
    id: mongoose.ObjectId,
    title: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true, enum: ['Missing', 'Found'] },
    date: { type: Date, required: true },
    images: { type: Array, default: [] }
  },
  {
    timestamps: true,
  })

const Person = mongoose.model('Person', personSchema)

module.exports = Person
