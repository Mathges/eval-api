const mongoose = require('mongoose');
const uuid4 = require('uuid4');

const professionSchema = new mongoose.Schema({
    id: String,
    name: String,
    linkedSkills: [String]
});

professionSchema.pre('save', function(next) {
    if(!this.id) {
        this.id = uuid4()
    }
    next()
});

professionSchema.virtual('linkedSkillsNames', {
    ref: 'Skill',
    localField: 'linkedSkills',
    foreignField: 'id',
});

module.exports = mongoose.model('Profession', professionSchema, 'professions');
