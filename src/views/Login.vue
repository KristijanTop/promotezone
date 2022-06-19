<template>
  <div class="login">
    <div class="login__container">
      <img src="@/assets/Logo-up.svg" alt="logo" height="90" class="logo" />
      <p>Email adress</p>
      <input type="text" placeholder="Email adress" v-model="email" />
      <p>Password</p>
      <input
        :type="visiblePassword"
        placeholder="Password"
        v-model="password"
      />
      <img
        src="@/assets/eye.svg"
        class="login__container__eye"
        v-if="visiblePassword == 'password'"
        @click="showPassword()"
      />
      <img
        src="@/assets/eye-off.svg"
        class="login__container__eye"
        v-if="visiblePassword == 'text'"
        @click="hidePassword()"
      />
      <button class="primary-button" @click="login()">Log in</button>
    </div>
  </div>
</template>

<script>
import { auth, signInWithEmailAndPassword } from "@/firebase";

export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      visiblePassword: "password",
    };
  },

  methods: {
    login() {
      if (this.email == null || this.password == null) {
        alert("Please fill out all fields");
      } else {
        signInWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
          })
          .catch((error) => {
            if (error.code === "auth/wrong-password") {
              alert("Wrong password");
            } else {
              if (error.code === "auth/user-not-found") {
                alert("User with given email doesn't exist");
              } else {
                alert(error.message);
              }
            }
            console.error(error);
          });
      }
    },
    showPassword() {
      this.visiblePassword = "text";
    },
    hidePassword() {
      this.visiblePassword = "password";
    },
  },
};
</script>

<style lang="scss">
@import "@/_shared.scss";

.login {
  width: 100%;
  height: 100vh;

  &__container {
    width: 90%;
    max-width: 400px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    margin: auto;
    padding: 40px;
    border-radius: 10px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    .logo {
      display: block;
      margin: auto;
      margin-bottom: 50px;
    }
    p {
      margin-bottom: 5px;
    }
    input {
      padding: 12px;
      border: none;
      background: rgb(243, 243, 243);
      border-radius: 10px;
      width: 100%;
      margin-bottom: 20px;
      outline: none;
    }
    .primary-button {
      width: 90px;
      margin: auto;
      margin-top: 30px;
      display: block;
    }

    &__eye {
      height: 25px;
      position: absolute;
      cursor: pointer;
      margin-top: 8px;
      margin-left: -35px;
    }
  }
}
</style>