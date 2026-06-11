const DB = require("../db/dbConnection");
const { v4: uuidv4 } = require("uuid");

const createFaq = (req, res) => {
  try {
    const { title, description } = req.body;
    const faqId = uuidv4();

    DB.query(
      "INSERT INTO faq (id, title, description) VALUES (?, ?, ?)",
      [faqId, title, description],
      (err, result) => {
        if (err)
          return res.status(500).json({
            error: "Internal Server Error",
            success: false,
            details: err.message,
          });
        res.json({
          message: "FAQ added successfully",
          success: true,
          faq: { id: faqId, title, description },
        });
      },
    );
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      success: false,
      details: error.message,
    });
  }
};
const getFaq = (req, res) => {
  try {
    DB.query("SELECT * FROM faq", (err, results) => {
      if (err)
        return res.status(500).json({
          error: "Internal Server Error",
          success: false,
          details: err.message,
        });
      res.json({ faqs: results, success: true });
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      success: false,
      details: error.message,
    });
  }
};
const getFaqAll = (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;       // default 1
    let limit = parseInt(req.query.limit) || 10;    // default 10
    let offset = (page - 1) * limit;

    // 1. Get total count
    const countQuery = "SELECT COUNT(*) AS total FROM faq";

    DB.query(countQuery, (countErr, countResult) => {
      if (countErr) {
        return res.status(500).json({
          error: "Internal Server Error",
          success: false,
          details: countErr.message,
        });
      }

      const totalFaq = countResult[0].total;
      const totalPages = Math.ceil(totalFaq / limit);

      // 2. Get paginated data
      const dataQuery = "SELECT * FROM faq LIMIT ? OFFSET ?";

      DB.query(dataQuery, [limit, offset], (err, results) => {
        if (err) {
          return res.status(500).json({
            error: "Internal Server Error",
            success: false,
            details: err.message,
          });
        }

        res.json({
          success: true,
          currentPage: page,
          totalPages,
          totalFaq,
          limit,
          faqs: results,
        });
      });
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      success: false,
      details: error.message,
    });
  }
};
const getFaqById = (req, res) => {
  try {
    const faqId = req.params.id;
    DB.query("SELECT * FROM faq WHERE id = ?", [faqId], (err, results) => {
      if (err)
        return res.status(500).json({
          error: "Internal Server Error",
          success: false,
          details: err.message,
        });
      if (!results.length)
        return res.status(404).json({
          error: "FAQ not found",
          success: false,
        });
      res.json({ faq: results[0], success: true });
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      success: false,
      details: error.message,
    });
  }
};
const deleteFaq = (req, res) => {
  try {
    const faqId = req.params.id;
    DB.query("DELETE FROM faq WHERE id = ?", [faqId], (err, result) => {
      if (err)
        return res.status(500).json({
          error: "Internal Server Error",
          success: false,
          details: err.message,
        });
      if (result.affectedRows === 0)
        return res.status(404).json({
          error: "FAQ not found",
          success: false,
        });
      res.json({
        message: "FAQ deleted successfully",
        success: true,
        faqId: faqId,
      });
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      success: false,
      details: error.message,
    });
  }
};
const updateFaq = (req, res) => {
  try {
    const faqId = req.params.id;
    const { title, description } = req.body;
    DB.query("UPDATE faq SET title = ?, description = ? WHERE id = ?", [title, description, faqId], (err, result) => {
      if (err)
        return res.status(500).json({
            error: "Internal Server Error",
            success: false,
            details: err.message,
        });
        if (result.affectedRows === 0)
        return res.status(404).json({
          error: "FAQ not found",
          success: false,
        });
        res.json({
            message: "FAQ updated successfully",
            success: true,
            faq: { id: faqId, title, description },
        });
    });
 
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      success: false,
      details: error.message,
    });
  }
};

module.exports = {
  createFaq,
  getFaq,
  getFaqById,
  deleteFaq,
  updateFaq
};
