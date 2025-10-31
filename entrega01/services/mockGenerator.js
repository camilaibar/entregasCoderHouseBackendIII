import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

const PASSWORD_TO_ENCRYPT = "coder123";
const ROLE_OPTIONS = ["user", "admin"];
const PET_TYPES = ["Dog", "Cat", "Bird", "Fish"];
const SALT_ROUNDS = 10;

let encryptedPasswordCache = null;

const ensurePositiveInteger = (value, fallback = 50) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) || parsed <= 0 ? fallback : parsed;
};

const getEncryptedPassword = async () => {
  if (!encryptedPasswordCache) {
    encryptedPasswordCache = await bcrypt.hash(PASSWORD_TO_ENCRYPT, SALT_ROUNDS);
  }
  return encryptedPasswordCache;
};

export const generateMockPets = (quantity = 50) => {
  const safeCount = ensurePositiveInteger(quantity);

  return Array.from({ length: safeCount }, () => ({
    _id: faker.database.mongodbObjectId(),
    name: faker.person.firstName(),
    type: faker.helpers.arrayElement(PET_TYPES),
    age: faker.number.int({ min: 1, max: 15 }),
    adopted: faker.datatype.boolean(),
    createdAt: faker.date.recent({ days: 30 }).toISOString(),
  }));
};

export const generateMockUsers = async (quantity = 50) => {
  const safeCount = ensurePositiveInteger(quantity);
  const password = await getEncryptedPassword();

  return Array.from({ length: safeCount }, () => ({
    _id: faker.database.mongodbObjectId(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password,
    role: faker.helpers.arrayElement(ROLE_OPTIONS),
    pets: [],
    createdAt: faker.date.recent({ days: 30 }).toISOString(),
  }));
};

export default {
  generateMockPets,
  generateMockUsers,
};
