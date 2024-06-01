import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const donationsSchema=new Schema(
    {
        foodType:{
            type:String,
            requried:true
        },
        foodTime:{
            type:String,
            requried:true
        },
        sourceType:{
            type:String,
            requried:true
        },
        quantity:{
            type:Number,
            requried:true
        },
        address:{
            type:String,
            requried:false
        },
        date: {
            type: Date,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        isDonated:{
            type:Boolean,
            default:false
        },
        donar:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        volunteer:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    },
    {
        timestamps: true
    }
)


donationsSchema.index(
    { foodType: 1, foodTime: 1, sourceType: 1, donar: 1, date: 1, time: 1, address: 1 },
    { unique: true }
);

donationsSchema.plugin(mongooseAggregatePaginate)

export const Donations=mongoose.model("Donations",donationsSchema)