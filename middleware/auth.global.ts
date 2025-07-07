import { useAuthStore } from "~/store/auth";

// Al llamarse x.global.y, esta cosa es cargada globalmente en todas las páginas :O
export default defineNuxtRouteMiddleware((to, from) => {
    if( typeof window === "undefined") {
        return;
    }
    // console.log('holi', to, from);
    // console.log("D:");
    // Obtiene el estado actual y la cookie
    
    const store = useAuthStore();
    store.initializeAuth();
    const { authenticated } = storeToRefs(useAuthStore());
    // const token = useCookie('token');
    // console.log(token.value);

    if(store.authToken){
        // En realidad, esto lo dejo como placeholder, por si se me olvidó
        // agregar algo...
        // Si hay cookie con token, está autenticado
        authenticated.value = true;
    } else if(store.authToken && to?.name === 'login'){
        // Si hay token y se manda a login, se devuelve al inicio
        return navigateTo('/');
    } else if(!store.authToken && to?.name !== 'login'){
        // Si no hay token y trata de ir a un lado diferente de login,
        // se le manda al login
        abortNavigation();
        return navigateTo('/login');
    }
})
