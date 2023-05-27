const User = require("./user")
const Blog = require("./blog")
const ReadingList = require("./readingList")

User.hasMany(Blog)
Blog.belongsTo(User)

Blog.belongsToMany(User, { through: ReadingList, as: "readers" })
User.belongsToMany(Blog, { through: ReadingList, as: "readings" })

Blog.hasMany(ReadingList)
ReadingList.belongsTo(Blog)

User.hasMany(ReadingList)
ReadingList.belongsTo(User)

module.exports = {
    Blog,
    User,
    ReadingList,
}
