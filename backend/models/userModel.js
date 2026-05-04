let users = [];

export const findUserByUsername = (username) => {
  return users.find(u => u.username === username);
};

export const findUserById = (id) => {
  return users.find(u => u.id === id);
};

export const createUser = (username, password) => {
  const newUser = {
    id: Math.random().toString(36).substr(2, 9),
    username,
    password // Not hashing for educational simplicity
  };
  users.push(newUser);
  return { id: newUser.id, username: newUser.username };
};
