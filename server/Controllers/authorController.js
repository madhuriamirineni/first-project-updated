const Author = require('../Models/Author')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')




const createAuthor = async (req, res) => {
    let existingAuthor = await Author.findOne({ username: req.body.username })
    if (existingAuthor !== null) {
        return res.status(201).send({ message: "author already existed" })
    }
    else {
        const hashedPassword = await bcryptjs.hash(req.body.password, 6)
        req.body.password = hashedPassword;
        const newAuthor = await Author.create(req.body)
        res.status(201).send({ message: "Author created", payload: newAuthor })
    }
}


const loginAuthor = async (req, res) => {
    const authorCredentials = req.body;
    let author = await Author.findOne({ username: authorCredentials.username })

    if (author === null) {
        return res.status(200).send({ message: "Invalid username" })
    }
    else {
        const result = await bcryptjs.compare(authorCredentials.password, author.password)
        if (result === false) {
            return res.status(200).send({ message: "Invalid Password" })
        }
        else {
            const signedToken = jwt.sign({ username: author.username }, process.env.SECRET_KEY, { expiresIn: '1d' })
            res.status(200).send({ message: "login success", token: signedToken, author: author })
        }
    }
}


const getAuthorByName = async (req, res) => {
    let author = await Author.findOne({ username: req.params.username })
    res.send({ message: "got the author", payload: author })
}



module.exports = { createAuthor, loginAuthor, getAuthorByName }