import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  changePassword,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshTokens,
  registerUser,
} from "../controllers/user.controller.js";

export const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-tokens").patch(verifyJWT, refreshTokens);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/change-password").patch(verifyJWT, changePassword);