<template>
  <div class="grid">
    <header id="header">
      <Header />
    </header>

    <nav id="navigation">
      <NavMenu />
    </nav>

    <main id="main">
      <h1>CONTENT</h1>
    </main>
  </div>
</template>

<script setup>
import Header from '@/components/Shared/Header.vue';
import NavMenu from '@/components/Shared/NavMenu.vue';
</script>

<style lang="css" scoped>
.grid{
  display: grid;
  grid-template-columns: var(--nav-width) 1fr;
  grid-template-rows: var(--header-height) 1fr;
  grid-template-areas: 
  "navigation header"
  "navigation main";
  height: 100vh;
}

#header {
  grid-area: header;
}

#navigation {
  grid-area: navigation;
}

#main {
  grid-area: main;
  background-color: green;
}
</style>