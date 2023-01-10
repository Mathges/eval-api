const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbConnection = require('./database');
require('dotenv').config();

app = express();

dbConnection();


app.use(bodyParser.json());

app.listen(process.env.PORT, () => {
  console.log(`App listening on http://localhost:${process.env.PORT}`);
});
