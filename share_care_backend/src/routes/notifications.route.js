import { Router } from 'express'; 
import { getCount,readingMessage } from '../controllers/notifications.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';


const router=Router()

router.route("/getCount").get(verifyJWT,getCount)
router.route("/readingMessage").put(verifyJWT,readingMessage)

export default router

