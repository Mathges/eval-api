const mongoose = require('mongoose');
const uuid4 = require('uuid4');
const Profession = require('./Profession');

function arrayLimit(val) {
    return val.length <= 3;
}

const taskSchema = new mongoose.Schema({
    id: {
        type: String,
        maxLength: 36
    },
    startDate: {
        type: Date,
        required: true,
        min: () => Date.now()
    },
    endDate: {
        type: Date,
        required: true
    },
    salary: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    professionAwaited: {
        type: String,
        ref: 'Profession'
    },
    skillsAwaited: {
        type: [String],
    },
    pendingProposals: {
        type: [String],
        validate: [arrayLimit, '{PATH} exceeds the limit of 3'],
        default: null
    },
    acceptedProposal: {
        type: String,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['FINISHED', 'ACCEPTED', 'PENDING PROPOSALS', 'PUBLISHED', 'NOT PUBLISHED'],
        default: 'NOT PUBLISHED'
    },
    contact: {
        type: String,
    }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});

taskSchema.virtual('pendingUsers', {
    ref: 'User',
    localField: 'pendingProposals',
    foreignField: 'id',
});

taskSchema.virtual('acceptedBy', {
    ref: 'User',
    localField: 'acceptedProposal',
    foreignField: 'id',
});

taskSchema.virtual('professionDetails', {
    ref: 'Profession',
    localField: 'professionAwaited',
    foreignField: 'id',
});

taskSchema.virtual('skillName', {
    ref: 'Skill',
    localField: 'skillAwaited',
    foreignField: 'id',
});

taskSchema.pre('save', function(next) {

    if(!this.id) {
        this.id = uuid4()
    }
    next()
});

module.exports = mongoose.model('Task', taskSchema, 'tasks');
