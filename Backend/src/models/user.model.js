import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
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
    },
    {
        timestamps: true
    }
);

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { 
            iid: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname, 
        }, 
        process.env.ACCESS_TOKEN_SECRET, 
        {   
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1h" 
        }
    );
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { 
            iid: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname, 
        }, 
        process.env.REFRESH_TOKEN_SECRET, 
        {   
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "1h" 
        }
    );
}

export const User = mongoose.model("User", userSchema);