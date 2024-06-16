import { asyncHandler } from "../utils/asyncHandler.js";
import { Donations } from "../models/donations.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js"
import { sendEmail } from "../utils/sendEmail.js";
import { Notifications } from "../models/notifications.model.js";



const volunteeringOpportunities = asyncHandler(async (req, res) => {
    
        const donations = await Donations.find({ isDonated: false });

        if (!donations || donations.length === 0) {
            throw new ApiError(401,"No volunteering opportunities are present now.")
        }

        return res
        .status(200)
        .json(
            new ApiResponse(200, donations, "Donations fetched successfully.")
        );
});


const acceptVolunteeringOpportunity=asyncHandler(async(req,res)=>{
    //find user
    //donationId from donation detail
   //add volunteer in the Donation 
    //Isdonated -> true 



    const user=await User.findById(req.user._id).select("-password -refreshToken")
    if(!user){
        throw new ApiError(401,"User not loggedIn.")
    }

    const {donationId} = req.body
    if(!donationId){
        throw new ApiError(402,"No donations detail found with this with button.")
    }

    const value=await Donations.findById(donationId)
    if(value.isDonated){
        throw new ApiError(401,"Already donated.")
    }


    const donation=await Donations.findByIdAndUpdate(
        donationId,
        {
            $set:{
                isDonated: true,
                volunteer: user     
             }
        },
        {
            new: true
        }
    )

    if(!donation){
        throw new ApiError(401,"Incorrect donation ID passed in the accept button.")
    }


    //retrieving id of donar
    const user2=await User.findById(donation.donar)

    await sendEmail(user,donation, 'Thank You '+user.name+ ' for volunteering the donation', null, 'volunteer');
    
    //adding notification to the database;
    let notif;
    try {
        notif = await Notifications.create({
            message: `Congratulations, ${user.name} has accepted your donation to volunteer.`,
            recipient: user2
        });
    } catch (error) {
        console.error("Error creating notification:", error);  // Log the error for debugging
        throw new ApiError(503, "Something went wrong while adding the notification to the user's profile."); 
    }
    
    



    await sendEmail(user2,user,'Someone has accepted to volunteer.',null,'donar');
   
    return res
    .status(200)
    .json(
        new ApiResponse(200,user.name+" volunteered the donation.","Successfully accepted the volunteering opportunity.")
    )


})

export {
    volunteeringOpportunities,
    acceptVolunteeringOpportunity
}