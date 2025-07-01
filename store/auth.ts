import { defineStore } from 'pinia';
import type { IUserPayload } from '~/models/userModel';
import { useApiFetch } from '#imports';

// Esto se comparte por toda la aplicación
export const useAuthStore = defineStore(
  'auth', {
    // Estado del almacén
    state: () => ({
      authenticated: false,
      username: "",
    }),
    actions: {
      // Autenticar usuario
      async authenticateUser( userPayload: IUserPayload ){
        console.log(userPayload, JSON.stringify(userPayload));
        try {
          // Biblioteca dummy, por mientras
          const res: any = await $fetch('https://dummyjson.com/auth/login', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: {
              username: userPayload.username,
              password: userPayload.password
            }
          });
          console.log(res);

          if(res.refreshToken) {
            // Crea galleta
            const token = useCookie('token');
            // Le da el valor del token
            token.value = res.refreshToken;
            // Dice que está autenticado
            this.authenticated = true;
            this.username = userPayload.username;
          }
        } catch (error) {
          console.log(error);
        }
      },
      // Desloguear
      logoutUser() {
        const token = useCookie('token');
        this.authenticated = false;
        token.value = null;  // borra la galleta
      }
    }
})
