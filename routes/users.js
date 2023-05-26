const router = require("express").Router()
const { User, Blog } = require("../models")

router.get("/", async (req, res) => {
    const users = await User.findAll({
        include: { model: Blog, attributes: ["title", "url", "author"] },
    })
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

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: [
                {
                    model: Blog,
                    as: "readings",
                    attributes: { exclude: ["userId", "createdAt", "updatedAt"] },
                    through: {
                        attributes: [],
                    },
                },
            ],
            attributes: { exclude: ["createdAt", "updatedAt"] },
        })
        return res.json(user)
    } catch (error) {
        return res.status(401).json({ error })
    }
})

module.exports = router
