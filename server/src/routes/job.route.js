import {Router} from "express";
import { createJob } from "../controllers/job.controller.js";
import authenticateEmployer from "../middleware/employer.middleware.js";


const jobRouter = Router();

jobRouter.post('/create', authenticateEmployer, createJob);



export default jobRouter;