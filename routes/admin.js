import express from 'express'
const router = express.Router()

import mongoose from 'mongoose'

import '../models/Categorias.js'
const Categoria = mongoose.model('categorias')

// Painel Inicial de Admin
    router.get('/', async (req, res) => {
        try {
            res.send('Página inicial do admin')
        } catch (err) {

        }
    })

// Rotas de Manutenção de Categorias
    router.get('/categorias', async (req, res) => {
        try {
            const categorias = await Categoria.find()
            res.render('admin/categorias', { categorias: categorias})
        } catch (err) {
            req.flash('error_msg', 'Ocorreu um erro ao listar as categorias!')
            res.redirect('/admin')
        }
    })

    router.get('/categorias/add', (req, res) => {
        res.render('admin/addcategorias')
    })

    router.post('/categorias/new', async (req, res) => {
        try {
            const novaCategoria = {
                nome: req.body.nome,
                slug: req.body.slug
            } 

            const categoria = await new Categoria(novaCategoria).save()
            req.flash('success_msg', 'Categoria criada com sucesso')
            res.redirect('/admin/categorias')
        } catch (err) {
            req.flash('error_msg', 'Ocorreu um erro ao criar uma nova categoria. Tente novamente!')
            res.redirect('/admin')
        }
    })

    router.get('/categorias/edit/:id', async (req, res) => {
        try {
            res.send('Página de edit categorias')
            // [router.post]
        } catch (err) {

        }
    })

    router.post('/categorias/delete', async (req, res) => {
        try {
            // Rota de deleção de categorias
        } catch (err) {

        }
    })



export default router