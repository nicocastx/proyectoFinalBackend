import { Schema, model } from "mongoose";

const colName = "productos"

const colSchema = Schema({
  img: {type: String},
  precio: {type: Number, required: true},
  descripcion: {type: String},
  nombre: {type:String, required: true},
  categoria: {type: String, required: true}
})

const productosModel = model(colName, colSchema)

export default productosModel