const router = require("express").Router()
const { Session } = require("../models")

router.delete("/", async (req, res) => {
    const token = req.get("authorization")

    await Session.destroy({
        where: {
            token,
        },
    })

    return res.status(200).end()
})

module.exports = router
