<template>
  <div class="auth-container">
    <transition name="slide-fade" mode="out-in">
      <!-- Login-Modus: Logo links, Login-Box rechts -->
      <div v-if="mode === 'login'" key="login" class="auth-layout">
        <div class="logo-container">
          <!-- <img src="/app/src/assets/logo.png" alt="Logo" class="logo" /> -->
           <div>LOGO</div>
        </div>
        <div class="form-container">
          <!-- Lazy-loaded Login-Komponente -->
          <LoginComponent 
            @switchToRegister="switchToRegister" 
            @loginSuccess="handleSuccess" 
          />
        </div>
      </div>
      <!-- Register-Modus: Registrierungs-Box links, Logo rechts -->
      <div v-else key="register" class="auth-layout">
        <div class="form-container">
          <!-- Lazy-loaded Register-Komponente -->
          <RegisterComponent 
            @switchToLogin="switchToLogin" 
            @registerSuccess="handleSuccess" 
          />
        </div>
        <div class="logo-container">
          <!-- <img src="/logo.png" alt="Logo" class="logo" /> -->
           <div>LOGO</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { defineAsyncComponent } from 'vue'

// Variable zur Steuerung des Modus ('login' oder 'register')
const mode = ref('login')
const router = useRouter()

// Lazy‑Loading der beiden Komponenten:
const LoginComponent = defineAsyncComponent(() =>
  import('@/components/Auth/LoginComponent.vue')
)
const RegisterComponent = defineAsyncComponent(() =>
  import('@/components/Auth/RegisterComponent.vue')
)

// Funktionen zum Wechseln des Modus:
const switchToRegister = () => {
  mode.value = 'register'
}
const switchToLogin = () => {
  mode.value = 'login'
}

// Bei Erfolg (Login oder Registrierung) zur HomeView weiterleiten:
const handleSuccess = () => {
  router.push('/')  // Annahme: Die HomeView ist unter "/" erreichbar
}
</script>

<style scoped>
/* Container füllt den gesamten Bildschirm */
.auth-container {
  display: flex;
  height: 100dvh;
  width: 100dvw;
}

/* Basislayout: zwei Spalten (flex) */
.auth-layout {
  display: flex;
  flex: 1;
}

/* Im Login-Modus: Linke Spalte = Logo, rechte Spalte = Formular */
.auth-layout > .logo-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
}
.auth-layout > .form-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}

/* Transition für sanften Wechsel */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* Logo-Styling */
.logo {
  max-width: 80%;
  height: auto;
}
</style>
