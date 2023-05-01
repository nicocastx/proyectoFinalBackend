import { Schema, model } from "mongoose";

const colName = 'Carritos'

const colSchema = new Schema({
  email: {type: String, required: true},
  fechaHoraCreacion: {type: String, required: true},
  items: [
    {
      idItem: {type: String},
      cantidad: {type: Number}
    }
  ],
  direccion: {type: String}
})

const modelCarritos = model(colName, colSchema)

export default modelCarritos