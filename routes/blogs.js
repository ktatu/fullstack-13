const Blog = require("../models/Blog")
const router = require("express").Router()

router.get("/", async (req, res) => {
    try {
        const blogs = await Blog.findAll()
        return res.json(blogs)
    } catch (error) {
        return res.status(400).json({ error })
    }
})

router.post("/", async (req, res) => {
    try {
        const newBlog = await Blog.create(req.body)
        return res.json(newBlog)
    } catch (error) {
        return res.status(400).json({ error })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        await Blog.destroy({ where: { id: req.params.id } })
        return res.status(200).end()
    } catch (error) {
        return res.status(400).json({ error })
    }
})

module.exports = router
