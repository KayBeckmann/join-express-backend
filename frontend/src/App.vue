<template>
  <div id="app">
    <div class="grid-container" v-if="showMenu">
      <NavMenu></NavMenu>
      
      <Header />
      
      <div id="main">
        <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
      </div>
    </div>

    <router-view v-else></router-view>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import NavMenu from '@/components/Shared/NavMenu.vue'
import Header from '@/components/Shared/Header.vue'

const authStore = useAuthStore()
const router = useRouter()

const showMenu = computed(() => {
  return authStore.isAuthenticated && !router.currentRoute.value.path.startsWith('/auth')
})
</script>

<style scoped>
.grid-container {
  height: 100dvh;
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 75px 1fr;
  grid-template-areas: 
  "nav header"
  "nav main";
}

#nav { 
  grid-area: nav;
}

#header { 
  grid-area: header;
}

#main 
{ 
  grid-area: main;
}
</style>