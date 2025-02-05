<template>
  <div class="task-card" :data-id="task.id">
    <h4>{{ task.title }}</h4>
    <div class="task-meta">
      <span>Subtasks: {{ completedSubtasks }}/{{ task.subtasks.length }}</span>
      <span>Priorität: {{ task.priority }}</span>
      <span>Fällig: {{ task.due_date }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const completedSubtasks = computed(() => {
  return props.task.subtasks.filter(st => st.status).length
})
</script>

<style scoped>
.task-card {
  background: white;
  padding: 1rem;
  margin: 0.5rem 0;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: grab;
}

.task-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.5rem;
}
</style>