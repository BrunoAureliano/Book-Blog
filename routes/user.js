import express from 'express'
const router = express.Router()

import mongoose from 'mongoose'
import '../models/Usuarios.js'
const Usuario = mongoose.model('usuarios')


// Página de Cadastro
router.get('/cadastro', (req, res) => {
    res.render('user/cadastro')
})

router.post('/cadastro', async (req, res) => {
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
router.get('/login', async (req, res) => {
    try {
        res.render('user/login')
    } catch (err) {

    }
})

// Painel inicial do Usuário
    router.get('/', async (req, res) => {
        try {
            res.render('user/homepage')
        } catch (err) {

        }
    })

    router.get('/addpostagem', async (req, res) => {
        try {
            res.send('Página de criação da resenha')
            // [router.post]
        } catch (err) {

        }
    })

    router.get('/:slug', async (req, res) => {
        try {
            res.send('Página de Ler Mais da resenha selecionada')
        } catch (err) {

        }
    })




export default router