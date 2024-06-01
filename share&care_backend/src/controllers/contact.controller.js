import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sendEmail } from "../utils/sendEmail.js";
import validator from "validator";

const contactUs = asyncHandler(async (req, res) => {
    const { name, email, phoneno } = req.body;

    if ([name, email, phoneno].some(field => !field?.trim())) {
        throw new ApiError(400, 'All fields are required.');
    }

    if(!validator.isEmail(email)){
        throw new ApiError(400,"Invalid email Address.")
    }

    // Handle the contact us form submission (e.g., save to database, notify admin, etc.)

    // Send thank you email
    await sendEmail(email,name, 'Thank You for Contacting Us', null, 'contact_us');

    return res.status(200).json(new ApiResponse(200, {}, 'Your message has been received.'));
});

export { contactUs }