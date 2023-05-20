const router = require("express").Router()
const { User } = require("../models")

router.get("/", async (req, res) => {
    const users = await User.findAll()
    return res.json(users)
})

router.post("/", async (req, res) => {
    try {
        const user = await User.create(req.body)
        return res.json(user)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

router.put("/:username", async (req, res) => {
    try {
        const user = await User.findOne({ where: { username: req.params.username } })
        user.name = req.body.name
        user.save()
        return res.status(201).end()
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

module.exports = router
