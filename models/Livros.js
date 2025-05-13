import mongoose from 'mongoose'

const livrosSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    publicado: {
        type: Date,
        required: true
    },
    resenha: {
        type: String,
        required: true
    }
})

mongoose.model('livros', livrosSchema)