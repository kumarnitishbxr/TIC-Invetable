import { Router } from "express";
import { Login, Register } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", Register);
authRouter.post("/login", Login);

export default authRouter;