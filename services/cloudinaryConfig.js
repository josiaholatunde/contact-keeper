const cloudinary = require('cloudinary')
const cloudinaryStorage = require('multer-storage-cloudinary')
const multer = require('multer')
const { cloudinaryCloudName, cloudinaryApiKey, cloudinaryApiSecret } = require('../config/keys')

cloudinary.config({
    cloud_name: cloudinaryCloudName,
    api_key: cloudinaryApiKey,
    api_secret: cloudinaryApiSecret
})

const storage = cloudinaryStorage({
    cloudinary,
    folder: 'contact-keeper',
    allowedFormats: ['png', 'jpg'],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
    filename: (req, file, cb) => {
        const fileName = file.originalname;
        cb(null, fileName)
    }
})

const parser = multer({ storage })

module.exports = parser