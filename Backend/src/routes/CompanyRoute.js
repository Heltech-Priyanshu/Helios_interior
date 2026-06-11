const express = require("express");
const router = express.Router();
const {
  createCompany,
  getCompanies,
  //   getCompanyById,
  updateCompany,
  //   deleteCompany,
} = require("../controllers/CompanyController");

const Authentication = require("../middleware/AuthMiddleware");

const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mediaDir = path.join(__dirname, "../public/media/company");

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
  },
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
    fileSize: 1 * 1024 * 1024,
  },
});

router.get("/getcompany", getCompanies);


// router.get("/:id", getCompanyById);

router.post("/createcompany",
  upload.fields([
    { name: "company_logo" }, 
    { name: "company_favicon" }
  ]),
  createCompany,
);

router.put("/updatecompany/:id",
  upload.fields([
    { name: "company_logo", maxCount: 1 },
    { name: "company_favicon", maxCount: 1 },
  ]),
  updateCompany,
);

// router.delete("/:id", deleteCompany);

module.exports = router;
