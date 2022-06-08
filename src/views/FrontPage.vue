<template>
  <div class="frontPage">
    <div class="frontPage__header">
      <img
        class="frontPage__header__logo"
        src="@/assets/Logo-purple.svg"
        height="45"
        alt="promotezone logo"
      />
      <router-link to="/Register"
        ><button class="primary-button register-btn">
          Register
        </button></router-link
      >
      <router-link to="/Login"
        ><button class="primary-button">Login</button></router-link
      >
    </div>
    <div class="frontPage__content">
      <div class="frontPage__content__text">
        <h1>
          A ZONE WHERE <br />BRANDS AND<br />
          PROMOTERS <br />COLLIDE
        </h1>
        <br />
        <p>Find brands to promote or <br />market your own.</p>
        <br />
        <img src="@/assets/front-page.svg" height="260" class="img-mobile" />
        <router-link to="/Register"
          ><button class="primary-button">REGISTER NOW</button></router-link
        >
      </div>
      <div class="frontPage__content__img">
        <img src="@/assets/front-page.svg" height="370" class="img-desktop" />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "@/_shared.scss";

.frontPage {
  width: 90%;
  max-width: 1300px;
  margin: 0 auto;

  &__header {
    display: flex;
    padding: 40px;
    gap: 30px;

    &__logo {
      margin-right: auto;
    }

    .primary-button {
      font-weight: 600;
      min-width: 110px;
    }
  }

  &__content {
    display: flex;
    position: relative;
    padding: 40px 80px 0px 80px;
    top: calc(50% - 125px);
    transform: translateY(-50%);

    &__text {
      width: 50%;
      min-width: 292px;
      line-height: 1.5;
      font-size: 1.1em;
      position: relative;

      .primary-button {
        font-weight: 600;
      }
    }

    &__text::after {
      content: "";
      position: absolute;
      width: 5px;
      top: 10px;
      left: -25px;
      height: 190px;
      background: color(primary);
    }

    &__img {
      width: 50%;
      text-align: right;
    }
  }
}

.img-mobile {
  display: none;
  margin-bottom: 40px;
}

@media only screen and (max-width: 852px) {
  .frontPage__header {
    gap: 10px;
    padding-left: 0px;
    padding-right: 0px; 

    .register-btn {
      display: none;
    }
  }

  .frontPage__content {
    padding-top: 100px;
    display: block;
    padding: 80px 30px 0px 30px;

    .primary-button {
      display: block;
      margin: auto;
    }

    a {
      text-decoration: none;
    }
  }

  .img-mobile {
    display: block;
  }

  .img-desktop {
    display: none;
  }
}
</style>