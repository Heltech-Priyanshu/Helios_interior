const DB = require("../db/dbConnection");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const uploadDir = path.join(__dirname, "..", "public", "media", "gallery");

const buildImageUrl = (filename) => `/public/media/gallery/${filename}`;


const createGalleryImage = (req, res) => {
  try {
    console.log("Received files:", req.files);
    console.log("Request body:", req.body.created_by);
    if (!req.files || req.files.length === 0 || req.files.length > 5) {
      return res.status(400).json({
        success: false,
        error: "At least 1 and at most 5 gallery images are required",
      });
    }


    const values = req.files.map((file, index) => {

      return [uuidv4(), buildImageUrl(file.filename), req.body.created_by];
    });
    const sql = "INSERT INTO gallery (id, image_url, created_by) VALUES ?";

    DB.query(sql, [values], (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: "Unable to create gallery records",
          details: err.message,
        });
      }

      res.status(201).json({
        success: true,
        message: "Gallery images uploaded successfully",
        data: values.map(([id, image_url, created_by]) => ({ id, image_url, created_by })),
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
      details: error.message,
    });
  }
};


const deleteGalleryImage = (req, res) => {
  const { id } = req.params;
    DB.query("SELECT image_url FROM gallery WHERE id = ?", [id], (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                error: "Database error while fetching gallery image",
                details: err.message,
            });
        }
        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                error: "Gallery image not found",
            });
        }

        const imageUrl = results[0].image_url;
        const filePath = path.join(uploadDir, path.basename(imageUrl));
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
            }
            DB.query("DELETE FROM gallery WHERE id = ?", [id], (err) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        error: "Database error while deleting gallery record",
                        details: err.message,
                    });
                }
                res.json({
                    success: true,
                    message: "Gallery image deleted successfully",
                });
            }
            );
        });
    });
};

const getGalleryImages = (req, res) => {
  try {
    DB.query("SELECT * FROM gallery", (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: "Unable to fetch gallery images",
          details: err.message,
        });
      }
        res.status(200).json({
            success: true,
            data: results,
        });
    });
  } catch (error) {    res.status(500).json({
      success: false,
      error: "Internal server error",
        details: error.message,
    });
  }
};

const updateGalleryImage = (req, res) => {
  const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            success: false,
            error: "Gallery image ID is required",
        });
    }
    try {
    DB.query("SELECT * FROM gallery WHERE id = ?", [id], (err, results) => {
      if (err) {
        return res.status(500).json({
            success: false,
            error: "Unable to fetch gallery record",
            details: err.message,
        });
      }


        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                error: "Gallery image not found",
            });
        }
        const existingImageUrl = results[0].image_url;
        const filePath = path.join(uploadDir, path.basename(existingImageUrl));
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
            }
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({
                    success: false,
                    error: "A new gallery image file is required for update",
                });
            }
            const newImageUrl = buildImageUrl(req.files[0].filename);
            DB.query("UPDATE gallery SET image_url = ? WHERE id = ?", [newImageUrl, id], (err) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        error: "Unable to update gallery image",
                        details: err.message,
                    });
                }
                res.json({
                    success: true,
                    message: "Gallery image updated successfully",
                });
            });
        });
    });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Internal server error",
            details: error.message,
        });
    }
};

module.exports = {
  createGalleryImage,
  deleteGalleryImage,
  getGalleryImages,
  updateGalleryImage,
};