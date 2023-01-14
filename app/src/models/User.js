const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        maxLength: 36
    },
    lastName: {
        type: String,
        required: true,
        minLength: 2,
        lowercase: true,
    },
    firstName: {
        type: String,
        required: true,
        minLength: 2,
        lowercase: true,
    },
    address: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true,
        // TODO: put in joi when register
        validate: function(value) {
            return /\b\d{5}\b/g.test(value);
        }
    },
    phoneNumber: {
        type: String,
        required: true,
        // TODO: put in joi when register
        validate: function(value) {
            return /^((\+)33|0|0033)[1-9](\d{2}){4}$/g.test(value);
        }
    },
    email: {
        type: String,
        required: true, 
        unique: true      
    },
    password: {
        type: String,
        required: true,
        // maxLength 60 because bcrypt return hashes of 60 chars
        maxLength: 60,
        // TODO: put in joi when register
        validate: function(value) {
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/g.test(value);
        }
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
});

module.exports = mongoose.model('User', userSchema, 'users');