//create a route(mini express app)
const exp=require('express')
const reviewApp=exp.Router()

//add express-async-handler to handle async errors
const expressAsyncHandler=require('express-async-handler')

const {getReviews,getReviewByArticleId,createReview,removeReview}=require('../Controllers/reviewControllers')


reviewApp.get('/reviews',expressAsyncHandler(getReviews))

reviewApp.get('/reviews/article/:articleId',expressAsyncHandler(getReviewByArticleId))

reviewApp.post('/reviews',expressAsyncHandler(createReview))

// reviewApp.put('/reviews/:id',expressAsyncHandler(updateReview))


reviewApp.delete('/reviews/article/:articleId',expressAsyncHandler(removeReview))

module.exports=reviewApp