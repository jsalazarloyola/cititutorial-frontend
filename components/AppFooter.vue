<template>
  <footer class="footer">
    <div class="content has-text-centered">Página random de prueba muy bonita</div>

    <!-- Esto está dando warning de incongruencia entre cliente y servidor, hay que arreglarlo -->
    <div v-if="authenticated" class="content has-text-centered">
      Hola, {{ user }}
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';

const store = useAuthStore();
store.initializeAuth();
const { authenticated, user } = storeToRefs(store);
</script>

<style>

</style>