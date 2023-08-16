<script>
    import { RouterLink, RouterView } from 'vue-router'

</script>



<template>
      <nav class="sidebar-nav">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/notifications">Notifications</RouterLink>
        <RouterLink to="/profile">Profile</RouterLink>

      </nav>
</template>

<style>
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center; 
  margin-top: 2rem;
  height: 100%; 
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.sidebar {
  flex: 0 0 20%;
  background-color: #f0f0f0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>