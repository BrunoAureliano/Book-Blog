import express from "express"
import flash from "connect-flash"
import ExpressHandlebars from "express-handlebars"
import session from "express-session"
import path from "path"
import { fileURLToPath } from "url"
import mongoose from "mongoose"
import passport from "passport"
import dotenv from "dotenv"

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.get('/', (req, res) => {
    res.send('homepage')
})

app.listen(8080, () => {
    console.log('Server Running!')
})