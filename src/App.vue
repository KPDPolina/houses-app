

<template>
  <div>
    <!--  Header -->
    <header>
      <div class="stable-header">
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
      </div>
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<style>




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




</style>
