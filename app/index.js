const express = require('express');
const bodyParser = require('body-parser');
const dbConnection =  require('./database');
const router = require('./src/routers');
require('dotenv').config();

const app = express();

app.set("view engine", "ejs");

dbConnection();

app.use(bodyParser.json());

app.use(router);

app.listen(process.env.PORT, async() => {
  console.log(`App listening on http://localhost:${process.env.PORT}`);
});
