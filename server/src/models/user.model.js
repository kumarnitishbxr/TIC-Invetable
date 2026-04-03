import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    contact: {
        type: Number,
        required: true,
        minLength: [10, "phone number must be 10 digits long"],
        unique: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "password must be 6 digits long"]
    },
    aadhar: {
        type: Number,
        minLength: [12, "aadhar must be 12 digits long"]
    },
    role: {
        type: String,
        enum: ['employee', 'employer', 'mediator', 'admin'],
        default: 'employee',
        required: true
    },
    skills: {
        type: [String],
        default: []
    },
    verified: {
        type: Boolean,
        default: false
    },
    rating:{
        type: Number,
        default: [0, "rating must be between 0 to 10"]
    },
    ratingCount: {
        type: Number,
        default: 0
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            default: [0,0]
        }
    },
    activeCases: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

userSchema.index({location: "2dsphere"});

const User = mongoose.model('User', userSchema);

export default User;