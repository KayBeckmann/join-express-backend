<template>
  <nav class="nav-menu" id="nav">
    <div class="menu-content">
      <router-link to="/" class="nav-item">
        <span>🏠 Home</span>
      </router-link>
      <router-link to="/board" class="nav-item">
        <span>📋 Board</span>
      </router-link>
      <router-link to="/new-task" class="nav-item">
        <span>➕ Neuer Task</span>
      </router-link>
      <router-link to="/contacts" class="nav-item">
        <span>👥 Kontakte</span>
      </router-link>
      <!-- <button @click="handleLogout" class="logout-button"> -->
        <!-- 🔒 Abmelden -->
      <!-- </button> -->
    </div>
    <div class="ende menu-content">
      <button @click="handleLogout" class="logout-button">
        🔒 Abmelden
      </button>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/auth/login')
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: white;
}
.nav-menu {
  background: var(--nav-background);
  color: white;
  padding-top: var(--header-height);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  height: calc(100% - var(--header-height));
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: column;
}

.menu-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: var(--nav-width);
}

.nav-item {
  padding: 1rem;
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.3s;
}

.nav-item:hover {
  background: #e0e0e0;
}

.router-link-active {
  background: #42b983;
  color: white;
}

.logout-button {
  margin-top: auto;
  padding: 1rem;
  background: #ff4757;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

@media (max-width: 767px) {
  .nav-menu {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }
  
  .menu-content {
    flex-direction: row;
    justify-content: space-around;
  }
  
  .nav-item span {
    display: none;
  }
  
  .nav-item::before {
    font-size: 1.5rem;
  }
}
</style>