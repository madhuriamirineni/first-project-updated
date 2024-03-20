
const mongoose=require('mongoose')

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