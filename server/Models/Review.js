const mongoose=require('mongoose')

//create review Schema
const reviewSchema=new mongoose.Schema({
   articleId:{type:mongoose.Schema.Types.ObjectId,ref:'Article'},
   rating:Number,
   comment:String,
   createdAt:{type:Date,default:Date.now()}
})
//create model(class) for that reviewSchema
const Review=mongoose.model('review',reviewSchema)


//export review model
module.exports=Review;
