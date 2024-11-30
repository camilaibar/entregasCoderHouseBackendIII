import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { createHash, isValidPassword } from "../../utils/utils.js";
import UserManager from "../../dao/users.manager.js";

const userService = new UserManager();

const strategyConfig = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
};

const signup = async (req, email, password, done) => {
  try {
    const user = await userService.findUserByEmail(email);
    if (user) return done(null, false, { message: "User exists" });

    let { first_name, last_name, email, age, password } = req.body;

    password = await createHash(password);

    const newUser = await userService.createUser({
      first_name,
      last_name,
      email,
      age,
      password,
    });

    if (!newUser) return done("User not created");

    return done(null, newUser, { message: "User created" });
  } catch (error) {
    console.error(error);
    return done(error.message);
  }
};

const signin = async (req, email, password, done) => {
  try {
    const user = await userService.findUserByEmail(email);
    if (!user) {
      return done({ message: "Invalid user or password" });
    }

    const isMatch = await isValidPassword(password, user.password);
    if (!isMatch) {
      return done({ message: "Invalid user or password" });
    }

    return done(null, user, { message: "User logged in" });
  } catch (error) {
    console.error(error);
    return done(error.message);
  }
};

const signinStrategy = new LocalStrategy(strategyConfig, signin);
const signupStrategy = new LocalStrategy(strategyConfig, signup);

passport.use("signin", signinStrategy);
passport.use("signup", signupStrategy);

passport.serializeUser((user, done) => {
  try {
    return done(null, user._id);
  } catch (error) {
    return done(error);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userService.findUserById(id);
    if (!user) {
      return done({ message: "Invalid user or password" });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
});
