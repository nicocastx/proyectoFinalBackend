import dotenv from 'dotenv'
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

dotenv.config(
    {path: __dirname + '../.env'}
)

export default {
  URLMONGODB : process.env.URLMONGODB,
  PORT: process.env.PORT,
  SECRETSESSION: process.env.SECRETSESSION,
  GMAIL_ADDRESS: process.env.GMAIL_ADDRESS,
  GMAIL_PASS: process.env.GMAIL_PASS,
  NODE_ENV: process.env.NODE_ENV,
}
