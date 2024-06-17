import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";
import { Donations } from "../models/donations.model.js";
import mongoose from "mongoose";
import crypto from "crypto";
import { Server } from "http";


const otpStorage = new Map();

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
}

//code to generate new Password for forgoting passoword.
const generateNewPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }
    return password;
}


const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh token.");
    }
};



const registerUser = asyncHandler(async (req, res) => {
    const { email, name, dob, password, phoneno, nationality, address, gender } = req.body;

    if ([email, name, dob, password, phoneno, nationality, address, gender].some(field => !field?.trim())) {
        //throw new ApiError(400, "All fields are required.");
        return res.status(400).json(new ApiError(400, {}, "All fields are required."));
    }

    if(!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email)){
        return res.status(400).json(new ApiError(400, {}, "Invalid email address."));
    }

    if(!/^[0-9]{10}$/.test(phoneno)){
        return res.status(400).json(new ApiError(400, {}, "Invalid phone number."));
    }


    const existedUser = await User.findOne({
        $or: [{ phoneno }, { email }]
    });

    if (existedUser) {
        //throw new ApiError(403, "User with email or phone number already exists.");
        return res.status(403).json(new ApiError(403, {}, "User with email or phone number already exists."));
    }

    let avatarLocalPath;
    if (req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0) {
        avatarLocalPath = req.files.avatar[0].path;
    }

    const otp = generateOTP();
    if (!otp) {
        //throw new ApiError(401, "OTP not sent.")
        return res.status(401).json(new ApiError(401, {}, "OTP not sent."));
    }
    otpStorage.set(email, { otp, email, name, dob, password, phoneno, nationality, address, gender, avatarLocalPath, expiresAt: Date.now() + 15 * 60 * 1000 });

    await sendEmail(email, name, 'OTP Verification - Share and Care', otp);


    return res.status(200).json(new ApiResponse(200, {}, "OTP sent to your email address. Please verify."));
});

const verifyOtp = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        //throw new ApiError(400, "Email and OTP are required.");
        return res.status(400).json(new ApiError(400, {}, "Email and OTP are required."));
    }

    const storedData = otpStorage.get(email);

    if (!storedData) {
       // throw new ApiError(400, "OTP expired or invalid.");
         return res.status(400).json(new ApiError(400, {}, "OTP expired or invalid."));
    }

    if (storedData.otp !== otp) {
        //throw new ApiError(400, "Invalid OTP.");
        return res.status(400).json(new ApiError(400, {}, "Invalid OTP."));
    }

    const { name, dob, password, phoneno, nationality, address, gender, avatarLocalPath } = storedData;

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    let user;
    try {
        user = await User.create({
            dob,
            email,
            name,
            gender,
            phoneno,
            nationality,
            address,
            avatar: avatar?.url || "",
            password
        });
    } catch (error) {
        //throw new ApiError(503, "Something went wrong while registering the user.");
        console.log(error);
        return res.status(503).json(new ApiError(503, {}, "Something went wrong while registering the user."));
    }

    otpStorage.delete(email);

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        //throw new ApiError(503, "Something went wrong while registering the user.");
        return res.status(503).json(new ApiError(503, {}, "Something went wrong while registering the user."));
    }

    return res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully."));
});


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email) {
        throw new ApiError(401, "Username/email is required.")
    }

    const user = await User.findOne({ email })

    if (!user) {
        return res.status(404).json(new ApiError(404, {}, "User not found with this email."))
        // throw new ApiError(404, "User not found with this email.")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        return res.status(401).json(new ApiError(401, {}, "Invalid user credentials.Please try to login again with correct details."))
        //throw new ApiError(401, "Invalid user credentials.Please try to login again with correct details.")
    }


    const { accessToken, refreshToken } = await
        generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged In successfully."
            )
        )
})

const logoutUser = asyncHandler(async (req, res) => {
    User.findByIdAndUpdate(
        await req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )


    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(200, {}, "User loggesOut Successfully.")
        )
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken



    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorised request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET,
        )

        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "refresh token is expired or used.")
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(user._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed successfully."
                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token.")
    }

})


const changePassword = asyncHandler(async (req, res) => {
    const { newPassword } = req.body


    if (!newPassword) {
        throw new ApiError(401, "Please provide the new password.")
    }

    //find userID from cookie and change the password.
    const user=await User.findById(req.user._id)
    
    user.password=newPassword
    await user.save()

    return res
        .status(200)
        .json(
            new ApiResponse(200, "Password changed successfully.")
        )
})

const updateUserAvatar = asyncHandler(async (req, res) => {
    // const avatarLocalPath = req.file?.path
    let avatarLocalPath;
    if (req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0) {
        avatarLocalPath = req.files.avatar[0].path;
    }
    console.log(avatarLocalPath)
    if (!avatarLocalPath) {
        throw new ApiError(400, "Upload the file first.")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if (!avatar) {
        throw new ApiError(500, "Something went wrong while uploading the image.Please try again later.")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: avatar.url
            }
        },
        { new: true }
    ).select("-password")

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Avatar Image updated successfully."))

})


// Controller function to get donations by current user
const donationsDoneByUser = asyncHandler(async (req, res) => {
    //getting id from cookie.
    const userId = req.user._id;


    //if we didn't recieve data from cookie.
    if (!userId) {
        throw new ApiError(401, "No user found.")
    }


    // Aggregation pipeline to find donations by current user (donar)
    const donations = await Donations.aggregate([
        {
            $match: {
                donar: userId,
            }
        }
    ]);

    //if we didn't recieve details in doantions.
    if (!donations) {
        throw new ApiError(403, "Error while fetching donation details.")
    }


    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    "donations": donations,
                    "TotalCount": donations.length,
                },
                "Donations fetched successfully.")
        );
});

const volunteeringByUser = asyncHandler(async (req, res) => {
    //getting id from cookie.
    const userId = req.user._id;


    //if we didn't recieve data from cookie.
    if (!userId) {
        throw new ApiError(401, "No user found.")
    }

    // Aggregation pipeline to find donations by current user (donar)
    const volunteering = await Donations.aggregate([
        {
            $match: {
                volunteer: userId,
            }
        }
    ]);

    //if we didn't recieve details in doantions.
    if (!volunteering) {
        throw new ApiError(403, "Error while fetching volunteering details.")
    }


    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    "volunteering": volunteering,
                    "TotalCount": volunteering.length,
                },
                "volunteering fetched successfully.")
        );

})

const forgotPassword=asyncHandler(async(req,res)=>{
    //getting data from req.body

    const {email}=req.body
    if(!email){
        throw new ApiError(401,"Please provide the registered email address.")
    }

    //retrieve user with this email.
    const user= await User.findOne({email}).select("-refreshToken")

    if(!user){
        throw new ApiError(403,"No user registered with this email.")
    }


    //generating new password and sending it in mail and saving in it database as well.
    const newPassword = generateNewPassword();
    user.password=newPassword
    await user.save()
    await sendEmail(user,newPassword,'Here is your accoount credentials.',null,'forgot');

    return res
    .status(200)
    .json(
        new ApiResponse(200,"Password sent to mail.")
    )
})

const findUserById = asyncHandler(async (req, res) => {
    const {userId}  = req.body;
    const donar=await User.findById(userId).select("-password -refreshToken")

    return res.status(200).json(new ApiResponse(200, donar, "donar details found successfully."));
})


export {
    registerUser,
    verifyOtp,
    loginUser,
    generateAccessAndRefreshToken,
    logoutUser,
    refreshAccessToken,
    changePassword,
    updateUserAvatar,
    donationsDoneByUser,
    volunteeringByUser,
    forgotPassword,
    findUserById
};
