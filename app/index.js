const express = require('express');
const bodyParser = require('body-parser');
const dbConnection =  require('./database');
const router = require('./src/routers');
const sendEmail = require('./src/services/nodemailer');
require('dotenv').config();

const app = express();

dbConnection();

app.use(bodyParser.json());

app.use(router);

app.listen(process.env.PORT, async() => {
  console.log(`App listening on http://localhost:${process.env.PORT}`);
});
