import dotenv from 'dotenv'
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

dotenv.config(
    {path: __dirname + '../.env'}
)

export default {
  URLMONGODB : process.env.URLMONGODB,
  PORT: process.env.PORT || 8080,
  SECRETSESSION: process.env.SECRETSESSION,
  GMAIL_ADDRESS: process.env.GMAIL_ADDRESS,
  GMAIL_PASS: process.env.GMAIL_PASS,
  NODE_ENV: process.env.NODE_ENV,
  ACCSID: process.env.ACCSID,
  AUTHTOK: process.env.AUTHTOK,
  TWILIO_NUMBER: process.env.TWILIO_NUMBER,
  ADMIN_NUMBER: process.env.ADMIN_NUMBER
}
