//create express app
const exp=require('express')
const app=exp()

//add body parsing m-w
app.use(exp.json())

require('dotenv').config()

const path=require('path')
//connect angular app to server
app.use(exp.static(path.join(__dirname,'../client/dist/main-project/browser')))

//import api
const userApp=require('./APIs/user-api')
//forward req to userApp if path start with /user-api
app.use('/user-api',userApp)

const articleApp=require('./APIs/article-api')
app.use('/article-api',articleApp)

const reviewApp=require('./APIs/review-api')
app.use('/review-api',reviewApp)

//error handler m-w
app.use((err,req,res,next)=>{
    res.send({message:"error occured",payload:err.message})
})
//to load the frontend Url
app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../client/dist/main-project/browser/index.html'))

})

//add port number
const PORT=process.env.PORT||4000
app.listen(PORT,()=>{console.log(`web server is listening on ${PORT}`)})