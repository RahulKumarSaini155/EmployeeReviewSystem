const express = require("express");
const router = express.Router();

const sign_inController = require('../controllers/sign_in_controller');
const sign_upController = require('../controllers/sign_upController');

router.get('/sign-in', sign_inController.sign_in);
router.get('/sign-up', sign_upController.sign_up);

module.exports = router;