const cloudinary = require('../config/cloudinary');
const path = require('path');

async function uploadToCloudinary(file, folder) {
    const options = {
        folder: folder,
        resource_type: 'auto',
    };

    try{
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        return result;
    } 
    catch(error){
        throw new Error('Error uploading to Cloudinary');
    }
}

exports.uploadImage = async (req, res) => {
    try{
        const file = req.files?.image;
        if(!file){
            return res.status(400).json({ success: false, msg: "Please upload an image" });
        }

        const allowedImageTypes = ['jpg', 'jpeg', 'png'];
        const fileExtension = file.name.split('.').pop().toLowerCase();

        if(!allowedImageTypes.includes(fileExtension)){
            return res.status(400).json({ success: false, msg: "Invalid image format" });
        }

        const cloudinaryResponse = await uploadToCloudinary(file, 'email_builder_templates');
        res.status(200).json({
            success: true,
            msg: "Image uploaded successfully",
            imageUrl: cloudinaryResponse.secure_url,
        });
    } 
    catch(error){
        res.status(500).json({ success: false, msg: "Internal Server Error", error: error.message });
    }
};