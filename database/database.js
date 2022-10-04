const { Sequelize } = require('sequelize');

const conn = new Sequelize(
    'guiaperguntas', // database
    'root', // login
    'root' // senha
    ,{ // dados de conexão com o banco
        host: 'localhost',
        dialect: 'mysql'
    }
);

module.exports = conn