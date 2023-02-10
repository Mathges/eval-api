const mongoose = require('mongoose');

const resetPasswordSchema = new mongoose.Schema({
    email: String,
    token: String,
    date: Date,
});

module.exports = mongoose.model('ResetPassword', resetPasswordSchema, 'resetPassword');
