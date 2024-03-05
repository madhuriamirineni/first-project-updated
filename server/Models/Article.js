const mongoose=require('mongoose')

//create user Schema
const articleSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    category:String,
    imageUrl:String,
    summary:String,
    content:String,
    username:String
})
//create model(class) for that userSchema
const Article=mongoose.model('article',articleSchema)


//export user model
module.exports=Article;