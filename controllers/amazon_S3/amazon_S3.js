const {S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand} = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');


const s3Client = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId:"AKIAZ2KX2VL6F7AY67JP",
        secretAccessKey:"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"
    },
})

module.exports.uploadToS3 = async(fileData, fileName) => {
    try {
      const params = {
        "Bucket": "naidu-images",
        "Key": fileName,
        "Body": fileData,
      };
  
      const response = await s3Client.send(new PutObjectCommand(params));
        return true;
      
    } catch (error) {
        
      console.error("Error uploading file to S3:", error);
     return false
    }
  }

module.exports.getObjectURL = async (filename) => {
    try {

        const input = {
            "Bucket": "naidu-images",
            "Key": filename
          };
    
         const command = new GetObjectCommand(input);
        
         const url = await getSignedUrl(s3Client, command);
         return url;
        
    } catch (error) {
        console.log(error);
        return 'no url found'
    } 
    
   
}



// Function to delete an image from S3
module.exports.deleteImageFromS3 = async (fileName) =>{
    try {
      const params = {
        "Bucket": "naidu-images",
        "Key": fileName, 
      };
  
      await s3Client.send(new DeleteObjectCommand(params));
    return true;
    //   console.log(`Image '${key}' deleted successfully from S3.`);
    } catch (error) {
      console.error(`Error deleting image  from S3:`, error);
      return false;
    }
  }



