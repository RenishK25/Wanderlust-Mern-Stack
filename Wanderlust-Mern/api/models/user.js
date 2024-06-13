const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
const ExpressError = require("../utils/ExpressError");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email : {
        type : String,
        required : true
    },
    refreshToken: {
        type: String
    }
});

userSchema.plugin(passportLocalMongoose);

userSchema.methods.generateAccessToken = function(){
    try {
        return jwt.sign(
            {
                _id: this._id
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        )
    } catch (error) {
        console.error("Error generating access token:", error);
        throw new ExpressError("Error generating access token");
    }
}

userSchema.methods.generateRefreshToken = function(){
    try {
        return jwt.sign(
            {
                _id: this._id,
                
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            }
        )
    } catch (error) {
        console.error("Error generating refresh token:", error);
        throw new ExpressError("Error generating refresh token");
    }
}

module.exports = mongoose.model("User", userSchema);