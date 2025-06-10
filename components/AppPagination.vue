<template>
  <nav class="pagination is-centered">
    <!-- Botones de página previa y siguiente -->
     <!-- No puedo hacer que esta verga muestre el estilo habilitado cuando lo está x.x -->
    <a href="#"
      :class="{'pagination-previous': true, 'is-disabled': currentPage === 1}"
      :disabled="currentPage === 1"
      @click="changePage(currentPage - 1)">
      Previa
    </a>
    <a  href="#"
      :class="{'pagination-next': true, 'is-disabled': currentPage === totalPages}"
      :disabled="currentPage === totalPages"
      @click="changePage(currentPage + 1)">
      Siguiente
    </a>

    <!-- Lista de páginas -->
    <ul class="pagination-list">
      <!-- Página 1 -->
      <li
        v-for="page in totalPages"
        :key="page">
        <a href="#"
          :class="{'pagination-link': true, 'is-current': page === currentPage}"
          @click="changePage(page)">
          {{ page }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
// Propiedades del componente 
const props = defineProps<{
  currentPage: number,  // Página actual
  totalPages: number    // Total de páginas
}>();

// Señales que emite
// const emit = defineEmits({
//   pageChange: (page: number) => {}
// });
const emit = defineEmits<{
  (e: 'pageChange', page: number): void
}>()

// Cambia la página
const changePage = (page: number) => {
  console.log(page === 1)
  // Solo dentro de los rangos, emite la señal
  if(page >= 1 && page <= props.totalPages){
    emit('pageChange', page);
  }
}
</script>

<style>

</style>