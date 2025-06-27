const cloudinary = require("./config/cloudinaryConfig");

const uploadToCloudinary = async (buffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "uploads",
          eager: [
            {
              with: 300,
              heghit: 300,
              crop: "fill",
              format: "webp",
              quality: "auto",
            },
          ],
        },
        (err, reslut) => {
          return err ? reject(err) : resolve(reslut);
        }
      )
      .end(buffer);
  });
};

module.exports = uploadToCloudinary;
