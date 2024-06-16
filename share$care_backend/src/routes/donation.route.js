import { Router } from 'express';
import { saveDonations } from '../controllers/donation.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';


const router = Router();


router.route("/donate").post(verifyJWT,saveDonations)

export default router