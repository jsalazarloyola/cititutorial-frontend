<template>
  <h2>Tareas disponibles</h2>
    <div>
      <form>
        <table class="table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Descripción</th>
              <th>Creación</th>
              <th>Completado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(task, i) in tasks" :key="task._id">
              <th scope="row"> {{task.title}} </th>
              <td> {{task.description}} </td>
              <td> {{task.createdAt }} </td>
              <td>
                <!-- Llama a updateTask con cada cambio -->
                <input
                    type="checkbox"
                    v-model="task.completed"
                    v-bind="task.completed"
                    v-on:change="updateTask(task)"
                >
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Falta actualizar las tareas como completadas D: -->
        <!-- <button type="submit" @click="updateTask">Actualizar tareas</button> -->
      </form>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useApiFetch } from '~/composables/useApiFetch';

const tasks = ref([]);

async function getData(){
  try {
      console.debug("Obteniending...");
      let response = await useApiFetch('/task');
      console.debug(response.message);
      console.debug(response.task_list);
      
      for(const task of response.task_list){
        console.log(task)
        tasks.value.push(task);
      }
      
      console.debug(tasks.value);
  } catch(error){
      console.error('error', error);
  }
}

async function updateTask(task){
  console.log("Actualiza tarea", task.title);
  try {
      let response = await useApiFetch('/task/' + task._id, {
          method: 'PUT', body: task
      });
      console.log(response.data);
  } catch(error){
      // Mensaje de error mágico divino
      console.log("error", error)
  }
}

getData();
</script>

<style>

</style>