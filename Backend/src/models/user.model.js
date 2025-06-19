import mongoose, { Schema } from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    avatar: {
        type: String, // cloudinary URL

        required: true,
    },
    coverImage: {
        type: String, // cloudinary URL
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video",
        }
    ],
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    refreshToken: {
        type: String,
        default: null,
    },
},{timestamps: true});

export const User = mongoose.model("User", userSchema);