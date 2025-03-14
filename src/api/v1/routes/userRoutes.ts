import express, { Router } from "express";
import { getUserDetails } from "../controllers/userController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

router.get(
    "/:id",
    authenticate,
   isAuthorized({ hasRole: ["admin","Manager","officer","user"] }),
    getUserDetails
);

export default router;