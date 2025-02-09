<template>
  <div class="login-component">
    <h2>Login</h2>
    <form @submit.prevent="submitLogin">
      <div class="form-group">
        <label for="username">Benutzername</label>
        <input id="username" v-model="username" type="text" required />
      </div>
      <div class="form-group">
        <label for="password">Passwort</label>
        <input id="password" v-model="password" type="password" required />
      </div>
      <button type="submit">Anmelden</button>
    </form>
    <p class="switch-text">
      Noch keinen Account? 
      <button @click="switchToRegister" class="link-button">Registrieren</button>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// Falls Du einen Auth-Store nutzt, kannst Du diesen importieren:
// import { useAuthStore } from '@/stores/authStore'

const username = ref('')
const password = ref('')

// Mit defineEmits werden Events an den Parent gesendet:
const emit = defineEmits(['switchToRegister', 'loginSuccess'])

const submitLogin = async () => {
  // Hier sollte die eigentliche Login-Logik (z.B. API-Aufruf) erfolgen.
  // Beispiel (Simulation):
  // const authStore = useAuthStore();
  // await authStore.login({ username: username.value, password: password.value });
  emit('loginSuccess')
}

const switchToRegister = () => {
  emit('switchToRegister')
}
</script>

<style scoped>
.login-component {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
}

button {
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.link-button {
  background: none;
  border: none;
  color: blue;
  text-decoration: underline;
  cursor: pointer;
  padding: 0;
}

.switch-text {
  margin-top: 1rem;
}
</style>
