const Blog = require("../models/Blog")
const router = require("express").Router()

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

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

router.delete("/:id", blogFinder, async (req, res) => {
    if (req.blog) {
        req.blog.destroy()
    }
    res.status(204).end()
})

router.put("/:id", blogFinder, async (req, res) => {
    if (req.blog) {
        req.blog.likes = req.body.likes
        await req.blog.save()
        res.json(req.blog)
    } else {
        res.status(404).end()
    }
})

module.exports = router
