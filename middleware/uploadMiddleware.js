const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cd) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  return allowedTypes.includes(file.mimetype)
    ? cd(null, true)
    : cd(new Error("this type of images is not allowed"), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});

module.exports = upload;
