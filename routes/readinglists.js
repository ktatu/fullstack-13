const router = require("express").Router()
const { ReadingList, User } = require("../models")
const tokenExtractor = require("../utils/tokenExtractor")

router.post("/", async (req, res) => {
    try {
        const readingList = await ReadingList.create({
            userId: req.body.user_id,
            blogId: req.body.blog_id,
        })
        return res.json(readingList)
    } catch (error) {
        return res.status(401).json({ error: error })
    }
})

router.put("/:id", tokenExtractor, async (req, res) => {
    try {
        if (req.body.read === true) {
            const readingList = await ReadingList.findByPk(req.params.id, {
                include: { model: User },
            })
            const user = await User.findByPk(req.decodedToken.id)

            if (user.id !== readingList.user.id) {
                throw new Error("Invalid credentials")
            }

            readingList.read = true
            await readingList.save()

            return res.status(201).end()
        }
        throw new Error("Invalid parameters")
    } catch (error) {
        console.log(error)
        return res.status(401).json({ error: error.message })
    }
})

module.exports = router
