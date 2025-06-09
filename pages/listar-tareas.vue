<template>
  <h2 class="title">Tareas disponibles</h2>
    <div>
      <div>
        <table class="table is-striped is-hoverable is-fullwidth">
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
                  class="checkbox"
                  type="checkbox"
                  v-bind="task.completed"
                  v-model="task.completed"
                  v-on:change="updateTask(task)"
                >
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Falta actualizar las tareas como completadas D: -->
        <!-- <button type="submit" @click="updateTask">Actualizar tareas</button> -->
      </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useApiFetch } from '~/composables/useApiFetch';
import { TaskModel } from '#imports';

const tasks = ref<TaskModel[]>([]);

// Número de página
const page = ref(1);
// Número de elementos por página
const limit = ref(5);

async function getData(page: number, limit: number){
  try {
      console.debug("Obteniending...");
      let response = await useApiFetch(`/task/${page}/${limit}`, {
        method: "GET"
      });
      console.debug(response.message);
      // console.debug(response.task_list);
      
      for(const task of response.task_list){
        // console.log(task)
        tasks.value.push(new TaskModel(task));
      }
      
      // console.debug(tasks.value);
  } catch(error){
      console.error('error', error);
  }
}

async function updateTask(task: TaskModel){
  console.log("Actualiza tarea", task.title);
  try {
      let response = await useApiFetch('/task/' + task._id, {
          method: 'PUT', body: task.toPlainObject()
      });
      console.log(response.data);
  } catch(error){
      // Mensaje de error mágico divino
      console.log("error", error)
  }
}

getData(page.value, limit.value);
</script>

<style>

</style>