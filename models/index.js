const Blog = require("./Blog")
const User = require("./user")

User.hasMany(Blog)
Blog.belongsTo(User)

module.exports = {
    Blog,
    User,
}
