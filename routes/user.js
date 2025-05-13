import express from 'express'
const router = express.Router()

// Painel inicial do Usuário
    router.get('/', async (req, res) => {
        try {
            // Página inicial do usuário logado
        } catch (err) {

        }
    })

    router.get('/addpostagem', async (req, res) => {
        try {
            // Página de criação da resenha
            // [router.post]
        } catch (err) {

        }
    })

    router.get('/:slug', async (req, res) => {
        try {
            // Página de 'Ler Mais' da resenha selecionada
        } catch (err) {

        }
    })




export default router