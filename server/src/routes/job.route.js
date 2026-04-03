import {Router} from "express";
import { createJob, getJobs } from "../controllers/job.controller.js";
import authenticateEmployer from "../middleware/employer.middleware.js";
import authenticateUser from "../middleware/user.middleware.js";

const jobRouter = Router();

jobRouter.get('/:id', authenticateUser, getJobs)
jobRouter.post('/create', authenticateEmployer, createJob);



export default jobRouter;