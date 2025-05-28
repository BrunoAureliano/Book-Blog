// Função para autenticação de Administrador
const isAdmin = function(req, res, next) {
    if (req.isAuthenticated() && req.user.admin == true) {
        return next()
    }

    req.flash('error_msg', 'Você precisa ser Admin')
    res.redirect('/user/homepage')
}

export default isAdmin