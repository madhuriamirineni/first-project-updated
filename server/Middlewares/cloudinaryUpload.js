const multer=require('multer');
const cloudinary=require('cloudinary').v2;
require('dotenv').config()

const fs=require('fs')
const path=require('path')

//Creating uploads folder if not already existed
//In uploads folder we will temporarily upload
//image before uploading to cloudinary
if(!fs.existsSync("./uploads")){
    fs.mkdirSync("./uploads");
}

//config cloudinary
cloudinary.config({
    cloud_name:'dgax4git3',
    api_key:'828993836867521',
    api_secret:'RF7Wa2GJf12XGzcxofRUF8_RZYE'
})


//multer config
const localStorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./uploads");
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname))
    }
});

const upload=multer({storage:localStorage});
module.exports={upload,cloudinary};
