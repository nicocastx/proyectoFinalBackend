import { Schema, model } from "mongoose";

const colName = 'Carritos'

const colSchema = Schema({
  email: {type: String, required: true},
  fechaHoraCreacion: {type: String, required: true},
  items: [
    {
      idItem: {type: String},
      cantidad: {type: Number}
    }
  ],
  direccion: {type: String, required: true}
})

const modelCarritos = model(colName, colSchema)

export default modelCarritos