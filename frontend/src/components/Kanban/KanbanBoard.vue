<template>
  <div class="kanban-board">
    <div v-for="status in ['idee', 'bearbeitung', 'prüfen', 'fertig']" :key="status" class="column">
      <h3>{{ status }}</h3>
      <draggable v-model="tasksByStatus[status]" group="tasks" @end="onDragEnd">
        <TaskCard v-for="task in tasksByStatus[status]" :key="task.id" :task="task" />
      </draggable>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import TaskCard from './TaskCard.vue';
import draggable from 'vuedraggable';

const taskStore = useTaskStore();
const tasksByStatus = computed(() => {
  return taskStore.tasks.reduce((acc, task) => {
    if (!acc[task.status]) acc[task.status] = [];
    acc[task.status].push(task);
    return acc;
  }, {});
});

const onDragEnd = (event) => {
  const taskId = event.item.dataset.id;
  const newStatus = event.to.dataset.status;
  taskStore.updateTaskStatus(taskId, newStatus);
};
</script>