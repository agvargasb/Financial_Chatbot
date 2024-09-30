const express = require('express');
const router = express.Router();
const { activateAcc } = require('../../controllers/activate.controller');

router.post('/', activateAcc);

module.exports = router;