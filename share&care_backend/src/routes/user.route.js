import { Router } from 'express';
import { loginUser, logoutUser, registerUser,verifyOtp,changePassword,updateUserAvatar,donationsDoneByUser,volunteeringByUser,forgotPassword } from '../controllers/users.controller.js';
import {upload} from "../middlewares/multer.middleware.js";
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();


router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }
    ]),
    registerUser)

router.post('/verify-otp', verifyOtp);

router.route("/login").post(loginUser)
router.route("/updateUserAvatar").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }
    ]),
    verifyJWT,
    updateUserAvatar)

router.route("/forgotPassword").post(forgotPassword)


//secured route
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/changePassword").post(verifyJWT,changePassword)
router.route("/donationsDoneByUser").get(verifyJWT,donationsDoneByUser)
router.route("/volunteeringByUser").get(verifyJWT,volunteeringByUser)



export default router; 

