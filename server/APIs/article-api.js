//create a route(mini express app)
const exp=require('express')
const articleApp=exp.Router()

const {upload}=require('../Middlewares/cloudinaryUpload')
const verifyToken=require('../Middlewares/verifyToken')

//add express-async-handler to handle async errors
const expressAsyncHandler=require('express-async-handler')

const {getArticles,getArticleByCategory,getArticleById,createArticle,updateArticle,removeArticle}=require('../Controllers/articleControllers')


articleApp.get('/articles',verifyToken,expressAsyncHandler(getArticles))

articleApp.get('/article/:id',verifyToken,expressAsyncHandler(getArticleById))


articleApp.get('/article/category/:category',verifyToken,expressAsyncHandler(getArticleByCategory))

articleApp.post('/article',verifyToken,upload.single('imageUrl'),expressAsyncHandler(createArticle))

articleApp.put('/article',verifyToken,expressAsyncHandler(updateArticle))

articleApp.delete('/article/:id',verifyToken,expressAsyncHandler(removeArticle))








module.exports=articleApp