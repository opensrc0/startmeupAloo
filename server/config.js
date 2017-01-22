require('dotenv').config()

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  nodeEnv: process.env.NODE_ENV,
  webConcurrency: process.env.WEB_CONCURRENCY || 1,
  port: process.env.PORT || 3000,
  timeout: 29000
}

module.exports = config
