const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    }
    ,
    emailId: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        min: 6,
        required:true

    }
    ,
    profilePicture: {
        type: String,
        default: "",
    }
    ,
    covePicture: {
        type: String,
        default: "",
    }
    ,
    followers: {
        type: Array,
        default: [],
    }
    ,
    following: {
        type: Array,
        default: [],
    }
    ,
    isAdmin: {
        type: Boolean,
        default: false,
    }

}, { timestamps: true })
const User = mongoose.model('User', userSchema)
module.exports = User