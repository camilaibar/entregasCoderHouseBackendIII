import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import {
  verifyJWTToken,
  extractJWTTokenFromCookies,
} from "../../utils/jwtUtils.js";
import UserManager from "../../dao/users.manager.js";

const userService = new UserManager();

// Configuración de la estrategia para extraer el token del encabezado Authorization
const strategyConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};

// Configuración de la estrategia para extraer el token de las cookies
const strategyConfigCookies = {
  jwtFromRequest: ExtractJwt.fromExtractors([extractJWTTokenFromCookies]),
  secretOrKey: process.env.SECRET_KEY,
};

// Estrategia para tokens Bearer (desde el encabezado Authorization)
passport.use("jwt", new JwtStrategy(strategyConfig, verifyJWTToken));

// Estrategia para tokens en cookies
passport.use(
  "jwt-cookies",
  new JwtStrategy(strategyConfigCookies, verifyJWTToken)
);

// Serializar el ID del usuario para la sesión
passport.serializeUser((user, done) => {
  try {
    if (!user || !user.id) {
      // Validación de existencia de usuario e ID
      const error = new Error(
        "Invalid user object or missing user ID during serialization."
      );
      console.error("Serialize error:", error);
      return done(error);
    }
    return done(null, user.id);
  } catch (error) {
    console.error("Unexpected error in serializeUser:", error);
    return done(error);
  }
});

// Deserializar el usuario usando su ID
passport.deserializeUser(async (id, done) => {
  try {
    if (!id) {
      // Validación de existencia de ID
      const error = new Error("User ID is missing for deserialization.");
      console.error("Deserialize error:", error);
      return done(error);
    }

    // Buscar usuario en la base de datos
    const user = await userService.findUserById(id);
    if (!user) {
      // Usuario no encontrado
      const error = new Error("User not found during deserialization.");
      console.warn("Deserialize warning:", error.message);
      return done(error);
    }

    return done(null, user);
  } catch (error) {
    console.error("Unexpected error in deserializeUser:", error);
    return done(error);
  }
});
