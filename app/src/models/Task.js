const mongoose = require('mongoose');
const uuid4 = require('uuid4');

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
        type: [String],
    },
    skillsAwaited: {
        type: [String],
        
    },
    pendingProposals: {

    },
    accptedProposal: {

    },
    status: {

    },

})