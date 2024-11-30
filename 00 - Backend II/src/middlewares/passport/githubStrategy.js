import passport from "passport";
import { Strategy as GithubStrategy } from "passport-github2";
import { createHash } from "../../utils/utils.js";
import UserManager from "../../dao/users.manager.js";

const userService = new UserManager();

const strategyConfig = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
};

const signInAndUp = async (accessToken, refreshToken, profile, done) => {
  try {
    const { email, name } = profile._json;

    // Buscar usuario por email
    const user = await userService.findUserByEmail(email);
    if (user) {
      return done(null, user); // Usuario encontrado, iniciar sesión
    }

    // Crear un nuevo usuario si no existe
    const [last_name, first_name] = name
      .split(",")
      .map((section) => section.trim());
    const password = await createHash(""); // Contraseña en blanco para cuentas vinculadas con GitHub

    const newUser = await userService.createUser({
      first_name,
      last_name,
      email,
      password,
      isGithub: true,
    });

    if (!newUser) return done("User not created");

    return done(null, newUser); // Usuario creado, iniciar sesión
  } catch (error) {
    console.error(error);
    return done(error.message);
  }
};

passport.use("github", new GithubStrategy(strategyConfig, signInAndUp));

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
