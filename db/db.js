const Sequelize = require('sequelize')
const sequelize = new Sequelize('guiaPerguntas', 'root', 'password',{
    host: "localhost",
    dialect: "mysql"
})


module.exports = sequelize;