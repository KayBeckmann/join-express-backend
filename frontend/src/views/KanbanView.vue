<template>
  <div class="kanban-view">
    <h1>Kanban Board</h1>
    <KanbanBoard />
  </div>
</template>

<script setup>
import KanbanBoard from '@/components/Kanban/KanbanBoard.vue'
</script>

<style scoped>
.kanban-view {
  padding: 1rem;
}
</style>