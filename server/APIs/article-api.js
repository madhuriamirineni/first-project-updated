//create a route(mini express app)
const exp=require('express')
const articleApp=exp.Router()

const {upload}=require('../Middlewares/cloudinaryUpload')

//add express-async-handler to handle async errors
const expressAsyncHandler=require('express-async-handler')

const {getArticles,getArticleByCategory,getArticleById,createArticle,updateArticle,removeArticle}=require('../Controllers/articleControllers')


articleApp.get('/articles',expressAsyncHandler(getArticles))

articleApp.get('/article/:id',expressAsyncHandler(getArticleById))


articleApp.get('/article/category/:category',expressAsyncHandler(getArticleByCategory))

articleApp.post('/article',upload.single('imageUrl'),expressAsyncHandler(createArticle))

articleApp.put('/article',expressAsyncHandler(updateArticle))

articleApp.delete('/article/:category',expressAsyncHandler(removeArticle))



module.exports=articleApp