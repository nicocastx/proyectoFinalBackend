import mongoose from "mongoose"
import config from "./config.js"

const URLMONGODB = config.URLMONGODB

export const conexionMDB = mongoose.connect(URLMONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})