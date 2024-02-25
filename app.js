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

/* this routes only admin user */
app.use('/admin', require('./routes/admin.router'));
app.use('/api/problem', require('./routes/problem.router'));
app.use('/admin/problem', require('./routes/admin.problem.router'));

/* this routes public user */
app.use('/api/user', require('./routes/userAuthentication.router')); /* this route return only user 'sign-in' and 'sign-up' */
app.use('/user/get-user', require('./routes/user.details.router')); /* this router only return user details */

app.use('/api/problem/submit', require('./routes/submitProblem.router'));

module.exports = app;