const DB = require("../db/dbConnection");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const uploadDir = path.join(__dirname, "..", "public", "media", "slider");

const buildImageUrl = (filename) => `/public/media/slider/${filename}`;

const deleteFile = (fileUrl) => {
  if (!fileUrl) return;

  const filename = path.basename(fileUrl);
  const fullPath = path.join(uploadDir, filename);

  fs.unlink(fullPath, (err) => {
    if (err && err.code !== "ENOENT") {
      console.error("Error deleting file:", fullPath, err);
    }
  });
};

const createSlider = (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        error: "At least one slider image is required",
      });
    }

    const titles = Array.isArray(req.body.title)
      ? req.body.title
      : req.body.title
      ? [req.body.title]
      : [];
      console.log("📥 Received Slider Create:", 
        {
          titles,
          files: req.files
        }
      );

    const values = req.files.map((file, index) => {
      const title = titles[index] ?? titles[0] ?? null;
      return [uuidv4(), buildImageUrl(file.filename), title];
    });
    const sql = "INSERT INTO slider (id, image_url, title) VALUES ?";

    DB.query(sql, [values], (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: "Unable to create slider records",
          details: err.message,
        });
      }

      res.status(201).json({
        success: true,
        message: "Slider images uploaded successfully",
        data: values.map(([id, image_url, title]) => ({ id, image_url, title })),
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

const getSliders = (req, res) => {
  try {
    DB.query("SELECT * FROM slider ", (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: "Unable to fetch slider records",
          details: err.message,
        });
      }

      res.status(200).json({
        success: true,
        message: "Sliders retrieved successfully",
        data: results,
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

const getSlider = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      error: "Slider ID is required",
    });
  }

  try {
    DB.query("SELECT * FROM slider WHERE id = ?", [id], (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: "Unable to fetch slider record",
          details: err.message,
        });
      }

      if (!results.length) {
        return res.status(404).json({
          success: false,
          error: "Slider not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Slider retrieved successfully",
        data: results[0],
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

const updateSlider = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      error: "Slider ID is required",
    });
  }

  try {
    DB.query("SELECT * FROM slider WHERE id = ?", [id], (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: "Unable to fetch slider record",
          details: err.message,
        });
      }

      if (!results.length) {
        return res.status(404).json({
          success: false,
          error: "Slider not found",
        });
      }

      const existingSlider = results[0];
      const imageUrl = req.files?.[0]
        ? buildImageUrl(req.files[0].filename)
        : existingSlider.image_url;
      const title = req.body.title ?? existingSlider.title;
      const sql = "UPDATE slider SET image_url = ?, title = ? WHERE id = ?";

      DB.query(sql, [imageUrl, title, id], (updateErr, updateResult) => {
        if (updateErr) {
          return res.status(500).json({
            success: false,
            error: "Unable to update slider",
            details: updateErr.message,
          });
        }

        if (updateResult.affectedRows === 0) {
          return res.status(404).json({
            success: false,
            error: "Slider not found",
          });
        }

        if (req.files?.[0]) {
          deleteFile(existingSlider.image_url);
        }

        res.status(200).json({
          success: true,
          message: "Slider updated successfully",
          data: { id, image_url: imageUrl, title },
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

const deleteSlider = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      error: "Slider ID is required",
    });
  }

  try {
    DB.query("SELECT * FROM slider WHERE id = ?", [id], (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: "Unable to fetch slider record",
          details: err.message,
        });
      }

      if (!results.length) {
        return res.status(404).json({
          success: false,
          error: "Slider not found",
        });
      }

      const imageUrl = results[0].image_url;
      DB.query("DELETE FROM slider WHERE id = ?", [id], (deleteErr, deleteResult) => {
        if (deleteErr) {
          return res.status(500).json({
            success: false,
            error: "Unable to delete slider",
            details: deleteErr.message,
          });
        }

        deleteFile(imageUrl);

        res.status(200).json({
          success: true,
          message: "Slider deleted successfully",
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
  createSlider,
  getSliders,
  getSlider,
  updateSlider,
  deleteSlider,
};
