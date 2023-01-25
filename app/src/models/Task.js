const mongoose = require('mongoose');
const uuid4 = require('uuid4');

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
        //TODO: change by profession type later
        type: String,
    },
    skillsAwaited: {
        //TODO: change by skills type
        type: [String],
    },
    pendingProposals: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        validate: [arrayLimit, '{PATH} exceeds the limit of 3'],
        default: null
    },
    acceptedProposal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['ACCEPTED', 'PENDING PROPOSALS', 'PUBLISHED', 'NOT PUBLISHED'],
        default: 'NOT PUBLISHED'
    },
    contact: {
        type: String,
    }
});

taskSchema.pre('save', function(next) {

    if(!this.id) {
        this.id = uuid4()
    }
    next()
});

module.exports = mongoose.model('Task', taskSchema, 'tasks');