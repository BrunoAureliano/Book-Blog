//Função de autenticação de usuário logado
const logado = function(req, res, next) {
    if(req.isAuthenticated() && req.user) {
        return next()
    }

    req.flash('error_msg', 'Você precisa estar logado')
    res.redirect('/')
}

export default logado