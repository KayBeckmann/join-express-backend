<template>
  <div id="app">
    <NavMenu v-if="showMenu" />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import NavMenu from '@/components/Shared/NavMenu.vue'

const authStore = useAuthStore()
const router = useRouter()

const showMenu = computed(() => {
  return authStore.isAuthenticated && !router.currentRoute.value.path.startsWith('/auth')
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Responsive Menu */
@media (min-width: 768px) {
  #app {
    flex-direction: row;
  }
  
  nav {
    width: 250px;
    height: 100vh;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>