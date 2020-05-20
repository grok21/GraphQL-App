const Sequelize = require('sequelize')

const DB_NAME = 'node-todo'
const USER_NAME = 'root'

const sequelize = new Sequelize(DB_NAME, USER_NAME, null, {
    host: 'localhost', 
    dialect: 'mysql'
})

module.exports = sequelize