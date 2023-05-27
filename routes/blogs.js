const router = require("express").Router()
const { Blog, User } = require("../models")
const { Op } = require("sequelize")
const tokenExtractor = require("../utils/tokenExtractor")

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

router.get("/", async (req, res) => {
    try {
        let where = {}

        if (req.query.search) {
            where = {
                [Op.or]: [
                    {
                        author: {
                            [Op.iLike]: `%${req.query.search}%`,
                        },
                    },
                    {
                        title: {
                            [Op.iLike]: `%${req.query.search}%`,
                        },
                    },
                ],
            }
        }

        const blogs = await Blog.findAll({
            attributes: { exclude: ["userId"] },
            include: { model: User, attributes: ["name"] },
            order: [["likes", "DESC"]],
            where,
        })
        return res.json(blogs)
    } catch (error) {
        return res.status(400).json({ error: message })
    }
})

router.post("/", tokenExtractor, async (req, res) => {
    try {
        const user = await User.findByPk(req.decodedToken.id)
        const blog = await Blog.create({ ...req.body, userId: user.id })

        res.json(blog)
    } catch (error) {
        console.log(error)
        return res.status(401).json({ error })
    }
})

router.delete("/:id", blogFinder, tokenExtractor, async (req, res) => {
    if (req.blog) {
        const user = await User.findByPk(req.decodedToken.id)

        if (user.id !== req.blog.userId) {
            return res.status(400).json({ error: "Invalid credentials" })
        }
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
