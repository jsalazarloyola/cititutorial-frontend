<template>
  <nav class="navbar">
    <div class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item button">
          <a href="/">Inicio</a>
        </div>

        <div class="navbar-item has-dropdown is-hoverable button">
          <div class="navbar-link">
            Acciones
          </div>
          <div class="navbar-dropdown">
            <a class="navbar-item" href="/nueva-tarea">Nueva tarea</a>
            <a class="navbar-item" href="/listar-tareas">Listar tareas</a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item button">
          <a href="/acerca-de">Acerca de</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>

</script>

<style>

</style>