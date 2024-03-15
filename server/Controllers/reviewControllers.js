const Review=require('../Models/Review')


const getReviews = async (req, res) => {
    const reviewsList = await Review.find()
    res.status(200).send({ message: "reviews", payload:reviewsList })
}

const createReview=async(req,res)=>{
    const reviewData=req.body;
    console.log(req.body)
    const review=new Review(reviewData);
    const savedReview=await review.save();
    res.status(201).send({message:'Review saved',payload:savedReview});
}
const updateReview=async(req,res)=>{
    const {comment,rating}=req.body;
    const reviewId=req.params.id
    const review=await Review.findByIdAndUpdate({_id:reviewId},{comment,rating})
    res.status(200).send({message:'Review Updated',payload:review})
}

const getReviewByArticleId=async (req,res)=>{
    const articleId=req.params.articleId;
    const reviews=await Review.find({articleId:articleId}).sort({createdAt:-1});
    res.status(200).send({message:"Review got",payload:reviews})
    
}

const removeReview=async(req,res)=>{

    const reviewId=req.params.id;

    const reviews=await Review.findByIdAndDelete({_id:reviewId});
    console.log(reviews)
    res.send({message:"Review deleted successfully",deletedCount:reviews.deletedCount})
    
}



module.exports={getReviews,getReviewByArticleId,createReview,updateReview,removeReview}