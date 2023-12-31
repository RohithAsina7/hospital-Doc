require('dotenv').config()

const serverPath = process.env.SERVER_PATH

module.exports = {
  server: {
    host: process.env.HOST,
    port: process.env.PORT
  },
  database: {
    host: process.env.DB_HOST,
    db: process.env.DB_NAME,
    port: process.env.DB_PORT ? process.env.DB_PORT : 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    upload_folder: '/uploads'
  },
}