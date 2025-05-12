import mongoose from "mongoose"

const categoriasSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    }
})

mongoose.model('categorias', categoriasSchema)