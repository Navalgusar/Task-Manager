const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name: String,

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        selected: false,
    },

    role: {
        type: String,
        enum: ['user', 'admin', 'manager'],
        default: 'user'
    },

    createOn: {
        type: Date,
        default: Date.now
    }
});


UserSchema.pre('save', function() {
    if(!this.isModified('password')) return;
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
    return;
})

UserSchema.methods.isValidPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

UserSchema.methods.createToken = function() {
    return jwt.sign({id: this._id}, 'JWT')
}


const UserModel = mongoose.model('User', UserSchema);


module.exports = UserModel;