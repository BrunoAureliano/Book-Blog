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

import user from './routes/user.js'
import admin from './routes/admin.js'

import './models/Usuarios.js'
const Usuario = mongoose.model('usuarios')

const app = express()

dotenv.config()

// Configurações
    // Session 
    app.use(session({
        secret: 'sitedagabi',
        resave: true,
        saveUninitialized: true
    }))
    app.use(flash())

    // Middleware
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash('success_msg')
        res.locals.error_msg = req.flash('error_msg')
        next()
    })

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

    // Public
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)

    app.use(express.static(path.join(__dirname, 'public')))

    // Mongoose
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Mongo Conectado!')
    } catch (err) {
        console.log(`Erro ao conectar com o Mongo! ${err}`)
    }


// Rotas
app.use('/user', user)
app.use('/admin', admin)

// Página de Cadastro
app.get('/', (req, res) => {
    res.render('cadastro')
})

app.post('/', async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ email: req.body.email })
        if (usuario) {
            req.flash('error_msg', 'Já existe uma conta com este email!')
            res.redirect('/')
        } else {
            const newUser = {
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha
            }

            await new Usuario(newUser).save()
            req.flash('success_msg', 'Usuário cadastrado com sucesso')
            res.redirect('/user')
        }
    } catch (err) {
        req.flash('error_msg', 'Ocorreu um erro ao cadastrar o usuário. Tente novamente!')
        res.redirect('/')
    }
})

// Página de Login
app.get('/login', async (req, res) => {
    try {
        res.render('login')
    } catch (err) {

    }
})

app.listen(8080, () => {
    console.log('Server Running!')
})