import { Router } from "express";
import { Login, Logout, Register, validUser } from "../controllers/auth.controller.js";
import authenticateUser from "../middleware/user.middleware.js";

const authRouter = Router();

authRouter.post("/register", Register);
authRouter.post("/login", Login);
authRouter.get("/logout", authenticateUser, Logout);
authRouter.get("/check", authenticateUser,  validUser);

export default authRouter;