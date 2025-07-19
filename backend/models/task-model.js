const mongoose = require('mongoose');

const TaskShema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        default: ""
    },

    assignBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    assignTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    status: {
        type: String,
        enum: ['pending', 'complite'],
        default: 'pending'
    },

    createOn: {
        type: Date,
        default: Date.now
    }
});



const TaskModel = mongoose.model('Task', TaskShema);

module.exports = TaskModel


