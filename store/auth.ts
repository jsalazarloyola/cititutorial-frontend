import { defineStore } from 'pinia';
import { LDAPResponse, type IUserPayload } from '~/models/userModel';
import { useApiFetch } from '#imports';


interface AuthState {
  authenticated: boolean;
  authToken: string;
  user: string;
}


// Esto se comparte por toda la aplicación
export const useAuthStore = defineStore(
  "auth", {
    // Estado del almacén
    state: (): AuthState => {
      return {
        authenticated: false,
        authToken: "",
        user: "",
      }
    },
    actions: {
      // Autenticar usuario
      async authenticateUser( userPayload: IUserPayload ){
        // console.log(userPayload, JSON.stringify(userPayload));
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
          this.authToken = res.token;
          
          console.log(this.authToken);

          // En el lado del cliente
          if(typeof window !== 'undefined'){
            // Guarda el usuario
            localStorage.setItem('user', JSON.stringify(payload.user.user))
          }
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

        // Borra almacenamiento
        if(typeof window !== "undefined"){
          localStorage.removeItem('user');
        }
      },
      // Recupera la info de autenticación, en caso de estar autenticado
      initializeAuth(){
        // Agarra la cookie
        const token = useCookie('token');
        // Agarra el usuario, si está en el cliente
        const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
        // Verdadero si value existe y es verdadero (!="")
        this.authenticated = !!token.value;
        this.authToken = token.value || "";
        this.user = user ? JSON.parse(user) : "";
      }
    },
});
