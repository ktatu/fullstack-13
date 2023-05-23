const router = require("express").Router()
const { sequelize } = require("../utils/db")
const { QueryTypes } = require("sequelize")

router.get("/", async (req, res) => {
    try {
        const test = await sequelize.query(
            "SELECT author, COUNT(author) as blogs, SUM(likes) as likes FROM blogs GROUP BY author",
            {
                type: QueryTypes.SELECT,
            }
        )
        return res.json(test)
    } catch (error) {
        return res.status(401).json({ error: error.message })
    }
})

module.exports = router
