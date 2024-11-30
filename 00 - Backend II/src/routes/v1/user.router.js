import { Router } from "express";
import UserController from "../../controllers/user.controller.js";

const router = Router();
const userController = new UserController();

// Register routes
router.post("/signup", userController.signUp.bind(userController));
router.post("/signin", userController.signIn.bind(userController));

// GitHub Login
router.get("/github", userController.loginWithGithub.bind(userController));

// Google OAuth2 Login
router.get(
  "/oauth2/redirect/accounts.google.com",
  userController.loginWithGoogle.bind(userController)
);

// Google OAuth2 callback
router.get(
  "/oauth2/redirect/accounts.google.com",
  userController.googleRedirect.bind(userController)
);

// Logout route
router.get("/logout", userController.logOut.bind(userController));

// Example route for testing
router.get("/", userController.testRoute.bind(userController));

export default router;
