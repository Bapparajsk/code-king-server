require('dotenv').config();
require('./config/db/db.config');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/admin', require('./routes/admin.router'));
app.use('/api/problem', require('./routes/problem.router'));
app.use('/admin/problem', require('./routes/admin.problem.router'));

module.exports = app;
module.exports = app;
