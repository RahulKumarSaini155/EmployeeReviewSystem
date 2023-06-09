const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    // designation chosen admin or employee
    role: {
        type: String,
        enum: ['employee', 'admin'],
        default: 'employee',
        required: true,
    },
    assignedReviews: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
    ],
    reviewsFromOthers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Review',
        },
    ]
}, {
    timestamps: true
});

// create collection
const User = mongoose.model('User', userSchema);

module.exports = User;