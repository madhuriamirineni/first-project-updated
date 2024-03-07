const Author=require('../Models/Author')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')



//Create new Author
const createAuthor = async (req, res) => {

    //check for existing seller with same username
       let existingAuthor = await Author.findOne({ username: req.body.username })
   
       //if seller already existed
       if (existingAuthor !== null) {
           return res.status(201).send({ message: "author already existed" })
       }
       //if seller not existed
       else {
           //hash the password
           const hashedPassword = await bcryptjs.hash(req.body.password, 6)
           //replace plain password with hashed password
           req.body.password = hashedPassword;
           const newAuthor = await Author.create(req.body)
           res.status(201).send({ message: "Author created", payload: newAuthor })
       }
   }

   //Seller login
const loginAuthor = async (req, res) => {
    //get seller credentials object from req
    const authorCredentials = req.body;
    console.log(authorCredentials)
    //check  sellername
    let author = await Author.findOne({ username: authorCredentials.username })
    //if invalid username
    if (author === null) {
        return res.status(200).send({ message: "Invalid username" })
    }
    //if sellername is found
    else {
        //compare passwords
        const result = await bcryptjs.compare(authorCredentials.password, author.password)
        //if passwords are not matched
        if (result === false) {
            return res.status(200).send({ message: "Invalid Password" })
        }
        //if passwords are matched
        else {
            //create a jwt  token and sign
            const signedToken = jwt.sign({ username: author.username }, process.env.SECRET_KEY, { expiresIn:'1d' })
            //send token to client
            res.status(200).send({ message: "login success", token: signedToken, author: author})
        }
    }
}

//get author by name
const getAuthorByName = async(req,res)=>{
    let author = await Author.findOne({username:req.params.username})
    res.send({message:"got the author",payload:author})
}



   module.exports={createAuthor,loginAuthor,getAuthorByName}