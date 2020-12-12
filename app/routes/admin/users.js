const { Router } = require("express");
const express = require("express");
const router = express.Router();
const userController = require("../../controllers/admin/users");
router.get("/", userController.index);
router.get("/create", userController.create);
router.post("/store", userController.store);
router.get("/delete/:userId", userController.remove);
router.get("/edit/:userId", userController.edit);
router.post("/update/:userId", userController.update);


module.exports = router;
