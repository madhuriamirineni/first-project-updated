
const mongoose=require('mongoose')
require('dotenv').config()

const DB_URL=process.env.LOCAL_DB_URL;

//connect to database
mongoose.connect(DB_URL)
.then(()=>{console.log("Db connection success")})
.catch(err=>{console.log("err in DB connection",err)})

//create user Schema
const authorSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minLength:4
    },
    password:{
        type:String,
        required:true
    },
    email:String
})
//create model(class) for that userSchema
const Author=mongoose.model('author',authorSchema)

//export user model
module.exports=Author;