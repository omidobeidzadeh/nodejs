const { Router } = require("express");
const express = require("express");
const router = express.Router();
const settingController = require("../../controllers/admin/settings");
router.get("/", settingController.index);
router.post("/", settingController.store);



module.exports = router;
