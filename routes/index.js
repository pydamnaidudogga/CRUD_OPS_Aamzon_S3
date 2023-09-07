const express  = require("express");
const multer = require('multer');
const imageController = require('../controllers/images_Controller');
const router = express.Router();


const storage = multer.memoryStorage(); // Store uploaded file in memory

const upload = multer({ storage });

router.post('/upload',upload.single("file"), imageController.uploadImage);
router.get('/all_images',imageController.allImages);
router.delete('/delete',imageController.deleteImage);
router.post('/getURL',imageController.getPublicImageURL);


module.exports = router;