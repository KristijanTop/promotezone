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
              <div
                @click="
                  store.profileData = card;
                  searchTerm = '';
                "
              >
                <router-link
                  :to="{
                    name: 'Profile',
                    params: { profileName: card.name },
                  }"
                >
                  <img :src="card.profileImg" />
                  <p>
                    {{ card.name }}
                  </p>
                </router-link>
              </div>
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
        <button
          class="nav__icons__icon nav__icons__chat"
          @click="chatDropdownVisible = !chatDropdownVisible"
          ref="chatDropdownToggle"
        >
          <icon-library name="chat" class="nav__icons__icon"></icon-library>
        </button>
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
        class="nav__chatDropdown"
        v-if="chatDropdownVisible"
        ref="chatDropdown"
      >
        <h3>Messages</h3>
        <div class="nav__chatDropdown__messageArea">
          <p
            v-if="store.chat.length === 0"
            class="nav__chatDropdown__messageArea__noChats"
          >
            You currently have no active chats.
          </p>
          <div
            class="nav__chatDropdown__messageArea__message"
            v-for="convo in store.chat.slice(0, 3)"
            :key="convo.chatedWith.id"
            @click="openChat(convo)"
          >
            <img :src="convo.chatedWith.profileImg" />
            <div class="nav__chatDropdown__messageArea__message__content">
              <div
                class="
                  nav__chatDropdown__messageArea__message__content__heading
                "
              >
                <p
                  class="
                    nav__chatDropdown__messageArea__message__content__heading__name
                  "
                >
                  <strong>{{ convo.chatedWith.name }}</strong>
                </p>
                <p
                  v-if="convo.messages.length > 0"
                  class="
                    nav__chatDropdown__messageArea__message__content__heading__sentAgo
                  "
                >
                  {{ sentAgo(convo.messages[convo.messages.length - 1].time) }}
                </p>
              </div>
              <p
                v-if="convo.messages.length > 0"
                class="
                  nav__chatDropdown__messageArea__message__content__lastMsg
                "
              >
                {{
                  convo.messages[convo.messages.length - 1].id ==
                  store.currentUser.uid
                    ? "You:"
                    : ""
                }}
                {{ convo.messages[convo.messages.length - 1].value }}
              </p>
            </div>
          </div>
        </div>
        <router-link to="Messages" v-if="store.chat.length !== 0"
          ><p @click="chatDropdownVisible = false">See all</p></router-link
        >
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
            <router-link to="Settings">
              <span class="icon" @click="profileDropdownVisible = false"
                ></span
              >
              <span @click="profileDropdownVisible = false">Settings</span>
            </router-link>
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

      <div
        class="nav__searchDropdownMobile"
        v-if="searchDropdownMobileVisible"
        ref="searchDropdownMobile"
      >
        <input type="text" placeholder="Search" v-model="searchTerm" />
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
            <div
              @click="
                store.profileData = card;
                searchTerm = '';
              "
            >
              <router-link
                :to="{
                  name: 'Profile',
                  params: { profileName: card.name },
                }"
              >
                <img :src="card.profileImg" />
                <p>
                  {{ card.name }}
                </p>
              </router-link>
            </div>
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
import moment from "moment";
import profileService from "@/profileService";
import messagesService from "@/messagesService";
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
          await profileService.getProfiles();
          await messagesService.getMessages();
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
        await profileService.getProfiles();
        await messagesService.getMessages();
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
      chatDropdownVisible: false,
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
    document.addEventListener("click", this.closeChatDropdown);
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

    openChat(convo) {
      store.visibleChat = convo.id;
      store.specificChatOpened = true;
      this.chatDropdownVisible = false;
      router.push({ name: "Messages" });
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

    closeChatDropdown(e) {
      let el = this.$refs.chatDropdown;
      let toggle = this.$refs.chatDropdownToggle;
      let target = e.target;
      if (el !== target && !el.contains(target) && !toggle.contains(target)) {
        this.chatDropdownVisible = false;
      }
    },

    sentAgo(time) {
      if (moment(time).fromNow() == "a few seconds ago") {
        return "now";
      }
      return moment(time).fromNow();
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
  z-index: 10;

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

    &__chat {
      background: none;
      border: none;
      outline: none;
      cursor: pointer;
    }

    .profileIcon {
      height: 30px;
      width: 30px;
      border-radius: 50%;
      cursor: pointer;
    }
  }

  &__chatDropdown {
    background: #fff;
    position: absolute;
    right: 60px;
    top: 65px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius: 5px;
    min-width: 300px;

    h3 {
      padding: 12px;
    }

    &__messageArea {
      border-top: 1px solid color(border);
      border-bottom: 1px solid color(border);

      &__noChats {
        padding: 12px;
      }

      &__message {
        display: flex;
        place-items: center;
        padding: 12px;
        cursor: pointer;
        width: 100%;

        &__content {
          &__heading {
            display: flex;
            justify-content: space-between;
            place-items: flex-end;

            &__name {
              width: 12ch;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            &__sentAgo {
              color: color(secondary);
              font-size: 11px;
              text-align: right;
            }
          }

          &__lastMsg {
            width: 20ch;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-top: 5px;
            color: color(secondary);
          }
        }
      }

      &__message:hover {
        background: color(input);
      }
    }

    a {
      text-decoration: none;
      color: color(primary);
      padding: 12px;
      display: block;
      text-align: center;
    }

    img {
      border-radius: 50%;
      height: 38px;
      width: 38px;
      margin-right: 10px;
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

        div {
          display: flex;
          place-items: center;
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

.page {
  width: 100vw;
}

::-webkit-scrollbar {
  width: 7px;
}
::-webkit-scrollbar-track {
  background: #e4e4e4;
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
        margin-bottom: 50px;

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
        padding: 0px 30px;

        @include breakpoint {
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

.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 70px;
  width: 70px;
  margin-left: -35px;
  margin-top: -35px;
  -webkit-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
  border: 3px solid #ddd;
  border-top: 3px solid color(primary);
  border-radius: 50%;
}

@-webkit-keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.discardDescBtn:hover,
.updateDescBtn:hover {
  transform: scale(1.1);
}

.popUp-enter {
  opacity: 0;
}
.popUp-leave-active {
  opacity: 0;
  transition: all 0.5s ease;
  transition-delay: 0.3s;
}
.popUp-enter-active {
  animation: bounce-in-delete 0.5s;
}
.popUp-leave-active {
  animation: bounce-in-delete 0.5s reverse;
}
@keyframes bounce-in-delete {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.07);
  }
  100% {
    transform: scale(1);
  }
}
</style>
