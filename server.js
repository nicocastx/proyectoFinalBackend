//configuracion de express
import express from "express"
import config from './config/config.js'
import {engine as exphbs} from "express-handlebars"

//manejo de sesiones
import passport from 'passport'

//Rutas
import routerLogin from "./routes/login.js"
import routerProductos from "./routes/productos.js"

//Middlewares
import isAuth from "./routes/middlewares/isAuth.js"

//Conexion a Mongo
import { conexionMDB } from "./config/optionsMongoDB.js"
import sessionconfig from "./config/sessionconfig.js"
conexionMDB


const app = express()

//#region ConfigApp
app.use(express.json())
app.use(express.static(`./public`))
app.use(express.urlencoded({extended:true}))
app.engine(`.hbs`, exphbs({extname: `.hbs`, defaultLayout: `main.hbs`}))
app.set(`view engine`, `hbs`)

app.use(sessionconfig)
app.use(passport.initialize())
app.use(passport.session())

//#endregion ConfigApp

app.use("/", routerLogin)
app.use("/productos",isAuth.isAuth, routerProductos)
//app.use('/carrito', routerCarrito)

const PORT = config.PORT

app.listen(PORT, () =>{
  console.log(`Escuchando en el puerto ${PORT}`);
})