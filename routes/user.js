// Importações de Models
    import express from 'express'
    const router = express.Router()

    import mongoose from 'mongoose'
    import '../models/Usuarios.js'
    import '../models/Livros.js'
    import '../models/Categorias.js'
    const Usuario = mongoose.model('usuarios')
    const Livro = mongoose.model('livros')
    const Categoria = mongoose.model('categorias')

    import bcrypt from 'bcryptjs'

    import passport from 'passport'

    import logado from '../helpers/isUser.js'

// Regex's
    const nomeRegex = /^[A-Za-zÀ-ÖØ-Ýà-öø-ÿ\s]+$/
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const senhaRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%*])[A-Za-z\d!@#$%*]{8,20}$/


// Página de Cadastro
    router.get('/cadastro', (req, res) => {
        res.render('user/cadastro')
    })

    router.post('/cadastro', async (req, res) => {
        let erros = []

        if(!nomeRegex.test(req.body.nome) || !req.body.nome) {
            erros.push({ text: 'Nome Inválido! Tente novamente!' })
        }

        if(!emailRegex.test(req.body.email) || !req.body.email) {
            erros.push({ text: 'Email Inválido! Tente novamente!' })
        }

        if(!senhaRegex.test(req.body.senha) || !req.body.senha) {
            erros.push({ text: 'Senha Inválida! Tente novamente!'})
        }

        if(erros.length > 0) {
            return res.render('user/cadastro', {erros: erros})
        }
        
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
                res.redirect('/user/homepage')
            }
        } catch (err) {
            req.flash('error_msg', 'Ocorreu um erro ao cadastrar o usuário. Tente novamente!')
            res.redirect('/')
        }
    })

// Página de Login
    router.get('/login', (req, res) => {
        res.render('user/login')
    })

    router.post('/login', (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/user/homepage',
            failureRedirect: '/user/login',
            failureFlash: true,
        })(req, res, next)
    })

// Rota de Logout
    router.get('/logout', logado, (req, res, next) => {
        req.logout((err) => {
            if (err) {
                return next(err)
            }
            req.flash('success_msg', 'Logout com sucesso!')
            res.redirect('/')
        })
    })

// Painel inicial do Usuário
    router.get('/homepage', logado, async (req, res) => {
        try {
            const livro = await Livro.find().lean().populate('categoria').sort({ publicado: 'desc' })
            res.render('user/homepage', { livro: livro })
        } catch (err) {
            req.flash('error_msg', 'Ocorreu um erro ao listar as resenhas dos livros!')
        }
    })

    router.get('/addpostagem', logado, async (req, res) => {
        try {
            const categorias = await Categoria.find()
            res.render('user/addresenha', { categorias: categorias })
        } catch (err) {
            req.flash('error_msg', 'Ocorreu um erro ao carregar o formulário')
            res.redirect('/user/homepage')
        }
    })

    router.post('/addpostagem/new', logado, async (req, res) => {
        try {
            const categorias = await Categoria.find()
            const novaResenha = {
                nome: req.body.nome,
                slug: req.body.slug,
                autor: req.body.autor,
                resenha: req.body.resenha,
                categoria: req.body.categoria
            }

            await new Livro(novaResenha).save()
            req.flash('success_msg', 'Resenha criada com sucesso')
            res.redirect('/user/homepage')
        } catch (err) {
            req.flash('error_msg', 'Ocorreu um erro ao criar sua resenha')
            res.redirect('/user/homepage')
        }
    })

    router.get('/:slug', logado, async (req, res) => {
        try {
            res.send('Página de Ler Mais da resenha selecionada')
        } catch (err) {

        }
    })




export default router