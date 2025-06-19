import mongoose, { Schema } from "mongoose";

const videoSchema = new mongoose.Schema(
    {
        videoFile: {
            type: String, // cloudinary URL 
            required: true,
        },
        thumbnail: {
            type: String, // cloudinary URL
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        description: {
            type: String,
            required: true,
        }, 
        duration: {
            type: Number, // in seconds
            required: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        isPublished: {
            type: Boolean,
            default: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User", // Reference to User model
            required: true,
        }

    },
    {
        timestamps: true
    }
)

export const Video = mongoose.model("Video", videoSchema);