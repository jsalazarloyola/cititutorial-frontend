<template>
  <div>
    <div class="title">Ingreso</div>
    <AppLogin @submit-login="login"></AppLogin>
    <div v-if="wrong_login" class="notification is-danger">
      Nombre de usuario o contraseña incorrecta.
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppLogin from '~/components/AppLogin.vue';

import { ref } from 'vue';

import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';
import { User } from '~/models/userModel';

const { authenticateUser } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore());

const router = useRouter();

const wrong_login = ref(false);

async function login(user: User) {
  // llama la autenticación D:
  let res = await authenticateUser(user);
  console.log("in", authenticated.value, res);
  if(authenticated.value) {
    router.push('/');
  } else {
    wrong_login.value = true;
  }
}

// console.log(authenticated.value);
</script>

<style>

</style>