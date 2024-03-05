const User = require('../Models/User')

async function verifyDuplicateUser(req, res, next) {
    let newUser = req.body;
    let user = await User.findOne({ username: newUser.username })
    if (user !== null) {
        res.send({ message: "User already existed" })
    }
    else {
        next()
    }
}
module.exports = verifyDuplicateUser