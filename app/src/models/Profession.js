const mongoose = require('mongoose');
const uuid4 = require('uuid4');

const professionSchema = new mongoose.Schema({
    id: String,
    name: String
});

userSchema.pre('save', function(next) {
    if(!this.id) {
        this.id = uuid4()
    }

    next()
});

module.exports = mongoose.model('Profession', professionSchema, 'professions');