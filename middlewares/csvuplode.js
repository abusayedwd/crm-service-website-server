const multer = require("multer");
const path = require("path");
const fs = require('fs');
module.exports = function (UPLOADS_FOLDER) {
const storage = multer.diskStorage({
destination: (req, file, cb) => {
const uploadPath = path.join(__dirname, "..", UPLOADS_FOLDER);
// Ensure the directory exists before storing the file
if (!fs.existsSync(uploadPath)) {
fs.mkdirSync(uploadPath, { recursive: true });
}
cb(null, uploadPath); // Store the file in the correct directory
},
filename: (req, file, cb) => {
const fileExt = path.extname(file.originalname);
const filename =
file.originalname
.replace(fileExt, "")
.toLocaleLowerCase()
.split(" ")
.join("-") +
"-" +
Date.now();
cb(null, filename + fileExt); // Generate a unique filename
},
});
const upload = multer({
storage: storage,
limits: { fileSize: 20000000 }, // 20MB limit
fileFilter: (req, file, cb) => {
if (
file.mimetype === "text/csv" ||
file.mimetype === "image/jpg" ||
file.mimetype === "image/png" ||
file.mimetype === "image/jpeg" ||
file.mimetype === "image/heic" ||
file.mimetype === "image/heif"
) {
cb(null, true); // Allow the file types
} else {
cb(new Error("Invalid file type, only CSV and images are allowed!"));
}
},
});
return upload; // Return multer upload middleware
};