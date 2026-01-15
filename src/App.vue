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
          <router-link to="/" exact>
            <span class="houses-text">Houses</span>
            <img
              src="./assets/ic_mobile_navigarion_home@3x.png"
              alt="Houses"
              class="icon icon-default"
            />
            <img
              src="./assets/ic_mobile_navigarion_home_active@3x.png"
              alt="Houses"
              class="icon icon-active"
            />
          </router-link>
          <router-link to="/about">
            <span class="about-text">About</span>
            <img
              src="./assets/ic_mobile_navigarion_info@3x.png"
              alt="About"
              class="icon icon-default"
            />
            <img
              src="./assets/ic_mobile_navigarion_info_active@3x.png"
              alt="About"
              class="icon icon-active"
            />
          </router-link>
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
.icon {
  display: none;
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

/* ===== MOBILE ===== */
@media (max-width: 431px) {
  main {
    padding-bottom: 150px;
  }

  header {
    height: 80px;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1000;
    border-top: 1px solid #e5e5e5;
  }

  .stable-header {
    justify-content: center;
    padding: 0rem;
  }

  .logo-link {
    display: none;
  }

  nav {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    align-items: center;
  }

  nav a {
    font-size: 14px;
  }

  /* nav a.router-link-active img.icon:active{
    display: block;
    height: 100%;
  } */

  .houses-text,
  .about-text {
    display: none;
  }

  /* показываем обычную иконку */
  .icon {
    height: 40px;
  }

  .icon-active {
    display: none;
  }

  .icon-default {
    display: block;
  }

  /* АКТИВНАЯ ССЫЛКА
  .router-link-active {
    background: var(--color-element-primary);
  } */

  .router-link-active .icon-default {
    display: none;
  }

  .router-link-active .icon-active {
    display: block;
  }
}
</style>
