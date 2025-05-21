import { Strategy as localStrategy } from "passport-local"

import bcrypt from "bcryptjs"

import mongoose from "mongoose"
import '../models/Usuarios.js'

const Usuario = mongoose.model('usuarios')

export default function Passport(passport) {

    passport.use(new localStrategy({ usernameField: 'email', passwordField: 'senha' }, async (email, senha, done) => {
        try {
            const usuario = await Usuario.findOne({ email: email })
            if (!usuario) {
                return done(null, false, { message: 'Está conta não existe!' })
            }

            const igual = await bcrypt.compare(senha, usuario.senha)
            if (igual) {
                return done(null, usuario)
            } else {
                return done(null, false, { message: 'Senha Incorreta!'})
            }
        } catch (err) {
            return done(err)
        }
    }))

    passport.serializeUser((usuario, done) => {
        done(null, usuario.id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const usuario = await Usuario.findById(id)
            done(null, usuario)
        } catch (err) {
            done(err)
        }
    })
}
