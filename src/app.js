require('dotenv').config();
const http = require('http');
const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('./config/dbConfig');

const errorHandler = require('./middlewares/errorHandler');
const SocketConfig = require('./config/socketConfig');
const router = require('./routes');

const { PORT } = process.env;

const app = express();
const server = http.createServer(app);

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

SocketConfig(server);

app.use('/', router);
app.set('server', server);

app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});
