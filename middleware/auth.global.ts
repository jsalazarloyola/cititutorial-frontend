import { useAuthStore } from "~/store/auth";

// Al llamarse x.global.y, esta cosa es cargada globalmente en todas las páginas :O
export default defineNuxtRouteMiddleware((to, from) => {
    // console.log('holi', to, from);
    // console.log("D:");
    // Obtiene el estado actual y la cookie
    
    const { authenticated } = storeToRefs(useAuthStore());
    const token = useCookie('token');
    // console.log(token.value);

    if(token.value){
        // Si hay cookie con token, está autenticado
        authenticated.value = true;
    } else if(token.value && to?.name === 'login'){
        // Si hay token y se manda a login, se devuelve al inicio
        return navigateTo('/');
    } else if(!token.value && to?.name !== 'login'){
        // Si no hay token y trata de ir a un lado diferente de login,
        // se le manda al login
        abortNavigation();
        return navigateTo('/login');
    }
})
