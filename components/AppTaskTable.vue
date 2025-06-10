<template>
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
              v-model="task.completed"
              v-on:change="updateTask(task)"
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { TaskModel } from '#imports';

// Propiedades: la lista de tareas
const props = defineProps<{
  tasks: TaskModel[]
}>();

// Emite el cambio de estado de compleción de la tarea, si hace falta
const emit = defineEmits<{
  (e: "completionChange", task: TaskModel): void
}>();

// Emite el evento de compleción
const updateTask = (task: TaskModel) => {
  emit('completionChange', task);
}
</script>

<style>

</style>