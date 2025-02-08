import { Router } from "express";
import passport from "../utils/passport";
import authController from "../controllers/authControllers";
import { authenticateToken } from "../middlewares/authenticate.middleware";

const router = Router();

router.get("/checkAuth", authenticateToken, authController.checkAuth);
router.get("/logout", authenticateToken, authController.logout);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  authController.googleCallback
);

router.get('/users',authenticateToken,authController.getAllUsers)

export default router;
