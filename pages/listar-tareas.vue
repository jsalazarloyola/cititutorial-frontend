<template>
  <h2 class="title">Tareas disponibles</h2>
    <div>
      <div>
        <AppPagination
          :current-page="currentPage"
          :total-pages="total_pages"
          @page-change="handlePageChange">
        </AppPagination>
      </div>

      <div>
        <AppTaskTable
          :tasks="tasks"
          @completion-change="updateTask"
          >
        </AppTaskTable>
      </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
// import { useRoute, useRouter } from 'vue-router';
import { useApiFetch } from '~/composables/useApiFetch';
import { TaskModel } from '#imports';
import AppPagination from '~/components/AppPagination.vue';

// const route = useRoute();  // Ruta actual
// const router = useRouter();  // Enrutador

const tasks = ref<TaskModel[]>([]);  // Lista de tareas
const total_tasks = ref(0);  // Número total de tareas (estimado por el backend)
const total_pages = ref(0);  // Número total de paǵinas (calculado al obtener las tareas)

// Número de página
const currentPage = ref(1);
// Número de elementos por página
const limit = ref(3);

async function getData(page: number, limit: number){
  try {
      console.debug("Obteniending...");
      let response = await useApiFetch(`/task/${page}/${limit}`, {
        method: "GET"
      });
      console.debug(response.message);
      total_tasks.value = response.total_tasks;
      total_pages.value = Math.ceil(total_tasks.value / limit);
      // console.debug(response.task_list, total_task.value);
      
      // Reinicia el arreglo
      tasks.value.length = 0;
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

// Función para manejar el cambio de página actual
const handlePageChange = (newPage: number) => {
  currentPage.value = newPage;
}

watch(currentPage,  // ref o reactive que sapear
  // Esta función que se define como "callback" para esto puede tomar como parámetros
  // el valor nuevo que tiene la variable observada y el valor original que tenía,
  // en ese orden
  () => {
    getData(currentPage.value, limit.value);
    AppPagination
  },
 { immediate: true}  // Ejecuta inmediatamente
)

getData(currentPage.value, limit.value);
</script>

<style>

</style>