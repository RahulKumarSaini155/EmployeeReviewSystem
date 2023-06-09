const User = require('../models/user');
const Review = require('../models/review');

module.exports.sign_in = (req, res) => {
    if (req.isAuthenticated()) {
        if (req.user.role === 'admin') {
          // user is admin
          return res.redirect('/admin-dashboard');
        }
        // if user is employee
        return res.redirect(`employee-dashboard/${req.user.id}`);
    }

    return res.render('sign_in', {
        title: "Sing In"
    });
}

module.exports.sign_up = (req, res) => {
    if (req.isAuthenticated()) {
        if (req.user.role === 'admin') {
          // user is admin
          return res.redirect('/admin-dashboard');
        }
        // if user is employee
        return res.redirect(`employee-dashboard/${req.user.id}`);
      }

    return res.render('sign_up', {
        title: "Sing Up"
    });
}

// add employee
module.exports.addEmployee = (req, res) => {
  if (req.isAuthenticated()) {
    if (req.user.role === 'admin') {
      return res.render('add_employee', {
        title: 'Add Employee ',
      });
    }
  }
  return res.redirect('/');
};

// getting sign up data
module.exports.create = async (req, res) => {
    try {
        console.log(req.body);
      const { name, email, password, confirm_password, role } = req.body;
  
      // if password does not match
      if (password != confirm_password) {
        // req.flash('error', 'Password and Confirm password are not same');
        console.log('Enter incorrect details');
        return res.redirect('back');
      }
  
      // check if user already exist
      User.findOne({ email }, async (err, user) => {
        if (err) {
          console.log('Error in finding user in signing up');
          return;
        }
  
        // if user not found in user database create
        if (!user) {
          await User.create(
            {
              email,
              password,
              name,
              role,
            },
            (err, user) => {
              if (err) {
                // req.flash('error', "Couldn't sign Up");
                console.log("error in sign up");
                return res.redirect('back');
              }
            //   req.flash('success', 'Account created!');
            console.log("success in Sign up");
              return res.redirect('/users/sign-in');
            }
          );
        } else {
        //   req.flash('error', 'User already registed!');
        console.log('error : user already registered');
          return res.redirect('back');
        }
      });
    } catch (err) {
      console.log('error', err);
      return res.redirect('back');
    }
};


// edit employee
module.exports.editEmployee = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      if (req.user.role === 'admin') {
        // populate employee with all the reviews (feedback) given by other users
        const employee = await User.findById(req.params.id).populate({
          path: 'reviewsFromOthers',
          populate: {
            path: 'reviewer',
            model: 'User',
          },
        });
        
        // extracting reviews given by others from employee variable
        const reviewsFromOthers = employee.reviewsFromOthers;

        return res.render('edit_employee', {
          title: 'Edit Employee',
          employee,
          reviewsFromOthers,
        });
      }
    }
    return res.redirect('/');
  } catch (err) {
    console.log('error', err);
    return res.redirect('back');
  }
};


// update employee details
module.exports.updateEmployee = async (req, res) => {
  try {
    const employee = await User.findById(req.params.id);

    const { name, role } = req.body;

    if (!employee) {
      req.flash('error', 'employee does not exist!');
      return res.redirect('back');
    }

    // update data coming from req.body
    employee.name = name;
    employee.role = role;
    employee.save();

    req.flash('success', 'Employee details updated!');
    return res.redirect('back');
  } catch (err) {
    console.log('error', err);
    return res.redirect('back');
  }
};

// add an employee
module.exports.createEmployee = async (req, res) => {
  try {
    const { name, email, password, confirm_password } = req.body;

    // if password doesn't match
    if (password != confirm_password) {
      req.flash('error', 'Password and Confirm password are not same');
      return res.redirect('back');
    }

    // check if user already exist
    User.findOne({ email }, async (err, user) => {
      if (err) {
        console.log('Error in finding user in signing up');
        return;
      }

      // if user not found in database than create user
      if (!user) {
        await User.create(
          {
            email,
            password,
            name,
          },
          (err, user) => {
            if (err) {
              req.flash('error', "Couldn't add employee");
            }
            req.flash('success', 'Employee added!');
            return res.redirect('/');
          }
        );
      } else {
        req.flash('error', 'Employee already registered!');
        return res.redirect('back');
      }
    });
  } catch (err) {
    console.log('error', err);
    return res.redirect('back');
  }
};


// sign in and create a session for the user
module.exports.create_section = function(req, res){
    req.flash('success', 'Logged in successfully');
    if (req.user.role === 'admin') {
        return res.redirect('/admin-dashboard');
    }
    // if user is not admin it will redirect to employee page
    return res.redirect(`/employee-dashboard/${req.user.id}`);
}


// Delete an user
module.exports.destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    // delete all the reviews in which this user is a recipient
    await Review.deleteMany({ recipient: id });

    // delete all the reviews in which this user is a reviewer
    await Review.deleteMany({ reviewer: id });

    // delete this user
    await User.findByIdAndDelete(id);

    req.flash('success', `User and associated reviews deleted!`);
    return res.redirect('back');
  } catch (err) {
    console.log('error', err);
    return res.redirect('back');
  }
};

module.exports.destroySession = function(req, res, next){
    req.logout(function(err) {
        if (err) { return next(err); }

        req.flash('success', 'You have logged out!');

        return res.redirect('/users/sign-in');
      });
}
