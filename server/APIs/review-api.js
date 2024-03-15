//create a route(mini express app)
const exp=require('express')
const reviewApp=exp.Router()

//add express-async-handler to handle async errors
const expressAsyncHandler=require('express-async-handler');
const verifyToken=require('../Middlewares/verifyToken')

const {getReviews,getReviewByArticleId,createReview,updateReview,removeReview}=require('../Controllers/reviewControllers')


reviewApp.get('/reviews',verifyToken,expressAsyncHandler(getReviews))

reviewApp.get('/reviews/article/:articleId',verifyToken,expressAsyncHandler(getReviewByArticleId))

reviewApp.post('/reviews',verifyToken,expressAsyncHandler(createReview))

reviewApp.put('/reviews/:id',verifyToken,expressAsyncHandler(updateReview))


reviewApp.delete('/reviews/:id',verifyToken,expressAsyncHandler(removeReview))

module.exports=reviewApp