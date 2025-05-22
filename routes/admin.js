import express from 'express'
const router = express.Router()

import mongoose from 'mongoose'

import '../models/Categorias.js'
import '../models/Livros.js'
const Categoria = mongoose.model('categorias')
const Livro = mongoose.model('livros')

import isAdmin from '../helpers/isAdmin.js'

// Painel Inicial de Admin
    router.get('/', isAdmin, (req, res) => {
        res.render('admin/homepage')
    })

// Rotas de Manutenção de Categorias
    // Listagem de Categorias
        router.get('/categorias', isAdmin, async (req, res) => {
            try {
                const categorias = await Categoria.find()
                res.render('admin/categorias', { categorias: categorias})
            } catch (err) {
                req.flash('error_msg', 'Ocorreu um erro ao listar as categorias!')
                res.redirect('/admin')
            }
        })

    // Adição de Categorias
        router.get('/categorias/add', isAdmin, (req, res) => {
            res.render('admin/addcategorias')
        })

        router.post('/categorias/new', isAdmin, async (req, res) => {
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

    //Edição de Categorias
        router.get('/categorias/edit/:id', isAdmin, async (req, res) => {
            try {
                const categoria = await Categoria.findOne({ _id: req.params.id })
                res.render('admin/editcategorias', { categoria: categoria})
            } catch (err) {
                req.flash('error_msg', 'Esta categoria não existe!')
                res.redirect('/admin/categorias')
            }
        })

        router.post('/categorias/edit', isAdmin, async (req, res) => {
            try {
                const categoria = await Categoria.findOne({ _id: req.body.id })

                categoria.nome = req.body.nome
                categoria.slug = req.body.slug

                await categoria.save()
                req.flash('success_msg', 'Categoria editada com sucesso!')
                res.redirect('/admin/categorias')
            } catch (err) {
                req.flash('error_msg', 'Ocorreu um erro ao editar a categoria. Tente novamente!')
                res.redirect('/admin/categorias')
            }
        })

    // Deleção de Categorias
        router.post('/categorias/delete', isAdmin, async (req, res) => {
            try {
                await Categoria.deleteOne({ _id: req.body.id })
                req.flash('success_msg', 'Categoria deletada com sucesso!')
                res.redirect('/admin/categorias')
            } catch (err) {
                req.flash('error_msg', 'Ocorreu um erro ao deletar a categoria. Tente novamente!')
                res.redirect('/admin/categorias')
            }
        })


// Rotas de Manutenção de Postagens
    // Listagem de Postagens
        router.get('/resenhas', isAdmin, async (req, res) => {
                try {
                    const livro = await Livro.find().lean().populate('categoria').sort({ publicado: 'desc' })
                    res.render('admin/resenhas', { livro: livro })
                } catch (err) {
                    req.flash('error_msg', 'Ocorreu um erro ao listar as resenhas dos livros!')
                }
            })
    
    // Deleção de Postagens
        router.post('/resenhas/delete', isAdmin, async (req, res) => {
            try {
                await Livro.deleteOne({ _id: req.body.id })
                req.flash('success_msg', 'Postagem deletada com sucesso!')
                res.redirect('/admin/resenhas')
            } catch (err) {
                req.flash('error_msg', 'Ocorreu um erro ao deletar a postagem. Tente novamente!')
                res.redirect('/admin/resenhas')
            }
        })


export default router