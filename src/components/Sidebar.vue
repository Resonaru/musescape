<script>
    import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
      <nav class="sidebar-nav">
        <RouterLink to="/"><i class="material-icons icon-center">home</i>Home</RouterLink>
        <RouterLink to="/notifications"><i class="material-icons icon-center">notifications</i>Notifications</RouterLink>
        <RouterLink to="/profile"><i class="material-icons icon-center" v-if="loggedIn">account_circle</i>Profile</RouterLink>
        <RouterLink to="/login"><i class="material-icons icon-center">account_circle</i>Login</RouterLink>
        
        <!-- TODO: if user is logged in, show profile, else show login -->
      </nav>
</template>

<style>
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center; 
  padding-left:20px;
  height: 100%; 
}

nav a.router-link-exact-active {
  color: rgb(24, 249, 174);
  font-weight:bold;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
  border-radius: 10px;
}

nav a {
  display: inline-block;
  padding: 1rem;
  padding-left:5rem;
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

.icon-center {
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  padding-right:5px;
  padding-bottom:5px;
}
</style>