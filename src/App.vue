<template>
  <div id="app">
    <div class="nav" v-if="store.currentUser">
      <div class="nav__logo">
        <router-link to="/" href="#">
          <img
            src="@/assets/Logo-purple.svg"
            alt="PromoteZone-logo"
            height="45"
          />
        </router-link>
      </div>

      <div class="nav__search">
        <input
          placeholder="Search"
          v-model="searchTerm"
          :style="[searchTerm ? { background: '#f2f2f2' } : {}]"
        />
        <icon-library name="searchInput" class="nav__search__icon" />
        <img
          src="@/assets/x.svg"
          class="x-icon"
          v-if="searchTerm"
          @click="searchTerm = ''"
        />
        <div class="nav__search__box" v-if="searchTerm">
          <div class="nav__search__box__results">
            <div
              v-for="card in searchedCards"
              :key="card.id"
              class="nav__search__box__results__result"
            >
              <router-link
                :to="{
                  name: 'Profile',
                  params: { profileName: card.name },
                }"
              >
                <img
                  :src="card.profileImg"
                  @click="
                    store.profileData = card;
                    searchTerm = '';
                  "
                />
                <p
                  @click="
                    store.profileData = card;
                    searchTerm = '';
                  "
                >
                  {{ card.name }}
                </p>
              </router-link>
            </div>
          </div>
          <p class="no-result" v-if="searchedCards.length < 1">No results</p>
        </div>
      </div>

      <div class="nav__icons">
        <button
          type="button"
          @click="toggleModal()"
          class="nav__icons__burger"
          ref="sidebarModalToggle"
        >
          <icon-library name="burger"></icon-library>
        </button>
        <button
          class="nav__icons__search nav__icons__icon"
          @click="toggleSearch()"
          ref="searchDropdownMobileToggle"
        >
          <icon-library name="search"></icon-library>
        </button>
        <icon-library name="chat" class="nav__icons__icon"></icon-library>
        <img
          v-if="store.currentUser.profileImg"
          :src="store.currentUser.profileImg"
          class="profileIcon"
          @click="profileDropdownVisible = !profileDropdownVisible"
          ref="profileDropdownToggle"
        />
        <img
          v-if="!store.currentUser.profileImg"
          src="@/assets/user-black.svg"
          class="profileIcon"
          @click="profileDropdownVisible = !profileDropdownVisible"
          ref="profileDropdownToggle"
        />
      </div>

      <div
        class="nav__profileDropdown"
        v-if="profileDropdownVisible"
        ref="profileDropdown"
      >
        <ul>
          <li>
            <router-link
              :to="{
                name: 'MyProfile',
                params: { username: store.currentUser.name },
              }"
            >
              <span class="icon" @click="profileDropdownVisible = false"
                ></span
              >
              <span @click="profileDropdownVisible = false">My Profile</span>
            </router-link>
          </li>

          <li>
            <span class="icon"></span>
            <span>My Collaborators</span>
          </li>
          <li>
            <span class="icon"></span>
            <span>Settings</span>
          </li>
          <li class="logout">
            <div
              @click="
                logOut();
                profileDropdownVisible = false;
              "
            >
              <span class="icon"></span>
              <span>Log out</span>
            </div>
          </li>
        </ul>
      </div>

      <div class="nav__searchDropdownMobile" v-if="searchDropdownMobileVisible" ref="searchDropdownMobile">
        <input type="text" placeholder="Search" v-model="searchTerm"/>
        <img
          src="@/assets/x.svg"
          class="x-icon"
          v-if="searchTerm"
          @click="searchTerm = ''"
        />
        <div class="nav__searchDropdownMobile__box" v-if="searchTerm">
          <div
            v-for="card in searchedCards"
            :key="card.id"
            class="nav__searchDropdownMobile__box__result"
          >
            <router-link
              :to="{
                name: 'Profile',
                params: { profileName: card.name },
              }"
            >
              <img
                :src="card.profileImg"
                @click="
                  store.profileData = card;
                  searchTerm = '';
                "
              />
              <p
                @click="
                  store.profileData = card;
                  searchTerm = '';
                "
              >
                {{ card.name }}
              </p>
            </router-link>
          </div>
        </div>
        <p class="no-result" v-if="searchedCards.length < 1">No results</p>
      </div>
    </div>

    <div class="flex">
      <sidebar
        v-if="store.currentUser && sidebarActive"
        @logOut="logOut()"
      ></sidebar>
      <transition name="modal">
        <sidebar-modal
          v-if="store.currentUser && modalActive"
          @logOut="logOut()"
        ></sidebar-modal>
      </transition>
      <router-view />
    </div>
  </div>
</template>

<script>
import IconLibrary from "@/components/IconLibrary.vue";
import store from "@/store";
import profileService from "@/profileService";
import { auth, onAuthStateChanged, doc, getDoc, db, signOut } from "@/firebase";
import router from "@/router";
import sidebar from "@/components/sidebar.vue";
import sidebarModal from "@/components/sidebarModal.vue";

onAuthStateChanged(auth, async (user) => {
  const currentRoute = router.currentRoute;

  if (currentRoute.name == "Register") {
    setTimeout(async () => {
      if (user) {
        const docRef = doc(db, "accounts", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          store.currentUser = docSnap.data();
          profileService.getProfiles();
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
        if (!currentRoute.meta.needsUser) {
          router.push({ name: "Home" });
        }
      } else {
        store.currentUser = null;
        console.log("No user");
      }
    }, store.loadingTime);
  } else {
    if (user) {
      const docRef = doc(db, "accounts", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        store.currentUser = docSnap.data();
        profileService.getProfiles();
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
      if (!currentRoute.meta.needsUser) {
        router.push({ name: "Home" });
      }
    } else {
      store.currentUser = null;
      console.log("No user");
      if (currentRoute.meta.needsUser) {
        router.push({ name: "FrontPage" });
      }
    }
  }
});

export default {
  data() {
    return {
      sidebarActive: true,
      modalActive: false,
      width: null,
      store,
      searchTerm: "",
      profileDropdownVisible: false,
      searchDropdownMobileVisible: false,
    };
  },

  computed: {
    searchedCards() {
      return store.cards.filter((card) =>
        card.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },

  mounted() {
    this.checkScreen();
    window.addEventListener("resize", this.checkScreen);
    document.addEventListener("click", this.closeProfileDropdown);
    document.addEventListener("click", this.closeSidebarModal);
    document.addEventListener("click", this.closeSearchDropdownMobile);
  },

  beforeDestroy() {
    document.removeEventListener("click", this.closeProfileDropdown);
    document.removeEventListener("click", this.closeSidebarModal);
    document.removeEventListener("click", this.closeSearchDropdownMobile);
  },

  components: {
    IconLibrary,
    sidebar,
    sidebarModal,
  },
  methods: {
    toggleModal(e) {
      this.modalActive = !this.modalActive;
    },
    toggleSearch() {
      this.searchDropdownMobileVisible = !this.searchDropdownMobileVisible;
    },
    checkScreen() {
      this.width = window.innerWidth;
      if (this.width <= 1250) {
        this.sidebarActive = false;
      } else {
        this.modalActive = false;
        this.sidebarActive = true;
      }
    },

    logOut() {
      signOut(auth)
        .then(() => {
          console.log("Signout succesfull!");
          this.modalActive = false;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    closeProfileDropdown(e) {
      let el = this.$refs.profileDropdown;
      let toggle = this.$refs.profileDropdownToggle;
      let target = e.target;
      if (el !== target && !el.contains(target) && target !== toggle) {
        this.profileDropdownVisible = false;
      }
    },
    closeSidebarModal(e) {
      let toggle = this.$refs.sidebarModalToggle;
      let target = e.target;
      console.log(target);
      if (!toggle.contains(target)) {
        this.modalActive = false;
      }
    },
    closeSearchDropdownMobile(e) {
      let el = this.$refs.searchDropdownMobile;
      let toggle = this.$refs.searchDropdownMobileToggle;
      let target = e.target;
      if (el !== target && !el.contains(target) && !toggle.contains(target)) {
        this.searchDropdownMobileVisible = false;
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/_shared.scss";

@font-face {
  font-family: "GothamBook";
  src: local("GothamBook"), url(./fonts/GothamBook.ttf) format("truetype");
}

@font-face {
  font-family: "icons";
  src: local("icons"), url(./fonts/icons.ttf) format("truetype");
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: "GothamBook", "icons";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: color(text-color);
  background-color: color(background-color);
}

.modal-leave-active {
  opacity: 0;
  transition: all 0.5s ease;
}

.modal-enter .modal__sidebar,
.modal-leave-active .modal__sidebar {
  transform: translateX(-300px);
  transition: all 0.5s ease;
}

.nav {
  display: flex;
  background-color: #fff;
  border-bottom: 1px solid color(border);
  position: fixed;
  width: 100%;
  z-index: 1;

  &__logo {
    min-width: 300px;
    max-width: 300px;
    padding: 15px;
    border-right: 1px solid color(border);

    img {
      max-width: 100%;
      margin: auto;
      display: block;
    }

    @include breakpoint2 {
      min-width: 200px;
      border-right: none;
    }
  }

  &__search {
    width: 40%;
    max-width: 320px;
    margin: auto;
    margin-left: 5%;
    display: flex;
    place-items: center;
    position: relative;

    input {
      padding: 10px;
      border-radius: 20px;
      width: 100%;
      margin: 0 20px;
      padding-left: 45px;
      padding-right: 37px;
      font-size: 15px;
      font-family: "GothamBook";
      outline: none;
      border: none;
      transition: 0.2s ease-in;
      z-index: 2;
    }

    input::placeholder {
      color: color(secondary);
    }

    input:focus {
      background-color: color(input);
    }

    @include breakpoint {
      display: none;
    }

    &__icon {
      position: absolute;
      left: 5%;
      margin-left: 15px;
      margin-top: 3px;
      z-index: 2;
    }

    .x-icon {
      position: absolute;
      right: 5%;
      margin-right: 20px;
      height: 12px;
      width: 12px;
      z-index: 2;
      cursor: pointer;
    }

    &__box {
      background-color: #fff;
      position: absolute;
      top: -20px;
      width: 100%;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      border-radius: 0 0 5px 5px;
      overflow: hidden;

      &__results {
        margin-top: 75px;
        max-height: 250px;
        overflow: auto;

        &__result {
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 12px;
          }

          p {
            font-size: 18px;
          }

          a {
            text-decoration: none;
            color: color(text-color);
            display: flex;
            place-items: center;
            padding: 10px 20px;
          }
          a:hover {
            background-color: #f7f7f7;
          }
        }
      }

      .no-result {
        margin: 20px;
      }
    }
  }

  &__searchDropdownMobile {
    position: absolute;
    background: #fff;
    right: 105px;
    top: 65px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius: 5px;
    width: 222px;
    display: none;

    @include breakpoint {
    display: block;
    }

    input {
      padding: 10px;
      border-radius: 20px;
      width: 202px;
      padding-right: 37px;
      font-size: 15px;
      margin: 10px;
      font-family: "GothamBook";
      outline: none;
      border: none;
      transition: 0.2s ease-in;
      z-index: 2;
      background: color(input);
    }

    input::placeholder {
      color: color(secondary);
    }

    .x-icon {
      position: absolute;
      height: 12px;
      width: 12px;
      margin-top: 22px;
      right: 24px;
      z-index: 2;
      cursor: pointer;
    }

    &__box {
      max-height: 250px;
      overflow: auto;

      &__result {
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 12px;
        }

        p {
          font-size: 18px;
        }

        a {
          text-decoration: none;
          color: color(text-color);
          display: flex;
          place-items: center;
          padding: 10px 20px;
        }
        a:hover {
          background-color: #f7f7f7;
        }
      }
    }
    .no-result {
      margin: 10px 20px 20px 20px;
    }
  }

  &__icons {
    display: flex;
    width: 100%;
    justify-content: right;
    place-items: center;
    padding-right: 15px;
    gap: 15px;

    &__burger {
      appearance: none;
      outline: none;
      border: none;
      background: none;
      display: none;
      cursor: pointer;
      width: 30px;
      height: 30px;

      @include breakpoint {
        display: block;
      }
    }

    &__icon {
      max-width: 100%;
      display: flex;
      place-items: center;
      width: 30px;
      height: 30px;
    }

    &__search {
      display: none;
      background: none;
      border: none;
      outline: none;
      cursor: pointer;

      @include breakpoint {
        display: block;
      }
    }

    .profileIcon {
      height: 30px;
      width: 30px;
      border-radius: 50%;
      cursor: pointer;
    }
  }

  &__profileDropdown {
    background: #fff;
    position: absolute;
    right: 10px;
    top: 65px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius: 5px;
    padding-top: 15px;

    ul {
      list-style: none;

      a {
        text-decoration: none;
        display: flex;
        place-items: center;
        color: color(secondary);

        &.router-link-exact-active {
          color: color(primary);
          fill: color(primary);
          stroke: color(primary);

          span:not(.icon) {
            font-weight: 600;
          }
        }
      }

      li {
        font-size: 16px;
        padding: 10px 25px;
        color: color(secondary);
        display: flex;
        place-items: center;

        .icon {
          font-size: 25px;
          padding-right: 12px;
        }
      }
      .logout {
        border-top: 1px solid color(border);
        margin-top: 10px;
        padding: 15px 25px;

        span {
          cursor: pointer;
        }
      }
    }
  }
}

.flex {
  display: flex;
  min-height: 100vh;
}

::-webkit-scrollbar {
  width: 7px;
}
::-webkit-scrollbar-track {
  background: color(input);
}
::-webkit-scrollbar-thumb {
  background: color(secondary);
}
::-webkit-scrollbar-thumb:hover {
  background: #6d6b7a;
}

.carousel {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.815);
  display: table;
  transition: all 0.5s ease;

  .img-slide {
    width: 60%;
    height: 40vw;
    border-radius: 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: color(background-color);
    overflow: hidden;
    display: flex;

    @include breakpoint {
      display: block;
      height: auto;
      width: 350px;
    }

    .image {
      width: 50%;
      min-width: 350px;
      object-fit: cover;
      position: relative;

      @include breakpoint {
        height: 500px;
      }
    }

    &__heading-mobile {
      place-items: center;
      padding: 15px;
      display: none;

      @include breakpoint {
        display: flex;
      }
    }

    .profileImg {
      height: 30px;
      min-width: auto;
      width: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }

    &__content {
      width: 50%;
      border-left: 1px solid color(border);

      @include breakpoint {
        width: auto;
      }

      &__heading {
        display: flex;
        place-items: center;
        margin-bottom: 20px;
        padding: 30px 30px 0;

        @include breakpoint {
          display: none;
        }
      }

      &__location {
        padding-left: 50px;
        border-bottom: 1px solid color(border);
        width: 100%;
        display: block;
        padding-bottom: 30px;
        margin-bottom: 20px;

        @include breakpoint {
          padding: 15px 15px 10px 15px;
          border: none;
          margin-bottom: 0px;
        }
      }

      &__tags {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin: 0 30px;

        @include breakpoint {
          margin: 0 15px 10px 15px;
        }

        &__tag {
          padding: 12px 15px;
          background: color(input);
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
        }
      }

      p {
        font-size: 18px;
        line-height: 1.5;
        margin-top: 50px;
        padding: 0px 30px;

        @include breakpoint {
          margin: 0;
          padding: 0px 15px 15px 30px;
          font-size: 16px;
        }
      }
    }
  }
}
.next,
.prev {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  background: none;
  border: none;
  outline: none;
  color: #fff;
  font-size: 30px;
  cursor: pointer;
  transition: 0.5s ease;
}
.next {
  right: 30px;
}
.next:hover {
  transform: translateY(-50%) translateX(2px);
}
.prev:hover {
  transform: translateY(-50%) translateX(-2px);
}
.prev {
  left: 30px;
}
.close {
  position: absolute;
  z-index: 2;
  background: none;
  border: none;
  outline: none;
  color: #fff;
  font-size: 30px;
  cursor: pointer;
  right: 30px;
  top: 30px;
  transition: 0.5s ease;

  @include breakpoint {
    right: 15px;
    top: 15px;
  }
}
.close:hover {
  transform: scale(1.12);
}
.carousel-enter {
  opacity: 0;
}
.carousel-leave-active {
  opacity: 0;
  transition: all 0.5s ease;
  transition-delay: 0.3s;
}
.carousel-enter-active {
  animation: bounce-in 1s;
}
.carousel-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.01);
  }
  100% {
    transform: scale(1);
  }
}
</style>
