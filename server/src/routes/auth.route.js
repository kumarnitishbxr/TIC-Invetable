import { Router } from "express";
import { Login, logout, Register, validUser } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", Register);
authRouter.post("/login", Login);
authRouter.get("/logout", logout);
authRouter.get("/check", validUser);

export default authRouter;