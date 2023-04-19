const Review = require('../models/review');
const User = require('../models/user');

// render admin dashboard
module.exports.adminDashboard = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      if (req.user.role === 'admin') {
        // populate all users
        let users = await User.find({}).populate('name');

        // filter logged in user
        let otherUsers = users.filter((user) => user.email !== req.user.email);

        return res.render('admin_dashboard', {
          title: 'Admin Dashboard',
          users: otherUsers,
        });
      } else {
        return res.redirect('back');
      }
    } else {
      return res.redirect('/users/sign-in');
    }
  } catch (err) {
    console.log(err);
    return res.redirect('/users/sign-in');
  }
};

// Render employee dashboard
module.exports.employeeDashboard = async (req, res) => {
    try {
      if (req.isAuthenticated()) {
        // populate the employee with reviews assigned to it and reviews from others
        const employee = await User.findById(req.params.id)
          .populate({
            path: 'reviewsFromOthers',
            populate: {
              path: 'reviewer',
              model: 'User',
            }
          })
          .populate('assignedReviews');
  
        // extract the reviews assigned to it
        const assignedReviews = employee.assignedReviews;
  
        // extract feedbacks from other employees
        const reviewsFromOthers = employee.reviewsFromOthers;
  
        // populate reviews given from others
        const populatedResult = await Review.find().populate({
          path: 'reviewer',
          model: 'User',
        });
  
        return res.render('employee_dashboard', {
          title: 'Employee Dashboard',
          employee,
          assignedReviews,
          reviewsFromOthers,
        });
      } else {
        return res.redirect('/users/sign-in');
      }
    } catch (err) {
      console.log(err);
      return res.redirect('back');
    }
  };