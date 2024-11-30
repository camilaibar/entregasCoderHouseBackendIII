import { createHash, isValidPassword } from "../utils/utils.js";
import UserManager from "../dao/users.manager.js";
import { addJWTTokenToCookies } from "../utils/jwtUtils.js";

class UserController {
  constructor() {
    this.userManager = new UserManager();
  }
  // Register new user
  async signUp(req, res, next) {
    try {
      let { first_name, last_name, email, age, password } = req.body;

      // Check if user already exists
      const existingUser = await this.userManager.findUserByEmail(email);
      if (existingUser) {
        console.error("User already exists");
        return res.redirect("/hbs");
      }

      // Encrypt password
      password = await createHash(password);

      // Create new user
      const newUser = await this.userManager.createUser({
        first_name,
        last_name,
        email,
        age,
        password,
      });

      return res.redirect("/hbs/login");
    } catch (error) {
      return next(error); // Pass error to next middleware for better error handling
    }
  }

  // Signin user
  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;

      // Check if user exists
      const user = await this.userManager.findUserByEmail(email);
      if (!user) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      // Validate password
      const isMatch = await isValidPassword(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      // Generate JWT and set it in the cookies
      addJWTTokenToCookies(res, user);

      // Redirect to the profile page after successful login
      return res.redirect(`/hbs/profile`);
    } catch (error) {
      return next(error); // Pass error to next middleware
    }
  }

  // Login with GitHub
  async loginWithGithub(req, res, next) {
    passport.authenticate("github", {
      failureRedirect: "/hbs/register",
      passReqToCallback: true,
    })(req, res, next);
  }

  // Login with Google
  async loginWithGoogle(req, res, next) {
    passport.authenticate("google", {
      assignProperty: "user",
      failureRedirect: "/hbs/register",
    })(req, res, next);
  }

  // Handle the redirect after successful Google login
  async googleRedirect(req, res, next) {
    try {
      // JWT
      addJWTTokenToCookies(res, req.user);
      return res.redirect("/hbs");
    } catch (error) {
      return next(error);
    }
  }

  // Logout user
  async logOut(req, res, next) {
    req.logOut((error) => {
      if (error) return next(error); // Pass error to next middleware
      res.clearCookie("token");
      return res.redirect("/hbs/login");
    });
  }

  // Example route for testing
  async testRoute(req, res) {
    return res.send("User management system");
  }
}

export default UserController;
