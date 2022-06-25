<template>
  <div class="page">
    <div class="messages">
      <div class="messages__container">
        <div class="messages__container__sidebar">
          <div class="messages__container__sidebar__inputBox">
            <input type="text" placeholder="Search" />
            <icon-library
              name="searchInput"
              class="messages__container__sidebar__inputBox__searchIcon"
            />
          </div>
          <div class="messages__container__sidebar__messages">
            <div
              class="messages__container__sidebar__messages__message"
              v-for="(convo, index) in store.chat"
              :key="convo.chatedWith.id"
              :index="index"
            >
              <img
                :src="convo.chatedWith.profileImg"
                class="
                  messages__container__sidebar__messages__message__profileImg
                "
                @click="store.visibleChat = index"
              />
              <h3 @click="store.visibleChat = index">
                {{ convo.chatedWith.name }}
              </h3>
            </div>
          </div>
        </div>
        <div
          class="messages__container__messageBox"
          v-for="(convo, index) in store.chat"
          :key="convo.chatedWith.id"
          :index="index"
          v-show="store.visibleChat === index"
        >
          <div class="messages__container__messageBox__name">
            <img :src="convo.chatedWith.profileImg" />
            <h3>{{ convo.chatedWith.name }}</h3>
          </div>
          <div class="messages__container__messageBox__messageArea"></div>
          <div class="messages__container__messageBox__newMessage">
            <textarea placeholder="Your message..." />
            <button class="primary-button">Send</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import IconLibrary from "@/components/IconLibrary.vue";

export default {
  name: "Messages",
  data() {
    return {
      store,
    };
  },
  components: {
    IconLibrary,
  },

  mounted() {
    console.log(store.chat);
  },
};
</script>

<style lang="scss">
@import "@/_shared.scss";

.messages {
  margin-bottom: 150px;
  position: relative;
  width: 90%;
  max-width: 850px;
  left: calc(50% + 150px);
  top: calc(50% + 37.5px);
  transform: translate(-50%, -50%);

  @include breakpoint {
    left: 50%;
  }

  &__container {
    background: #fff;
    min-height: 600px;
    border-radius: 7px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    display: flex;
    margin-bottom: 50px;

    &__sidebar {
      width: 32%;
      border-right: 1px solid color(border);

      &__inputBox {
        position: relative;
        border-bottom: 1px solid color(border);
        padding: 10px;

        input {
          padding: 12px;
          padding-right: 40px;
          border: none;
          border-radius: 20px;
          background-color: color(input);
          width: 100%;
          outline: none;
          font-family: "GothamBook";
        }

        &__searchIcon {
          position: absolute;
          right: 22px;
          top: 18px;
        }
      }

      &__messages {
        &__message {
          display: flex;
          place-items: center;
          padding: 10px;

          &__profileImg {
            border-radius: 50%;
            height: 38px;
            width: 38px;
            margin-right: 10px;
          }
        }
      }
    }

    &__messageBox {
      width: 68%;

      &__name {
        display: flex;
        padding: 10px;
        padding-left: 20px;
        place-items: center;
        border-bottom: 1px solid color(border);

        img {
          border-radius: 50%;
          height: 38px;
          width: 38px;
          margin-right: 10px;
        }
      }

      &__messageArea {
        height: 75%;
      }

      &__newMessage {
        border-top: 1px solid color(border);
        display: flex;
        justify-content: space-between;

        textarea {
          padding: 12px;
          border: none;
          width: 80%;
          outline: none;
          font-family: "GothamBook";
          line-height: 1.5;
          resize: none;
          min-height: 90px;
        }

        .primary-button {
          display: block;
          max-height: 40px;
          padding: 10px 15px;
          margin: auto;
        }
      }
    }
  }
}
</style>