import { Router } from "express";
import adminRouter from "./admin.route.js";
import authRouter from "./auth.route.js";
import jobRouter from "./job.route.js";
import walletRouter from "./wallet.route.js";
import workerRouter from "./worker.route.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/job", jobRouter);
router.use("/worker", workerRouter);
router.use("/wallet", walletRouter);
router.use("/admin", adminRouter);

export default router;
