const { User, Session } = require("../models")
const router = require("express").Router()
const jwt = require("jsonwebtoken")
const { SECRET } = require("../utils/config")

router.post("/", async (req, res) => {
    const credentials = req.body

    const user = await User.findOne({ where: { username: credentials.username } })

    const correctPassword = credentials.password === "salainen"

    if (!(user && correctPassword)) {
        return res.status(401).json({ error: "Invalid username or password" })
    }

    const userForToken = {
        username: user.username,
        id: user.id,
    }

    const token = jwt.sign(userForToken, SECRET)

    console.log("token ", token)

    const result = await Session.create({ token })
    console.log("res ", result)

    return res.status(200).send({ token })
})

module.exports = router
