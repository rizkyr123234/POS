require('dotenv').config();
const {Client}= require('pg')
const client = new Client({
  user: "postgres",
  password: "12345",
  host: "localhost",
  port: "5432",
  database: "POS"

})
module.exports = client;