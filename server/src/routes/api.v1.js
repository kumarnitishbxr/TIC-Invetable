import {Router} from "express";
import jobRouter from "./job.route.js";
// import 


const router = Router();

router.use('/job', jobRouter);



export default router;