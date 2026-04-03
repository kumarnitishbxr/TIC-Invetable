import { Router } from "express";
import {
    listUsers,
    listJobs,
    listDisputes,
    blockUser,
    unblockUser,
    deleteUser,
    deleteJob,
    deleteDispute,
    assignMediator,
    verifyUser,
    unverifyUser,
    getUserDetails,
    getJobDetails,
    getDisputeDetails,
    getAllMediators,
    getAllEmployers,
    getAllLabourers,
    Overview,
} from "../controllers/admin.controller.js";

const adminRouter = Router();

adminRouter.get("/overview", authenticateAdmin, Overview);
adminRouter.get("/list-users", authenticateAdmin, listUsers);
adminRouter.get("/list-jobs", authenticateAdmin, listJobs);
adminRouter.patch("/disputes/:disputeId", authenticateAdmin, listDisputes);
adminRouter.patch("/block-user/:userId", authenticateAdmin, blockUser);
adminRouter.patch("/unblock-user/:userId", authenticateAdmin, unblockUser);
adminRouter.delete("/delete-user/:userId", authenticateAdmin, deleteUser);
adminRouter.delete("delete-job", authenticateAdmin, deleteJob);
adminRouter.delete("delete-dispute", authenticateAdmin, deleteDispute);
adminRouter.patch(
    "/assign-mediator/:disputeId",
    authenticateAdmin,
    assignMediator,
);
adminRouter.patch("/verify-user/:userId", authenticateAdmin, verifyUser);
adminRouter.patch("/unverify-user/:userId", authenticateAdmin, unverifyUser);
adminRouter.patch("/get-user-details", authenticateAdmin, getUserDetails);
adminRouter.get("/get-job-details/:jobId", authenticateAdmin, getJobDetails);
adminRouter.get(
    "/get-dispute-details/:disputeId",
    authenticateAdmin,
    getDisputeDetails,
);
adminRouter.get("/get-all-mediator", authenticateAdmin, getAllMediators);
adminRouter.get("/get-all-employer", authenticateAdmin, getAllEmployers);
adminRouter.get("/get-all-labourers", authenticateAdmin, getAllLabourers);
