const express = require("express");
const router = express.Router();
const { createFaq, getFaq, getFaqById, deleteFaq, updateFaq } = require("../controllers/FaqController");

router.post("/createfaq", createFaq);
router.get("/getallfaq", getFaq);
router.get("/getfaq/:id", getFaqById);
router.delete("/deletefaq/:id", deleteFaq);
router.put("/updatefaq/:id", updateFaq);

module.exports = router;