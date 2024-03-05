const Article = require('../Models/Article')
const {cloudinary}=require('../Middlewares/cloudinaryUpload');
const fs=require('fs');


const getArticles = async (req, res) => {
    const articlesList = await Article.find()
    res.status(200).send({ message: "articles", payload: articlesList })
}

const getArticleByCategory = async (req, res) => {
    const category=req.params.category;
    const article = await Article.find({category:category})
    res.status(200).send({ message: "Article found", payload: article })
}

const getArticleById=async (req,res)=>{
    const articleId=req.params.id;
    const article=await Article.findById(articleId);
    
    res.status(200).send({message:"Article got",payload:article})
}


const createArticle = async (req, res) => {
    const article=JSON.parse(req.body.articleObj);

    //upload image to cloudinary
    let result=await cloudinary.uploader.upload(req.file.path);
    //add cloudinary image url to article
    article.imageUrl=result.url;

    const newArticle = await Article.create(article);
    //remove image from local folder
    fs.unlink(req.file.path,err=>{
        if(err){
            throw err
        }
        console.log('image removed from local folder')
    });
    res.status(201).send({ message: "Article created", payload: newArticle })

}

const updateArticle = async (req, res) => {
    let article = await User.findOneAndUpdate({ title: req.body.title }, { ...req.body })
    res.status(200).send({ message: "Article updated", payload: article })

}

const removeArticle = async (req, res) => {
    let article = await User.deleteOne({ title: req.params.title })
    res.status(200).send({ message: "Article removed", payload: article })
}

module.exports = { getArticles,getArticleByCategory, getArticleById,createArticle, updateArticle, removeArticle }