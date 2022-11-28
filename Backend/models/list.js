const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    text: { 
        type: String,
        required: true,
    },
    undo: { 
        type: Boolean,
        required: true
    }
});

module.exports =  mongoose.model("list", listSchema);
