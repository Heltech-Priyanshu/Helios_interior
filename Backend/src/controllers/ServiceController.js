const DB = require("../db/dbConnection");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const createService = (req, res) => {
  try {
    const { service_name, description, position, created_by, user_id } =
      req.body;

    // Validate required fields first
    if (!service_name || position === undefined) {
      return res.status(400).json({
        success: false,
        message: "service_name and position are required",
      });
    }


    // Check if position already exists
    DB.query(
      "SELECT * FROM services WHERE position = ?",
      [position],
      (err, results) => {
        if (err) {
          return res.status(500).json({
            success: false,
            error: err.message,
          });
        } else if (results.length > 0) {
          return res.status(400).json({
            success: false,
            message:
              "Position already exists. Please choose a different position.",
          });
        }

        // Only proceed with insert if position check passes
        const id = uuidv4();
        const positionInt = parseInt(position);

        const service_image = req.files?.service_image?.[0]
          ? `/public/media/service/${req.files.service_image[0].filename}`
          : null;

        console.log("📥 Received Service Create:", {
          id,
          service_name,
          description,
          position: positionInt,
          service_image,
          created_by,
          user_id,
        });

        const insertQuery = `
          INSERT INTO services
          (id, service_name, description, position, service_image ,created_by, user_id)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        DB.query(
          insertQuery,
          [
            id,
            service_name,
            description,
            positionInt,
            service_image,
            created_by,
            user_id,
          ],
          (err, results) => {
            if (err) {
              console.error("Error creating service:", err);
              return res.status(500).json({
                success: false,
                error: err.message,
              });
            }

            return res.status(201).json({
              success: true,
              data: {
                id,
                service_name,
                description,
                position: positionInt,
                service_image,
                created_by,
                user_id,
              },
            });
          },
        );
      },
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const getAllServices = (req, res) => {
  try {
    const query = `SELECT * FROM services ORDER BY position ASC`;

    DB.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching services:", err);
        return res.status(500).json({ success: false, error: err.message });
      }

      res.status(200).json({
        success: true,
        data: results,
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};


const updateService = (req, res) => {
  try {
    const { id } = req.params;
    const { service_name, description, position, created_by, user_id } =
      req.body;

    // New uploaded image
    const newImage = req.files?.service_image?.[0]
      ? `/public/media/service/${req.files.service_image[0].filename}`
      : null;

    // First get old image
    DB.query(
      "SELECT service_image FROM services WHERE id = ?",
      [id],
      (selectErr, selectResult) => {
        if (selectErr) {
          return res
            .status(500)
            .json({ success: false, error: selectErr.message });
        }

        const oldImage = selectResult[0]?.service_image;

        // Delete old image if new image uploaded
        if (newImage && oldImage) {
          const oldImagePath = path.join(__dirname, "..", oldImage);

          fs.unlink(oldImagePath, (unlinkErr) => {
            if (unlinkErr) {
              console.log("Old image delete error:", unlinkErr);
            }
          });
        }

        // Update query
        let query = `
          UPDATE services 
          SET service_name = ?, 
              description = ?, 
              position = ?, 
              created_by = ?, 
              user_id = ?
        `;

        const values = [
          service_name,
          description,
          position,
          created_by,
          user_id,
        ];

        // Update image only if new uploaded
        if (newImage) {
          query += `, service_image = ?`;
          values.push(newImage);
        }

        query += ` WHERE id = ?`;
        values.push(id);

        DB.query(query, values, (err, results) => {
          if (err) {
            console.error("Error updating service:", err);

            return res
              .status(500)
              .json({ success: false, error: err.message });
          }

          res.status(200).json({
            success: true,
            message: "Service updated successfully",
          });
        });
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);

    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const deleteService = (req, res) => {
  try {
    const { id } = req.params;

    const query = `DELETE FROM services WHERE id = ?`;

    DB.query(query, [id], (err, results) => {
      if (err) {
        console.error("Error deleting service:", err);
        return res.status(500).json({ success: false, error: err.message });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Service not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Service deleted successfully",
      });
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  createService,
  getAllServices,
  updateService,
  deleteService,
};
