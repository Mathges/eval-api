const mongoose = require('mongoose');
const uuid4 = require('uuid4');

const skillSchema = new mongoose.Schema({
    id: String,
    name: String
});

skillSchema.pre('save', function(next) {
    if(!this.id) {
        this.id = uuid4();
    }
    next();
});

module.exports = mongoose.model('Skill', skillSchema, 'skills');