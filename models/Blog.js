const { Model, DataTypes } = require("sequelize")
const { sequelize } = require("../utils/db")

class Blog extends Model {}

Blog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        author: {
            type: DataTypes.TEXT,
        },
        url: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        likes: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            validate: {
                min: 0,
            },
        },
        year: {
            type: DataTypes.INTEGER,
            validate: {
                numberValidator(value) {
                    if (value < 1991 || value > parseInt(new Date().getFullYear())) {
                        throw new Error("Blog's year must be between 1991 and the current year")
                    }
                },
            },
        },
    },
    {
        sequelize,
        underscored: true,
        timestamps: false,
        modelName: "blog",
    }
)

module.exports = Blog
