import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { createHash } from "../../utils/utils.js";
import UserManager from "../../dao/users.manager.js";

const userService = new UserManager();

const strategyConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  scope: ["profile", "email"],
  state: true,
};

const signInAndUp = async (accessToken, refreshToken, profile, done) => {
  try {
    const { email, given_name, family_name } = profile._json;

    // Buscar usuario por email
    const user = await userService.findUserByEmail(email);
    if (user) {
      return done(null, user); // Usuario encontrado, iniciar sesión
    }

    // Crear un nuevo usuario si no existe
    const password = await createHash(""); // Contraseña en blanco para cuentas vinculadas con Google

    const newUser = await userService.createUser({
      first_name: given_name,
      last_name: family_name,
      email,
      password,
      isGoogle: true,
    });

    if (!newUser) return done("User not created");

    return done(null, newUser); // Usuario creado, iniciar sesión
  } catch (error) {
    console.error(error);
    return done(error.message);
  }
};

passport.use("google", new GoogleStrategy(strategyConfig, signInAndUp));

// Serializar el ID del usuario para la sesión
passport.serializeUser((user, done) => {
  try {
    return done(null, user._id);
  } catch (error) {
    return done(error);
  }
});

// Deserializar el usuario usando su ID
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
