const express = require("express");
const router = express.Router();
const refreshTokenController = require("../controllers/refreshTokenController");
const authJwt = require("../middlewares/authJwt");

router.get(
  "/",
  refreshTokenController.handleRefreshToken
);

module.exports = router;
