<template>
  <div class="register-component">
    <h2>Registrierung</h2>
    <form @submit.prevent="submitRegister">
      <div class="form-group">
        <label for="username">Benutzername</label>
        <input id="username" v-model="username" type="text" required />
      </div>
      <div class="form-group">
        <label for="password">Passwort</label>
        <input id="password" v-model="password" type="password" required />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Passwort bestätigen</label>
        <input id="confirmPassword" v-model="confirmPassword" type="password" required />
      </div>
      <button type="submit">Registrieren</button>
    </form>
    <p class="switch-text">
      Bereits registriert? 
      <button @click="switchToLogin" class="link-button">Zum Login</button>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const confirmPassword = ref('')

const emit = defineEmits(['switchToLogin', 'registerSuccess'])

const submitRegister = async () => {
  if (password.value !== confirmPassword.value) {
    alert("Passwörter stimmen nicht überein!")
    return
  }
  // Hier sollte die eigentliche Registrierungs-Logik erfolgen (z.B. API-Aufruf).
  // Beispiel:
  // const authStore = useAuthStore();
  // await authStore.register({ username: username.value, password: password.value });
  emit('registerSuccess')
}

const switchToLogin = () => {
  emit('switchToLogin')
}
</script>

<style scoped>
.register-component {
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
