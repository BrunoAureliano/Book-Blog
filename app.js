import express from "express"
import flash from "connect-flash"
import ExpressHandlebars from "express-handlebars"
import session from "express-session"
import path from "path"
import { fileURLToPath } from "url"
import mongoose from "mongoose"
import passport from "passport"
import dotenv from "dotenv"
import bodyParser from "body-parser"

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

// Configurações

    // Body-parser
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    // Handlebars
    const handlebars = ExpressHandlebars.create({
        defaultLayout: 'main',
        runtimeOptions: {
            allowProtoMethodsByDefault: true,
            allowProtoPropertiesByDefault: true
        }
    })
    app.engine('handlebars', handlebars.engine)
    app.set('view engine', 'handlebars')

    // Mongoose
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Mongo Conectado!')
    } catch (err) {
        console.log(`Erro ao conectar com o Mongo! ${err}`)
    }


app.get('/', (req, res) => {
    res.send('homepage')
})

app.listen(8080, () => {
    console.log('Server Running!')
})