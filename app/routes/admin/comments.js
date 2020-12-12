const express = require("express");
const router = express.Router();
const commentsController = require("../../controllers/admin/comments");
router.get("/", commentsController.index);
router.get("/approve/:commentId", commentsController.approve)
router.get("/reject/:commentId", commentsController.reject)
router.get("/delete/:commentId", commentsController.delete)



module.exports = router;
