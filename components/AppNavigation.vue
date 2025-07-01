<template>
  <nav class="navbar">
    <div class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item button">
          <NuxtLink to="/">Inicio</NuxtLink>
        </div>
        <div v-if="!authenticated" class="navbar-item button">
          <NuxtLink to="/login">Iniciar sesión</NuxtLink>
        </div>
        <div v-if="authenticated" class="navbar-item button">
          <NuxtLink @click="logout">Cerrar sesión</NuxtLink>
        </div>

        <div class="navbar-item has-dropdown is-hoverable button">
          <div class="navbar-link">
            Acciones
          </div>
          <div class="navbar-dropdown">
            <NuxtLink v-if="authenticated" class="navbar-item" to="/nueva-tarea">Nueva tarea</NuxtLink>
            <NuxtLink v-if="authenticated" class="navbar-item" to="/listar-tareas">Listar tareas</NuxtLink>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item button">
          <NuxtLink to="/acerca-de">Acerca de</NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';

// Obtiene solo las acciones y atributos que interesan en este lado
const { logoutUser } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore());

const router = useRouter();

const logout = () => {
  logoutUser();
  router.push('/login');
}
</script>

<style>

</style>