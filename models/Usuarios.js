import mongoose from 'mongoose'

const usuariosSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    }
})

mongoose.model('usuarios', usuariosSchema)