const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer  = require('multer');
const fs  = require('fs');


cloudinary.config({
    cloud_name: process.env.CLOUDE_NAME,
    api_key: process.env.CLOUDE_API_KEY,
    api_secret: process.env.CLOUDE_API_SECRET,
});

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: 'wanderlust_DEV',
//       allowerdFormats: ["png", "jpg", "jpeg"]
//     },
//   });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/') // Uploads folder where files will be stored
  },
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + file.originalname); // File naming convention
  }
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
      const response = await cloudinary.uploader.upload(localFilePath, {
          resource_type: "auto",
          folder: 'wanderlust_DEV', // specify the folder here
          allowed_formats: ["png", "jpg", "jpeg"],
          limits: { fileSize: 1000000 } // Set file size limit (optional)
      })
      
      fs.unlinkSync(localFilePath)
      return response;

  } catch (error) {
    console.log("MulterError"+ error);
      // fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
      return null;
  }
}

const deleteImageFromCloudinary = async (publicId) => {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      console.log('Image deleted successfully:', result);
      return result;
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  };

module.exports = {
     storage, uploadOnCloudinary, deleteImageFromCloudinary
}