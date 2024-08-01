import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullname: {
        type: String, // uppercase 'String' S
        required: true
    },
    username: {
        type: String, // uppercase 'String'
        required: true,
        unique: true
    },
    password: {
        type: String, // uppercase 'String' S
        required: true,
        minlength: 6
    },
    gender: {
        type: String, // uppercase 'String'
        required: true,
        enum: ['male', 'female']
    },
    profilePic: {
        type: String,
        default: ""
    }
}, { timestamps: true });

// User becomes Users by mongoose itself inside model()
const User = mongoose.model('User', userSchema);

export default User;
// mongoose apne app ek user _id bana dega
// timestamp is used to tell user member since