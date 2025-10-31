const database = {
  users: [],
  pets: [],
};

/**
 * Pushes generated users into the in-memory store.
 * @param {Array} users
 * @returns {Array}
 */
export const insertUsers = (users = []) => {
  if (!Array.isArray(users)) return [];
  database.users.push(...users);
  return users;
};

/**
 * Pushes generated pets into the in-memory store.
 * @param {Array} pets
 * @returns {Array}
 */
export const insertPets = (pets = []) => {
  if (!Array.isArray(pets)) return [];
  database.pets.push(...pets);
  return pets;
};

export const getUsers = () => [...database.users];

export const getPets = () => [...database.pets];

export const resetStore = () => {
  database.users = [];
  database.pets = [];
};

export default {
  insertUsers,
  insertPets,
  getUsers,
  getPets,
  resetStore,
};
