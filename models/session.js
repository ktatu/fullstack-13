const { Model, DataTypes } = require("sequelize")
const { sequelize } = require("../utils/db")

class Session extends Model {}

Session.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        token: {
            type: DataTypes.TEXT,
        },
    },
    {
        sequelize,
        underscored: true,
        modelName: "session",
        timestamps: false,
    }
)

module.exports = Session
