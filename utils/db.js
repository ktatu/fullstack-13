const { Sequelize } = require("sequelize")
const { DATABASE_URL } = require("./config")
const { Umzug, SequelizeStorage } = require("umzug")

const sequelize = new Sequelize(DATABASE_URL)

const migrator = new Umzug({
    migrations: {
        glob: "migrations/*.js",
    },
    storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
    context: sequelize.getQueryInterface(),
    logger: console,
})

const runMigrations = async () => {
    const migrations = await migrator.up()
    console.log("Migrations up to date", {
        files: migrations.map((mig) => mig.name),
    })
}

const resetMigrations = async () => {
    const migrations = await migrator.down({ to: 0 })
    console.log("reset migrations: ", {
        files: migrations.map((mig) => mig.name),
    })
}

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate()
        console.log("authenticated")
        await runMigrations()
        //await resetMigrations()
        console.log("database connected")
    } catch (err) {
        console.log("connecting database failed")
        console.log(err)
        return process.exit(1)
    }

    return null
}

module.exports = { connectToDatabase, sequelize }
