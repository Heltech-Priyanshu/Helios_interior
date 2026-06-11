const DB = require("../db/dbConnection");
const { v4: uuidv4 } = require("uuid");

const addContact = (req, res) => {
  try {
    const { first_name, last_name, email, phone, message } = req.body;

    if (!first_name || !last_name || !email || !phone || !message) {
      return res.status(400).json({
        error: "All fields are required",
        success: false,
      });
    }

    const id = uuidv4();
    const sql = `INSERT INTO contact_details (id, first_name, last_name, email, phone, message)
                 VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [id, first_name, last_name, email, phone, message];

    DB.query(sql, values, (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({
            error: "Email already exists",
            success: false,
           
          });
        }
        return res.status(500).json({
          error: "Internal server error",
          success: false,
           details: err.message,
        });
      }
      res.status(201).json({
        message: "Contact added successfully",
        success: true,
        data: { id, first_name, last_name, email, phone, message },
      });
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
      success: false,
      details: error.message,
    });
  }
};

const getContacts = (req, res) => {
  try {
    // Pagination params
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    // Fetch data + total count
    const sql = "SELECT * FROM contact_details LIMIT ? OFFSET ?";
    const countSql = "SELECT COUNT(*) AS total FROM contact_details";

    DB.query(countSql, (countErr, countResult) => {
      if (countErr) {
        return res.status(500).json({
          error: "Internal server error",
          success: false,
          details: countErr.message,
        });
      }

      const total = countResult[0].total;

      DB.query(sql, [limit, offset], (err, results) => {
        if (err) {
          return res.status(500).json({
            error: "Internal server error",
            success: false,
            details: err.message,
          });
        }

        res.status(200).json({
          message: "Contacts retrieved successfully",
          success: true,
          status: 200,
          current_page: page,
          limit: limit,
          total_items: total,
          total_pages: Math.ceil(total / limit),
          data: results,
        });
      });
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
      success: false,
      details: error.message,
    });
  }
};

const deleteContact = (req, res) => {
  try {
    const sql = "DELETE FROM contact_details WHERE id = ?";
    DB.query(sql, [req.params.id], (err, result) => {
      if (err) {
        return res.status(500).json({
          error: "Internal server error",
          success: false,
          details: err.message,
        });
      }
      res.status(200).json({
        message: "Contact deleted successfully",
        status: 200,
        success: true,
      });
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
      success: false,
      details: error.message,
    });
  }
};

module.exports = {
  addContact,
  getContacts,
  deleteContact,
};
