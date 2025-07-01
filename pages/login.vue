<template>
  <div>
    <div class="title">Ingreso</div>
    <AppLogin @submit-login="login"></AppLogin>
  </div>
</template>

<script lang="ts" setup>
import AppLogin from '~/components/AppLogin.vue';

import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';
import { User } from '~/models/userModel';

const { authenticateUser } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore());

const router = useRouter();

async function login(user: User) {
  // llama la autenticación D:
  let res = await authenticateUser(user);
  console.log("in", authenticated.value, res);
  if(authenticated) {
    router.push('/');
  }
}

// console.log(authenticated.value);
</script>

<style>

</style>