'use strict';

const express      = require('express');
const app          = express();
const port         = +process.env.PORT || 8000;
const path         = require('path');
const mongoose     = require('mongoose');
const morgan       = require('morgan');
const bodyParser   = require('body-parser'); // parsing middleware
const http         = require('http');




// connect to our database

mongoose.connect('mongodb://localhost:27017/appdb');
