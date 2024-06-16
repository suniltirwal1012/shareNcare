import mongoose, { Schema } from "mongoose";

const notifSchema = new Schema(
    {
        message:{
            type:String,
            required:true
        },
        isRead:{
            type:Boolean,
            default: false
        },
        recipient:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    },
    {
        timestamps: true
    }
)


export const Notifications = mongoose.model("Notifications", notifSchema)