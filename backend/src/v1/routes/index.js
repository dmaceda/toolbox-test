const express = require("express");
const router = express.Router();
const dataController = require("../../controllers/dataController");

router
  .get("/files/data", dataController.getFormattedFiles)
  .get("/files/list", dataController.getOriginalFiles);

module.exports = router;
