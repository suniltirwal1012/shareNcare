import { Router } from 'express';
import { volunteeringOpportunities,acceptVolunteeringOpportunity } from '../controllers/volunteer.controller.js';
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router=Router()

router.route("/").get(volunteeringOpportunities)
router.route("/accept").post(verifyJWT,acceptVolunteeringOpportunity)

export default router 