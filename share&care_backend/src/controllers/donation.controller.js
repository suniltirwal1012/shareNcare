import { asyncHandler } from "../utils/asyncHandler.js";
import { Donations } from "../models/donations.model.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js";
import validator from "validator";

const saveDonations = asyncHandler(async (req, res) => {

    //finding user from cookie data.
    const user = await User.findById(req.user._id).select("-password -refreshToken")

    if (!user) {
        throw new ApiError(400, "Please log in first to donate.")
    }


    //destructuring form data
    const { foodType, foodTime, sourceType, quantity, address, date, time } = req.body


    //validating date type.
    if(!validator.isDate(date)){
        throw new ApiError(401,"Invalid date format.")
    }



    if ([foodType, foodTime, sourceType, quantity, address, date, time].some(field => !field?.trim())) {
        throw new ApiError(400, "All fields are required.");
    }


    const donations=await Donations.create({
        foodType, 
        foodTime, 
        sourceType, 
        quantity, 
        address, 
        date,
        donar:user, 
        time 
    })


    if(!donations){
        throw new ApiError(401,"Error while saving the donation details.")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,donations,"Donation detail saved successfully.")
    )
})

export { saveDonations }