

<template>
  <div>
    <!--  Header -->
    <header>
      <!-- Logo -->
      <router-link to="/" class="logo-link">
        <img src="@/assets/img_logo_dtt@3x.png" alt="Logo" class="logo" />
      </router-link>

      <!-- Navigation -->
      <nav>
        <router-link to="/" exact>Houses</router-link>
        <router-link to="/about">About</router-link>
        <!-- <router-link to="/houses/create">Create new</router-link> -->
      </nav>
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<style>
header {
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  background-color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.logo-link img{
  height: 40px;
}

nav {
  display: flex;
  gap: 1.5rem;
}


nav a {
  text-decoration: none;
  color: #8a8a8a;
  font-weight: 500;
  transition: color 0.2s;
}


nav a.router-link-active {
  color: rgb(22, 22, 22); 
  font-weight: 700;
}


nav a:hover {
  color: rgb(22, 22, 22);
}


main {
  padding: 2rem;
}
body{
  background-color: #f8f8f8;
}
</style>
