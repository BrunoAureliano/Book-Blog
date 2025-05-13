import express from 'express'
const router = express.Router()

// Painel Inicial de Admin
    router.get('/', async (req, res) => {
        try {
            // Página inicial do admin
        } catch (err) {

        }
    })

// Rotas de Manutenção de Categorias
    router.get('/categorias', async (req, res) => {
        try {
            // Página de categorias listadas
        } catch (err) {

        }
    })

    router.get('/categorias/add', async (req, res) => {
        try {
            // Página de add categorias novas
            // [router.post]
        } catch (err) {

        }
    })

    router.get('/categorias/edit', async (req, res) => {
        try {
            // Página de edit categorias
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


// Rotas de Manutenção de Usuários
    router.get('/usuarios', async (req, res) => {
        try {
            // Rota de listagem dos usuários
        } catch (err) {

        }
    })

    router.get('/usuarios/add', async (req, res) => {
        try {
            // Rota para adicionar usuário manualmente
            // [router.post]
        } catch (err) {

        }
    })

    router.get('/usuarios/edit', async (req, res) => {
        try {
            // Rota para editar usuários (permissões)
            // [router.post]
        } catch (err) {

        }
    })

    router.post('/usuarios/delete', async (req, res) => {
        try {
            // Rota para deletar um usuário
        } catch (err) {

        }
    })

export default router