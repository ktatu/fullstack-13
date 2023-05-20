const User = require("../models/user")
const router = require("express").Router()

router.post("/", async (req, res) => {
    const credentials = req.body

    const user = await User.findOne({ where: { username: credentials.username } })

    const correctPassword = credentials.password === "salainen"

    if (!(user && correctPassword)) {
        return res.status(401).json({ error: "Invalid username or password" })
    }
})
