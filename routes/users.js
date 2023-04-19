const express = require("express");
const router = express.Router();
const passport = require("passport");

const usersController = require('../controllers/users_controller');
const dashboardsController = require('../controllers/dashboard_controller');


router.get('/', usersController.sign_in);
router.get('/sign-in', usersController.sign_in);
router.get('/sign-up', usersController.sign_up);

router.post('/create', usersController.create);
router.get('/admin-dashboard', dashboardsController.adminDashboard);

router.get('/employee-dashboard/:id', dashboardsController.employeeDashboard);
router.get('/edit-employee/:id', usersController.editEmployee);
router.post('/update-employee/:id', usersController.updateEmployee);
router.post('/create-employee', usersController.createEmployee);
router.get('/addEmployee', usersController.addEmployee);

router.get('/sign-out', usersController.destroySession);

router.get('/destroy/:id', usersController.destroy);

// use passport as a middleware to authenticate
router.post('/create_session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
), usersController.create_section);

module.exports = router;