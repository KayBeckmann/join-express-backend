<template>
  <div class="kanban-board">
    <div v-for="status in statuses" :key="status" class="column">
      <h3>{{ status }}</h3>
      <draggable v-model="tasksByStatus[status]" group="tasks" @end="onDragEnd">
        <TaskCard v-for="task in tasksByStatus[status]" :key="task.id" :task="task" />
      </draggable>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import draggable from 'vuedraggable'
import TaskCard from './TaskCard.vue'

const taskStore = useTaskStore()
const statuses = ['idee', 'bearbeitung', 'prüfen', 'fertig']

const tasksByStatus = computed(() => {
  return taskStore.tasks.reduce((acc, task) => {
    if (!acc[task.status]) acc[task.status] = []
    acc[task.status].push(task)
    return acc
  }, {})
})

const onDragEnd = (event) => {
  const taskId = event.item.dataset.id
  const newStatus = event.to.dataset.status
  taskStore.updateTaskStatus(taskId, newStatus)
}
</script>

<style scoped>
.kanban-board {
  display: flex;
  gap: 1rem;
  padding: 1rem;
}

.column {
  flex: 1;
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
}
</style>