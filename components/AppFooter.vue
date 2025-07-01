<template>
  <footer class="footer">
    <div class="content has-text-centered">Página random de prueba muy bonita</div>

    <div v-if="authenticated" class="content has-text-centered">
      Hola, {{ username }}
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';

const { authenticated, username } = storeToRefs(useAuthStore());
</script>

<style>

</style>