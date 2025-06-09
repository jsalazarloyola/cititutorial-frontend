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
import { useApiFetch } from '~/composables/useApiFetch';
import { UseTaskClass } from '#imports';

const {task} = UseTaskClass();

async function send(){
  console.log("Mandanding: ", task);
  try {
    let response = await useApiFetch('/task', {
      method: 'POST', body: task.toPlainObject()
    });
    response.task
    console.log(response.task)
  } catch(error) {
    // Mensaje de error mágico-divino
    console.log("error", error)
  }
}
</script>

<style>

</style>