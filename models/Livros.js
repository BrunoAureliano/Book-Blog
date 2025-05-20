import mongoose, { Schema } from 'mongoose'

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
        default: Date.now()
    },
    resenha: {
        type: String,
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'categorias',
        require: true
    }
})

mongoose.model('livros', livrosSchema)