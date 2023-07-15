const User = require("./user")
const Blog = require("./blog")
const ReadingList = require("./readingList")
const Session = require("./session")

User.hasMany(Blog)
Blog.belongsTo(User)

Blog.belongsToMany(User, { through: ReadingList, as: "readers" })
User.belongsToMany(Blog, { through: ReadingList, as: "readings" })

Blog.hasMany(ReadingList)
ReadingList.belongsTo(Blog)

User.hasMany(ReadingList)
ReadingList.belongsTo(User)

Session.hasOne(User)

module.exports = {
    Blog,
    User,
    ReadingList,
    Session,
}
