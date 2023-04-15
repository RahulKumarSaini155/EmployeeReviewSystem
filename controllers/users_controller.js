const User = require('../models/user');

module.exports.sign_in = (req, res) => {
    if (req.isAuthenticated()) {
        if (req.user.role === 'admin') {
          return res.redirect('/admin-dashboard');
        }
        // if user is not admin
        return res.redirect(`employee-dashboard/${req.user.id}`);
    }

    return res.render('sign_in', {
        title: "Sing In"
    });
}

module.exports.sign_up = (req, res) => {
    if (req.isAuthenticated()) {
        if (req.user.role === 'admin') {
          return res.redirect('/admin-dashboard');
        }
        return res.redirect(`employee-dashboard/${req.user.id}`);
      }

    return res.render('sign_up', {
        title: "Sing Up"
    });
}

// Get sign up data
module.exports.create = async (req, res) => {
    try {
        console.log(req.body);
      const { name, email, password, confirm_password, role } = req.body;
  
      // if password doesn't match
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


// sign in and create a session for the user
module.exports.create_section = function(req, res){
    // req.flash('success', 'Logged in successfully');
    if (req.user.role === 'admin') {
        return res.redirect('/admin-dashboard');
    }
    // if user is not admin it will redirect to employee page
    return res.redirect(`/employee-dashboard/${req.user.id}`);
}

module.exports.destroySession = function(req, res, next){
    req.logout(function(err) {
        if (err) { return next(err); }

        // req.flash('success', 'You have logged out!');

        return res.redirect('/users/sign-in');
      });
}
