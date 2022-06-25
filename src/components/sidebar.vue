<template>
  <div class="sidebar">
    <div class="sidebar__user">
      <router-link
        :to="{
          name: 'MyProfile',
          params: { username: store.currentUser.name },
        }"
      >
        <img :src="store.currentUser.profileImg" height="75" v-if="store.currentUser.profileImg"/>
        <img src="@/assets/user.svg" height="75" v-if="!store.currentUser.profileImg"/>
        <h3>{{ store.currentUser.name }}</h3>
      </router-link>
    </div>
    <div class="sidebar__links">
      <router-link to="/"
        ><span></span>
        <div class="sidebar__links__link">Home</div></router-link
      >
      <router-link to="Messages"
        ><span></span>
        <div class="sidebar__links__link">Messages</div></router-link
      >
      <router-link to="MyCollaborators"
        ><span></span>
        <div class="sidebar__links__link">My Collaborators</div></router-link
      >
      <router-link to="Settings"
        ><span></span>
        <div class="sidebar__links__link">Settings</div></router-link
      >
      <router-link
        :to="{
          name: 'MyProfile',
          params: { username: store.currentUser.name },
        }"
        ><span></span>
        <div class="sidebar__links__link">My Profile</div></router-link
      >
    </div>
    <div class="sidebar__links sidebar__links__logout">
      <span></span>
      <div class="sidebar__links__link" @click="$emit('logOut')">Log out</div>
    </div>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "sidebar",
  data() {
    return {
      store,
    };
  },
};
</script>

<style lang="scss">
@import "@/_shared.scss";

.sidebar {
  margin-top: 76px;
  position: fixed;
  display: block;
  height: 100vh;
  width: 300px;
  background-color: #fff;
  border-right: 1px solid color(border);
  @include breakpoint {
    transition: all 0.5s ease;
  }

  &__user {
    display: block;
    text-align: center;
    border-bottom: 1px solid color(border);
    padding: 35px;

    img {
      border-radius: 50%;
      margin-bottom: 10px;
    }

    a {
      text-decoration: none;
      color: color(text-color);
    }
  }

  &__links {
    display: block;
    padding: 20px 35px;
    font-size: 16px;
    border-bottom: 1px solid color(border);

    a {
      text-decoration: none;
      color: color(secondary);
      font-weight: 600;
      padding: 15px 0px;
      display: flex;

      &.router-link-exact-active {
        color: color(primary);
        fill: color(primary);
        stroke: color(primary);
      }
    }

    span {
      font-size: 25px;
      margin-right: 20px;
      font-weight: 50;
    }

    &__link {
      padding: 4px 0px;
    }
  }
  &__links__logout {
    border: none;
    text-decoration: none;
    color: color(secondary);
    font-weight: 600;
    display: flex;
    padding: 35px;
    cursor: pointer;
  }
}
</style>