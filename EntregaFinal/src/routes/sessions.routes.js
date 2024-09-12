import { Router } from "express";
import passport from "passport";
import userController from "../controllers/user.controller.js";

const router = Router();

router.post("/register", passport.authenticate("register", { failureRedirect: "/failedRegister"}), userController.register);

router.post("/login", passport.authenticate("login", { failureRedirect: "failed"}), userController.login);

router.get("/logout", userController.logout);

router.get("/current", passport.authenticate("jwt", { session: false }), userController.current);

router.get("/failedRegister", userController.failed);

export default router; 