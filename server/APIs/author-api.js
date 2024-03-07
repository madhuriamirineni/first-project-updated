//create a route(mini express app)
const exp=require('express')
const authorApp=exp.Router()

//add express-async-handler to handle async errors
const expressAsyncHandler=require('express-async-handler')

const {createAuthor,loginAuthor,getAuthorByName}=require('../Controllers/authorController')


//create Author
 authorApp.post('/author',expressAsyncHandler(createAuthor))
 //login Author
 authorApp.post('/login',expressAsyncHandler(loginAuthor))

 //get author
 authorApp.get('/author/:username',expressAsyncHandler(getAuthorByName))


 module.exports=authorApp;