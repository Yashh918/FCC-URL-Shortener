import { Router } from "express";
import {
    createShortUrl,
    redirectToOriginalUrl
} from "../controllers/url.controllers.js"

const router = Router()

router
    .route('/shorturl')
    .post(createShortUrl)
router
    .route('/shorturl/:shorturl')
    .get(redirectToOriginalUrl)

export default router