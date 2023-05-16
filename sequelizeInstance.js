require("dotenv").config()
const { Sequelize } = require("sequelize")

const sequelizeInstance = new Sequelize(process.env.DATABASE_URL)

module.exports = sequelizeInstance
