import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null
  }),
  actions: {
    async login(credentials) {
      const response = await axios.post('/api/auth/login', credentials);
      this.token = response.data.token;
      localStorage.setItem('token', this.token);
      this.fetchUser();
    },
    async register(userData) {
      await axios.post('/api/auth/register', userData);
    },
    async fetchUser() {
      const response = await axios.get('/api/auth/user', {
        headers: { Authorization: `Bearer ${this.token}` }
      });
      this.user = response.data;
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
    }
  }
});