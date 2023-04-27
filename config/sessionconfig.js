import session from 'express-session'
import MongoStore from 'connect-mongo'
import config from "./config.js"

const advOptionsMongo = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export default session({
  store:MongoStore.create({
    mongoUrl: config.URLMONGODB,
    mongoOptions: advOptionsMongo,
    ttl:60,
    autoRemove: 'native',
  }),
  cookie: {
    maxAge:10 * 60 * 1000
  },
  secret: config.SECRETSESSION,
  resave: false,
  saveUninitialized: false
})