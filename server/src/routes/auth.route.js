import { Router } from "express";
import { Login, logout, Register } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", Register);
authRouter.post("/login", Login);
authRouter.get("/logout", logout);

export default authRouter;