<template>
  <h3 class="title is-4">Nueva tarea</h3>
    <form>
      <div class="field">
        <label class="label" for="task.title">Título de la tarea: </label>
        <input class="input" type="text" v-model="task.title" id="title" placeholder="Título">
      </div>
      <div class="field">
        <label class="label" for="task.description">Descripción de la tarea: </label>
        <input class="input" type="text" v-model="task.description" id="description" placeholder="Descripción">
      </div>
      <div>
        <button class="button is-link" @click="send">Crear tarea</button>
      </div>
    </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useApiFetch } from '~/composables/useApiFetch';

const task = ref({
  title: "",
  description: "",
  date: ""
})

async function send(){
  console.log("Mandanding: ", task);
  try {
    let response = await useApiFetch('/task', {
      method: 'POST', body: task._rawValue
    });
    task.value = response.task
    console.log(task.value)
  } catch(error) {
    // Mensaje de error mágico-divino
    console.log("error", error)
  }
}
</script>

<style>

</style>