import { auth } from "../lib/firebase"; // Importe a instância do Firebase Authentication adequada

export const checkAuth = async () => {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // O usuário está autenticado
        resolve(user);
      } else {
        // O usuário não está autenticado
        reject(new Error('Usuário não autenticado'));
      }
    });
  });
};
