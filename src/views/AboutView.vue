<template>
  <div class="about-page">
    <div class="mobile"><h1>About</h1></div>
    <h2>About DTT Real Estate</h2>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti asperiores, amet distinctio
      excepturi ipsum quibusdam aliquid eum omnis. Ratione odio omnis id. Eum reiciendis dicta
      laboriosam dignissimos voluptate officia vero! Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Dolorum quidem nam dolorem ratione excepturi debitis eligendi magnam, hic,
      ex beatae ducimus architecto accusantium reiciendis animi? Cumque dolores eligendi hic odio?
    </p>
    <br />
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti asperiores, amet distinctio
      excepturi ipsum quibusdam aliquid eum omnis.
    </p>
    <br />
    <h2>Design and Development</h2>
    <div class="logo-bottom">
      <img src="../assets/img_logo_dtt@3x.png" />
      <div>
        <span>By DTT</span>
        <a href="https://www.d-tt.nl/">www.d-tt.nl</a>
      </div>
    </div>
  </div>
</template>

<style>
.about-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-size: var(--font-secondary);
}

.mobile {
  display: none;
}

.about-page p {
  color: var(--color-text-secondary);
  line-height: 180%;
  font-weight: 400;
}

.logo-bottom {
  display: flex;
  gap: 2rem;
}
.logo-bottom div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-text-secondary);
}
.logo-bottom div a {
  text-decoration: none;
  color: var(--color-text-hyperlink);
}

.logo-bottom img {
  height: 4rem;
}

@media (max-width: 800px) {
  .about-page {
    padding-bottom: 150px;
    padding: 1rem 2rem 0 2rem;
  }
  .mobile {
    display: flex;
    justify-content: center;
  }
  .logo-bottom {
    gap: 1rem;
    align-items: center;
  }
  .logo-bottom img {
    height: 2rem;
  }
  .logo-bottom div {
    font-size: 0.8rem;
  }
}
</style>
