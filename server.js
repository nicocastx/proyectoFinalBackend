//configuracion de express
import express from "express"
import config from './config/config.js'
import { engine as exphbs } from "express-handlebars"

//manejo de sesiones
import passport from 'passport'

//Rutas
import routerLogin from "./routes/login.js"
import routerProductos from "./routes/productos.js"
import routerCarrito from "./routes/carrito.js"
import routerOrdenes from './routes/ordenes.js'
import routerChat from './routes/chat.js'

//Socket
import { Server } from "socket.io";
import { createServer } from 'http'
import levantarIOMensajes from "./sockets/mensajes.js"

//Middlewares
import isAuth from "./routes/middlewares/isAuth.js"

//Conexion a Mongo
import { conexionMDB } from "./config/optionsMongoDB.js"
import sessionconfig from "./config/sessionconfig.js"
conexionMDB


const app = express()
const httpServer = createServer(app)

//Inicio de IO
const io = new Server(httpServer)

levantarIOMensajes(io)

//#region ConfigApp
app.use(express.json())
app.use(express.static(`./public`))
app.use(express.urlencoded({ extended: true }))
app.engine(`.hbs`, exphbs({ extname: `.hbs`, defaultLayout: `main.hbs` }))
app.set(`view engine`, `hbs`)

app.use(sessionconfig)
app.use(passport.initialize())
app.use(passport.session())

//#endregion ConfigApp
app.use("/", routerLogin)
app.use("/productos", isAuth.isAuth, routerProductos)
app.use('/carrito', isAuth.isAuth, routerCarrito)
app.use('/ordenes', isAuth.isAuth, routerOrdenes)
app.use('/chat', isAuth.isAuth, routerChat)
app.use((req, res) =>{
  res.json({
    error: -1,
    description: "Ruta aun no implementada " + req.originalUrl,
  });
})

const PORT = config.PORT

httpServer.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
})