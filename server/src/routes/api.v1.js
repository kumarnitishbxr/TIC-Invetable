import {Router} from "express";
import jobRouter from "./job.route.js";
import authRouter from "./auth.route.js";


const router = Router();

router.use("/auth", authRouter);
router.use('/job', jobRouter);



export default router;