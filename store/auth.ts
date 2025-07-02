import { defineStore } from 'pinia';
import { LDAPResponse, type IUserPayload } from '~/models/userModel';
import { useApiFetch } from '#imports';

// Esto se comparte por toda la aplicación
export const useAuthStore = defineStore(
  'auth', {
    // Estado del almacén
    state: () => ({
      authenticated: false,
      user: "",
    }),
    actions: {
      // Autenticar usuario
      async authenticateUser( userPayload: IUserPayload ){
        console.log(userPayload, JSON.stringify(userPayload));
        try {
          // Biblioteca dummy, por mientras
          // const res: any = await $fetch('https://dummyjson.com/auth/login', {
          // the real deal
          const res: LDAPResponse = await useApiFetch("login", {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: {
              user: userPayload.user,
              password: userPayload.password
            }
          }).then(res => new LDAPResponse(res));  // Explícitamente dice que será una respuesta
          // Debuging
          console.log(res);
          // console.log(res.decodeToken());

          const payload = res.decodeToken();
          this.user = payload.user.user;
          this.authenticated = true;
          const token = useCookie('token');
          token.value = res.token;

          // Ye olde try
          // if(res.token) {
          //   // Crea galleta
          //   const token = useCookie('token');
          //   // Le da el valor del token
          //   token.value = res.token;
          //   // Dice que está autenticado
          //   this.authenticated = true;
          //   this.user = userPayload.user;
          // }
        } catch (error) {
          console.log(error);
          this.authenticated = false;
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
