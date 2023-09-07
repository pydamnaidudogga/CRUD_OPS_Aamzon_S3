const s3 = require('./amazon_S3/amazon_S3');
const Images = require('../models/Images');
const path = require('path');

module.exports.uploadImage = async (req, res)=>{

  try {
    const fileBuffer = req.file.buffer;
    const fileName = req.file.originalname;
    
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"]; // Add more allowed extensions if needed
    const extname = path.extname(fileName).toLowerCase();
    const isvalid = allowedExtensions.includes(extname);

    if(!isvalid){
        return res.status(200).json({
            message: 'file extantion error'
        })
    }

    
    // Upload the file to S3 using the previously defined uploadToS3 function
     const result= await s3.uploadToS3(fileBuffer, fileName);
     if(!result){

       return res.status(401).send("File uploaded faild to S3");

     }
     const image = new Images({key:fileName});


     await image.save();
     return res.status(200).send("File uploaded successfully to S3");


   
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    return res.status(500).send("Error uploading file to S3");
  }


}


module.exports.allImages = async (req, res) =>{
   try {

    const images = await Images.find({});

    return res.status(200).json({
        images
    })
    
   } catch (error) {
     console.error(error);
     return res.status(500).json({
        message: "Internal server error"
     })
   }

}

module.exports.deleteImage = async (req, res) =>{

    try {

        const file = await Images.findById(req.body.id);

        if(!file){
            return res.status(400).json({
                message: "Image not found"
            })
        }

        const result = await s3.deleteImageFromS3(file.key);
        
        if(!result){
          return res.status(400).json({
            message: "Image not found"
          })
        }

        await Images.findByIdAndDelete(file._id);
        return res.status(200).json({
            message: "Image deleted successfully from S3."
        })

        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server"
        })
        
    }

}

module.exports.getPublicImageURL = async (req, res) =>{

    try {

        const keyId = req.body.id;
        const keyName = await Images.findById(keyId);

        if(!keyName){
            return res.status(402).json({
                message:'Image not found'
            })
        }
        
        const url = await s3.getObjectURL(keyName.key);
        return res.status(200).json({
            url
        })
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }


}