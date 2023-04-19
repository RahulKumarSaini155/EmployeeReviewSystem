const express = require("express");
const router = express.Router();

router.use('/users', require('./users'));
router.use('/', require('./users'));
router.use('/review', require('./reviews'));


module.exports = router;