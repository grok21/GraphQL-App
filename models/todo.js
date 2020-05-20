const Sequilize = require('sequelize')
const sequelize = require('../utils/database')

const todo = sequelize.define('Todo', {
    id: {
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false,
        type: Sequilize.INTEGER
    }, 

    done: {
        type: Sequilize.BOOLEAN,
        allowNull: false
    }, 

    title: {
        type: Sequilize.STRING,
        allowNull: false
    }
})

module.exports = todo