// src/utils/validation.js

export const validateEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};
