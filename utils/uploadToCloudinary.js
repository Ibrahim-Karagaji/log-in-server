const cloudinary = require("cloudinary").v2;

const uploadToCloudinary = async (buffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "uploads",
          eager: [
            {
              width: 300,
              height: 300,
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
