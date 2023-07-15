const app = require("./app")
const { PORT } = require("./utils/config")
const { connectToDatabase } = require("./utils/db")

const start = async () => {
    try {
        await connectToDatabase()
    } catch (error) {
        console.log("error: ", error)
    }
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

start()
