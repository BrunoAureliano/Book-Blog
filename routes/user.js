import express from 'express'
const router = express.Router()

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