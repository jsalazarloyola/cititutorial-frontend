// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  app: {
    head: {
      title: "Minisistema de Tareas",
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Basado en el template de prueba para postulantes' }
      ]
    }
  },

  // Página de estilos con Bulma
  css: ["~/assets/styles/main.scss"],
  runtimeConfig: {
    public: {
      // Dirección base de backend debería ser variable de entorno
      baseURL: process.env.BASE_URL || "http://localhost:3000"
    }
  }
})
