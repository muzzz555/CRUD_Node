const mysql2 = require("mysql2");
require("dotenv").config();

const connection = mysql2.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT_DB,
});

if (!connection) {
  console.log("Not Connecting");
} else {
  console.log("Connecting");
}

module.exports = connection;
