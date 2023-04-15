const User = require('../models/user');

module.exports.sign_in = (req, res) => {
    return res.render('sign_in', {
        title: "Sing In"
    });
}

module.exports.sign_up = (req, res) => {
    return res.render('sign_up', {
        title: "Sing Up"
    });
}