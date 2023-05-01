import { model, Schema } from "mongoose";

const colName = 'mensajes'

const colSchema = new Schema({
  email: {type: String, required: true},
  tipo: {type: String, required: true},
  fechayHora: {type: String, required: true},
  cuerpo: {type: String, required: true}
})

const modelMensajes = model(colName, colSchema)

export default modelMensajes