const { Router } = require("express");
const express = require("express");
const router = express.Router();
const postController = require("../../controllers/admin/posts");
router.get("/", postController.index);
router.get("/create", postController.create);
router.post("/store", postController.store);
router.get("/delete/:postId", postController.remove);
router.get("/edit/:postId", postController.edit);
router.post("/update/:postId", postController.update);


module.exports = router;
