const express = require("express");
const router = express.Router();
const { addContact,getContacts,deleteContact} = require("../controllers/ContactController");
const Authentication = require("../middleware/AuthMiddleware");

router.post("/createcontact", addContact);
router.get("/getallcontact", getContacts);
router.delete("/deletecontact/:id", deleteContact);

module.exports = router;