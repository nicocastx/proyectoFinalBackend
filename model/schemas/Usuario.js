import { Schema, model } from "mongoose";

const colName = 'Usuarios'

const colSchema = Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  nombre: {type: String},
  apellido: {type: String, required: true},
  nroTelefono: {type: String, required: true},
  urlAvatar: {type: String}
})

const usuariosModel = model(colName, colSchema)

export default usuariosModel