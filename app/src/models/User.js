const mongoose = require('mongoose');
const uuid4 = require('uuid4');

const freelance = new mongoose.Schema({
    dailyTax: Number,
    experienceYears: Number,
    professions: [String],
    skills: [String],
    currentTasks: [String]
});

const company = new mongoose.Schema({
    socialReason: String,
    status: String,
    siret: String,
    headOffice: String
});

const userSchema = mongoose.Schema({
    id: {
        type: String,
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
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
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
    },
    isAdmin: {
        type: Boolean,
    },
    confirmation_token: {
        type: String,
    },
    active: {
        type: Boolean,
    },
    freelance: {
        type: freelance,
        default: null,
    },
    company: {
        type: company,
        default: null,
    }
});

// setting id and default values
userSchema.pre('save', function(next) {
    if(!this.id) {
        this.id = uuid4()
    }

    if(!this.isAdmin) {
        this.isAdmin = false
    }

    if(!this.active) {
        this.active = false
    }
    next()
});


module.exports = mongoose.model('User', userSchema, 'users');