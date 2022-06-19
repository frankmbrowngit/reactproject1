const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minLength: [4, "Minimum is 4 characters"],
        maxLength: [32, "Maximum is 32 characters"],
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: "Email is required",
        minLength: [4, "Minimum is 4 characters"],
        maxLength: [32, "Maximum is 32 characters"],
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please fill in valid email address",
        ]
    },
    password: {
        type: String,
        required: true,
        minLength: [4, "Minimum is 4 characters"],
        maxLength: [32, "Maximum is 32 characters"],
    },
});
// Executes when you wan to save your data
userSchema.pre('save', function(next) {
    const user = this;
    bcrypt.genSalt(10, function(err,salt) {
        bcrypt.hash(user.password, salt, (err,hash) => {
            user.password = hash;
            next();
        })
    })
})
userSchema.methods.hasSamePassword = function(providedPassword) {
    return bcrypt.compareSync(providedPassword, this.password); // returns true or false
}

userSchema.statics.sendError = function (res, config) {
    const { status, detail } = config;
    return res
        .status(status)
        .send({ errors: [{ title: "User Error!", detail }] });
};
module.exports = mongoose.model("User", userSchema); // mongodb looks for users
