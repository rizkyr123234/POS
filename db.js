
require('dotenv').config();
const { Pool } = require('pg');

const client = new Pool({
  user: "postgres",
  password: "12345",
  host: "localhost",
  port: "5432",
  database: "POS"

})
module.exports = client;