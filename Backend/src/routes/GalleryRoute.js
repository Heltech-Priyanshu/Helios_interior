const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const mediaDir = path.join(__dirname, "../public/media/gallery");

const  Gallery = require("../controllers/GalleryController");
const Authentication = require("../middleware/AuthMiddleware");


if (!fs.existsSync(mediaDir)) {
  fs.mkdirSync(mediaDir, { recursive: true });
}

// Storage
const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, mediaDir);
  },

  filename: (req, file, cb) => {

    const ext = path.extname(file.originalname);

    cb(null, `${uuidv4()}${ext}`);
  }

});

// File Filter
const fileFilter = (req, file, cb) => {

  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/webp"
  ) {

    cb(null, true);

  } else {

    cb(new Error("Only PNG, JPG, JPEG, WEBP allowed"));

  }

};

// Upload
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1 * 1024 * 1024
  }
});

// CREATE
router.post("/creategallery", upload.array("gallery_image", 5), Gallery.createGalleryImage);

// READ
router.get("/getallgallery", Gallery.getGalleryImages);

// UPDATE
router.put("/updategallery/:id", upload.array("gallery_image", 5), Gallery.updateGalleryImage);

// DELETE
router.delete("/deletegallery/:id", Gallery.deleteGalleryImage);

module.exports = router;