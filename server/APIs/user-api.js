//create a route(mini express app)
const exp=require('express')
const userApp=exp.Router()

//add express-async-handler to handle async errors
const expressAsyncHandler=require('express-async-handler')

//import req handlers from Controllers
const {getUsers,getUserByUsername,createUser,loginUser,updateUser,removeUser}=require('../Controllers/userControllers')
const verifyDuplicateUser=require('../Middlewares/verifyDuplicateUser')




//user CRUD
 //get all users
 userApp.get('/users',expressAsyncHandler(getUsers))
 // getUserByUsername
 userApp.get('/user/:username',expressAsyncHandler(getUserByUsername))
 //create user
 userApp.post('/user',verifyDuplicateUser,expressAsyncHandler(createUser))
  //login user
  userApp.post('/user-login',expressAsyncHandler(loginUser))

 //update user
 userApp.put('/user',expressAsyncHandler(updateUser))
 //delete user
 userApp.delete('/user/:username',expressAsyncHandler(removeUser))





module.exports=userApp