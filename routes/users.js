const router = require("express").Router()
const { User } = require("../models")

router.get("/", async (req, res) => {
    const users = await User.findAll()
    return res.json(users)
})

router.post("/", async (req, res) => {
    try {
        console.log("req body ", req.body)
        const user = await User.create(req.body)
        return res.json(user)
    } catch (error) {
        console.log("error ", error)
        return res.status(400).json({ error })
    }
})

router.put("/:username", async (req, res) => {
    try {
        const user = await User.findOne({ where: { username: req.params.username } })
        user.name = req.body.name
        user.save()
        return res.status(201).end()
    } catch (error) {
        return res.status(400).json({ error })
    }
})

module.exports = router
