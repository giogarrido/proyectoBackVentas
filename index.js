const express = require('express');
const debug = require('debug')('app:main');

const {Config}= require('./src/config');
const {ProductsAPI} = require('./src/products/index');
const {UsersAPI} = require('./src/users/index');

const app = express();

app.use(express.json());

ProductsAPI(app);
UsersAPI(app);

app.listen(parseInt(Config.port), () => {
    //console.log(Config.port);
    debug(`Servidor escuchando en el puerto ${Config.port}`);
});