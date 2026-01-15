<template>
  <div class="about">
    <h1>About DTT Real Estate</h1>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti asperiores, amet distinctio excepturi ipsum quibusdam aliquid eum omnis. Ratione odio omnis id. Eum reiciendis dicta laboriosam dignissimos voluptate officia vero! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum quidem nam dolorem ratione excepturi debitis eligendi magnam, hic, ex beatae ducimus architecto accusantium reiciendis animi? Cumque dolores eligendi hic odio?</p>
    <br/>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti asperiores, amet distinctio excepturi ipsum quibusdam aliquid eum omnis.</p>
    <br/>
    <h1>Design and Development</h1>
    <div class="logo-bottom">
      <img src="../assets/img_logo_dtt@3x.png" style="height: 4rem;"/>
      <div>
        By DTT
        <a href="https://www.d-tt.nl/">www.d-tt.nl</a>
      </div>
    </div>
  </div>
</template>

<style>
  .about{
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    font-size: var(--font-secondary);

  }

  .about p{
    color: var(--color-text-secondary);
    line-height: 180%;
    font-weight: 400;
  }
  
  .logo-bottom{
    display: flex;
    gap: 2rem;
  }
  .logo-bottom div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--color-text-secondary);
    
  }
  .logo-bottom div a{
    text-decoration: none;
    color: var(--color-text-hyperlink);
  }

</style>
