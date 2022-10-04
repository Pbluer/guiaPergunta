const { Sequelize } = require("sequelize");
const conn = require('./database')

const Pergunta = conn.define('pergunta',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});


Pergunta.sync({ force: false }).then( () => {
    console.log('Tabela pergunta criada.')
} )


module.exports = Pergunta