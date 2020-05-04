module.exports = {
  mongoDbURI: process.env.MONGO_DB_URI,
  jwtSecret: process.env.JWT_SECRET,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  passportCookieKey: process.env.PASSPORT_COOKIE_KEY,
  clientUrl: process.env.CLIENT_URL
}