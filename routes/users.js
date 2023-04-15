const express = require("express");
const router = express.Router();
const passport = require("passport");

const usersController = require('../controllers/users_controller');

// router.get('/profile/:id', passport.checkAuthentication, usersController.profile);

router.get('/sign-in', usersController.sign_in);
router.get('/sign-up', usersController.sign_up);

router.post('/create', usersController.create);

// use passport as a middleware to authenticate
router.post('/create_session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
), usersController.create_section);

module.exports = router;