const express = require("express")
require("express-async-errors")
const blogsRouter = require("./routes/blogs")
const usersRouter = require("./routes/users")
const loginRouter = require("./routes/login")
const authorRouter = require("./routes/authors")
const app = express()

app.use(express.json())

app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)
app.use("/api/authors", authorRouter)

const errorHandler = (error, request, response, next) => {
    console.error(error.name)
    console.error(error.message)

    if (error.name === "SequelizeDatabaseError") {
        return response.status(400).send({ error: error.message })
    }
    if (error.name === "SequelizeValidationError") {
        return response
            .status(400)
            .send({ error: "Validation failed. Make sure all data is correctly formatted" })
    }

    next(error)
}

app.use(errorHandler)

module.exports = app
