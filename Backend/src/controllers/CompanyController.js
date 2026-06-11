
const DB = require("../db/dbConnection");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const createCompany = (req, res) => {
  try {
    const {
      company_name,
      email,
      phone,
      address,
      office_hour_time,
      office_day,
      copy_right,
    } = req.body;

    const id = uuidv4();

    const company_logo = req.files?.company_logo?.[0]
      ? `/public/media/company/${req.files.company_logo[0].filename}`
      : null;
    const company_favicon = req.files?.company_favicon?.[0]
      ? `/public/media/company/${req.files.company_favicon[0].filename}`
      : null;

    console.log("📥 Received Company Create:", {
      company_logo,
      company_favicon,
      body: req.body,
      files: req.files,
    });

    // SQL check if company already exists
    const checkQuery = "SELECT * FROM company_details";
    DB.query(checkQuery, (err, results) => {
      if (err)
        return res.status(500).json({ success: false, error: err.message });

      if (results.length > 0)
        return res
          .status(409)
          .json({ success: false, error: "Company Already Exists" });

      const insertQuery = `
        INSERT INTO company_details
        (id, company_name, email, phone, address, office_hour_time, office_day, logo, fav_icon, copy_right)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        id,
        company_name,
        email,
        phone,
        address,
        office_hour_time,
        office_day,
        company_logo,
        company_favicon,
        copy_right,
      ];

      DB.query(insertQuery, values, (error) => {
        if (error)
          return res.status(500).json({ success: false, error: error.message });

        res.status(201).json({
          success: true,
          message: "Company Created Successfully",
          company: {
            id,
            company_name,
            email,
            phone,
            address,
            office_hour_time,
            office_day,
            logo: company_logo,
            fav_icon: company_favicon,
            copy_right,
          },
        });
      });
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getCompanies = (req, res) => {
  try {
    DB.query("SELECT * FROM company_details", (err, results) => {
      if (err)
        return res.status(500).json({
          error: "Internal Server Error",
          success: false,
          details: err.message,
        });
      res.json({ company: results[0], success: true ,message: "Company Details Fetched Successfully"});
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      success: false,
      details: error.message,
    });
  }
};

// const getCompanyById = (req, res) => {
//   try {
//     const { id } = req.params;
//     if (!id)
//       return res
//         .status(400)
//         .json({ error: "Company ID is required", success: false });

//     DB.query(
//       "SELECT * FROM company_details WHERE id = ?",
//       [id],
//       (err, results) => {
//         if (err)
//           return res.status(500).json({
//             error: "Internal Server Error",
//             success: false,
//             details: err.message,
//           });
//         if (!results.length)
//           return res
//             .status(404)
//             .json({ error: "Company not found", success: false });
//         res.json({
//           company: results[0],
//           success: true,
//           message: "Company Details Fetched Successfully",
//         });
//       },
//     );
//   } catch (error) {
//     res.status(500).json({
//       error: "Internal Server Error",
//       success: false,
//       details: error.message,
//     });
//   }
// };

const updateCompany = (req, res) => {
  const { id } = req.params;
  const {
    company_name,
    email,
    phone,
    address,
    office_hour_time,
    office_day,
    copy_right,
  } = req.body;

  // 1️⃣ Get old data first
  DB.query("SELECT * FROM company_details WHERE id = ?", [id], (err, results) => {
    if (err)
      return res.status(500).json({
        error: "Internal Server Error",
        success: false,
        details: err.message,
      });

    if (!results.length)
      return res.status(404).json({ error: "Company not found", success: false });

    const oldData = results[0];

    // 2️⃣ New uploaded files
    const newLogo = req.files?.company_logo?.[0]
      ? `/public/media/company/${req.files.company_logo[0].filename}`
      : null;

    const newFavicon = req.files?.company_favicon?.[0]
      ? `/public/media/company/${req.files.company_favicon[0].filename}`
      : null;

    // 3️⃣ If no new upload → keep old file
    const finalLogo = newLogo || oldData.logo;          // CHANGE COLUMN NAME
    const finalFav = newFavicon || oldData.fav_icon;     // CHANGE COLUMN NAME

    // 4️⃣ Update query
    const sql = `
      UPDATE company_details 
      SET 
        company_name = ?, 
        email = ?, 
        phone = ?, 
        address = ?, 
        office_hour_time = ?, 
        office_day = ?, 
        copy_right = ?, 
        logo = ?, 
        fav_icon = ?
      WHERE id = ?
    `;

    const values = [
      company_name,
      email,
      phone,
      address,
      office_hour_time,
      office_day,
      copy_right,
      finalLogo,
      finalFav,
      id,
    ];

    DB.query(sql, values, (updateErr) => {
      if (updateErr)
        return res.status(500).json({
          error: "Internal Server Error",
          success: false,
          details: updateErr.message,
        });

      // 5️⃣ Delete old files only if new uploaded
      if (newLogo && oldData.logo) {
        const oldLogoPath = path.join(__dirname, "..", oldData.logo);
        fs.unlink(oldLogoPath, (err) => {});
      }

      if (newFavicon && oldData.favicon) {
        const oldFavPath = path.join(__dirname, "..", oldData.favicon);
        fs.unlink(oldFavPath, (err) => {});
      }

      res.json({
        message: "Company Updated Successfully",
        success: true,
        company: {
          id,
          company_name,
          email,
          phone,
          address,
          office_hour_time,
          office_day,
          copy_right,
          logo: finalLogo,
          favicon: finalFav,
        },
      });
    });
  });
};


// const deleteCompany = (req, res) => {
//   try {
//     const { id } = req.params;
//     if (!id)
//       return res
//         .status(400)
//         .json({ error: "Company ID is required", success: false });
//     DB.query(
//       "DELETE FROM company_details WHERE id = ?",
//       [id],
//       (err, result) => {
//         if (err)
//           return res.status(500).json({
//             error: "Internal Server Error",
//             success: false,
//             details: err.message,
//           });
//         if (result.affectedRows === 0)
//           return res
//             .status(404)
//             .json({ error: "Company not found", success: false });
//         res.json({ message: "Company deleted", success: true });
//       },
//     );
//   } catch (error) {
//     res.status(500).json({
//       error: "Internal Server Error",
//       success: false,
//       details: error.message,
//     });
//   }
// };

module.exports = {
  createCompany,
  getCompanies,
  //   getCompanyById,
  updateCompany,
  //   deleteCompany,
};
