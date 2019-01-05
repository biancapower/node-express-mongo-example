const mongoose = require('mongoose');

// user schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: Number
});

const User = module.exports = mongoose.model('User', userSchema);