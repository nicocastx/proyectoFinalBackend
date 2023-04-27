import dotenv from 'dotenv'
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

dotenv.config(
    {path: __dirname + '../.env'}
)

export default {
  URLMONGODB : process.env.URLMONGODB,
  PORT: process.env.PORT,
  URLSESSIONMONGODB: process.env.URLSESSIONMONGODB,
  SECRETSESSION: process.env.SECRETSESSION
}