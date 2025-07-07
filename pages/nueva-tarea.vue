<template>
  <h3 class="title is-4">Nueva tarea</h3>
    <div class="control"  @keyup.enter="send">
      <div class="field">
        <label class="label" for="task.title">Título de la tarea: </label>
        <input class="input" type="text" v-model="task.title" id="title" placeholder="Título">
      </div>
      <div class="field">
        <label class="label" for="task.description">Descripción de la tarea: </label>
        <input class="input" type="text" v-model="task.description" id="description" placeholder="Descripción">
      </div>
      <div>
        <button class="button is-link" @click="send">
          Crear tarea
        </button>
      </div>
    </div>
</template>

<script lang="ts" setup>
import { useApiFetch } from '~/composables/useApiFetch';
import { UseTaskClass } from '#imports';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';

const {task} = UseTaskClass();

const store = useAuthStore();
store.initializeAuth();  // Puede que sea redundante esto, estando en auth.global.ts
const { authToken } = storeToRefs(store);

async function send(){
  console.log("Mandanding: ", task);
  try {
    let response = await useApiFetch('/task', {
      method: 'POST',
      body: task.toPlainObject(),
      headers: {
        Authorization: `Bearer ${authToken.value}`
      }
    });
    response.task
    console.log(response.task)
    task.title = ""
    task.description = ""
  } catch(error) {
    // Mensaje de error mágico-divino
    console.log("error", error)
  }
}
</script>

<style>

</style>