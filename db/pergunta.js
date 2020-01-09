const Sequelize = require('sequelize')
const sequelize = require('./db')

const Pergunta = sequelize.define('pergunta',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Pergunta.sync({force:false}).then(()=>{})
module.exports = Pergunta   