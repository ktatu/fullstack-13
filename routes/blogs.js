const router = require("express").Router()
const { Blog, User } = require("../models")
const jwt = require("jsonwebtoken")
const { SECRET } = require("../utils/config")

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

const tokenExtractor = (req, res, next) => {
    const authorization = req.get("authorization")

    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        try {
            req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
        } catch (error) {
            return res.status(401).json({ error: "token invalid" })
        }
    } else {
        return res.status(401).json({ error: "token missing" })
    }

    next()
}

router.get("/", async (req, res) => {
    try {
        const blogs = await Blog.findAll({
            attributes: { exclude: ["userId"] },
            include: { model: User, attributes: ["name"] },
        })
        return res.json(blogs)
    } catch (error) {
        console.log("error ", error)
        return res.status(400).json({ error })
    }
})

router.post("/", tokenExtractor, async (req, res) => {
    try {
        const user = await User.findByPk(req.decodedToken.id)
        const blog = await Blog.create({ ...req.body, userId: user.id })

        res.json(blog)
    } catch (error) {
        return res.status(401).error({ error: error.msg })
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
