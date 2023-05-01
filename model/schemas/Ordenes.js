import { Schema, model } from "mongoose";

const colName = 'ordenes'

const colSchema = new Schema({
  nroOrden: {type: Number},
  items: [{
    idItem: {type: String},
    cantidad: {type: Number}
  }],
  fechayHora: {type: String},
  estado: {type: String},
  direccion: {type: String, required: true},
  email: {type: String, required: true}
})

const modelOrden = model(colName, colSchema)

export default modelOrden