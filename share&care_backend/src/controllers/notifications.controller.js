import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { Notifications } from "../models/notifications.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getCount = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (!user) {
        throw new ApiError(401, "Unauthorised request.Please login first.")
    }

    const messages = await Notifications.aggregate([
        {
            $match: {
                recipient: user._id,
            }
        },
        {
            $match: {
                isRead: false
            }
        }
    ])

    if (!messages) {
        throw new ApiError(401, "Error while fetching messages.")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    "messages": messages,
                    "TotalCount": messages.length,
                },
                "messages fetched successfully.")
        );
})

const readingMessage = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (!user) {
        throw new ApiError(401, "Unauthorised request.Please login first.")
    }

    const messages = await Notifications.aggregate([
        {
            $match: {
                recipient: user._id,
            }
        },
        {
            $match: {
                isRead: false
            }
        }
    ]);

    const messageIds = messages.map(message => message._id);

    await Notifications.updateMany(
        { _id: { $in: messageIds } },
        { $set: { isRead: true } }
    );

    return res
    .status(200)
    .json(
        new ApiResponse(200,"Message read successfully.")
    )

})

export { getCount,readingMessage }