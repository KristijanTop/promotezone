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
          <div class="messages__container__messageBox__messageArea">
            <div
              class="
                messages__container__messageBox__messageArea__messageContainer
              "
              v-for="message in convo.messages"
              :key="message.id"
            >
              <div
                class="
                  messages__container__messageBox__messageArea__messageContainer__message
                "
                :style="[
                  message.id == store.currentUser.uid
                    ? { justifyContent: 'right', flexDirection: 'row-reverse' }
                    : {},
                ]"
              >
                <img
                  :src="
                    message.id == store.currentUser.uid
                      ? store.currentUser.profileImg
                      : convo.chatedWith.profileImg
                  "
                />
                <p
                  :style="[
                    message.id == store.currentUser.uid
                      ? { background: '#5656d8', color: '#fff' }
                      : { background: '#f2f2f2' },
                  ]"
                >
                  {{ message.value }}
                </p>
              </div>
            </div>
          </div>
          <div class="messages__container__messageBox__newMessage">
            <textarea placeholder="Your message..." v-model="message" />
            <button class="primary-button" @click="sendMessage(convo)">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import IconLibrary from "@/components/IconLibrary.vue";
import { db, doc, updateDoc, arrayUnion } from "@/firebase";

export default {
  name: "Messages",
  data() {
    return {
      store,
      message: null,
    };
  },
  components: {
    IconLibrary,
  },

  mounted() {
    this.scrollChatToBottom();
  },

  methods: {
    scrollChatToBottom() {
      let messageArea = document.querySelector(
        ".messages__container__messageBox__messageArea"
      );
      messageArea.scrollTop = messageArea.scrollHeight;
    },
    async sendMessage(convo) {
      if (this.message) {
        let message = {
          value: this.message,
          id: store.currentUser.uid,
        };
        await updateDoc(doc(db, "chat", convo.id), {
          messages: arrayUnion(message),
        });
        this.message = null;
        this.scrollChatToBottom();
      }
    },
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
        padding: 12px;

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
          top: 19px;
        }
      }

      &__messages {
        &__message {
          display: flex;
          place-items: center;
          padding: 12px;

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
        padding: 12px;
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
        height: 445.5px;
        overflow: auto;

        &__messageContainer {
          margin: 20px 0;

          &__message {
            display: flex;

            img {
              height: 38px;
              width: 38px;
              border-radius: 50%;
              margin: 0 20px;
            }

            p {
              border-radius: 15px;
              padding: 12px;
              max-width: 415px;
              line-height: 1.2;
            }
          }
        }
      }

      &__newMessage {
        border-top: 1px solid color(border);
        display: flex;
        justify-content: space-between;
        background: #fff;

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