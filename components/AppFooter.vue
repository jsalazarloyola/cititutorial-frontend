<template>
  <footer class="footer">
    <div class="content has-text-centered">Página random de prueba muy bonita</div>

    <div v-if="authenticated" class="content has-text-centered">
      Hola, {{ user }}
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';

const { authenticated, user } = storeToRefs(useAuthStore());
</script>

<style>

</style>