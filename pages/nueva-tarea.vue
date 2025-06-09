<template>
  <h3>Nueva tarea</h3>
    <div>
      <div class="form-item">
        <label for="task.title">Título de la tarea: </label>
        <input type="text" v-model="task.title" id="title" placeholder="Título">
      </div>
      <div class="form-item">
        <label for="task.description">Descripción de la tarea: </label>
        <input type="text" v-model="task.description" id="description" placeholder="Descripción">
      </div>
      <div>
        <button @click="send">Crear tarea</button>
      </div>
    </div>
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