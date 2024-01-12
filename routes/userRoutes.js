import express from "express"
import { authenticate, checkToken, forgotPassword, newPassword, profile, signin, signup } from "../controllers/userController.js";
import checkAuthentication from "../middleware/checkAuthentication.js";

const router = express.Router();

router.post("/", signup);
router.post("/login", signin);
router.get("/authenticate/:token", authenticate);
router.post("/forgot-password", forgotPassword);
router.route("/forgot-password/:token").get(checkToken).post(newPassword);

router.get("/profile", checkAuthentication, profile);

export default router;
