import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    filteredTasks: []
  }),
  actions: {
    async fetchTasks() {
      const response = await axios.get('/api/tasks', {
        headers: { Authorization: `Bearer ${useAuthStore().token}` }
      });
      this.tasks = response.data;
    },
    async updateTaskStatus(taskId, newStatus) {
      await axios.patch(`/api/tasks/${taskId}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${useAuthStore().token}` }
      });
      this.fetchTasks();
    }
  }
});