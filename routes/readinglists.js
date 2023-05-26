const router = require("express").Router()
const { ReadingList } = require("../models")

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

module.exports = router
