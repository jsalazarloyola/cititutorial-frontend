<template>
  <div class="control">
    <div class="field">
      <label>Usuario:</label>
      <input
        class="input" type="text"
        placeholder="Usuario de correo sin @usach.cl"
        v-model="user.username"
        required>
    </div>
    <div class="field">
      <label>Password:</label>
      <input
        class="input" type="password"
        placeholder="Password"
        v-model="user.password"
        required>
    </div>
    <button class="button" @click="submit">Login</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { extractRuntimeEmits } from 'vue/compiler-sfc';
import { User } from '~/models/userModel';

const user = ref(new User());

const emit = defineEmits<{
  (e: 'submitLogin', user: User): void
}>();

function submit() {
  // console.log("emitido login");
  if(user.value.username && user.value.password){
    emit('submitLogin', user.value);
  }
}

</script>

<style>

</style>