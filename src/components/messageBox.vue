<template>
  <div class="messageBox" v-show="store.visibleChat === convo.id">
    <div class="messageBox__name">
      <img :src="convo.chatedWith.profileImg" />
      <h3>{{ convo.chatedWith.name }}</h3>
      <button class="messageBox__name__deleteBtn" @click="deleteChat()">
        <icon-library name="trash" id="trash"/>
      </button>
    </div>
    <div class="messageBox__messageArea" ref="msgBox">
      <div
        class="messageBox__messageArea__messageContainer"
        v-for="(message, index) in convo.messages"
        :key="index"
        :index="index"
      >
        <div
          class="messageBox__messageArea__messageContainer__time"
          v-if="sentAt(message, convo.messages[index - 1])"
        >
          <div
            class="messageBox__messageArea__messageContainer__time__line"
          ></div>
          <p>{{ sentAt(message, convo.messages[index - 1]) }}</p>
          <div
            class="messageBox__messageArea__messageContainer__time__line"
          ></div>
        </div>
        <div
          class="messageBox__messageArea__messageContainer__message"
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
    <div class="messageBox__newMessage">
      <textarea placeholder="Your message..." v-model="message" />
      <button class="primary-button" @click="sendMessage(convo)">Send</button>
    </div>
  </div>
</template>

<script>
import IconLibrary from "@/components/IconLibrary.vue";
import store from "@/store";
import moment from "moment";
import { db, doc, updateDoc, arrayUnion } from "@/firebase";

export default {
  name: "messageBox",
  props: ["convo", "index"],
  data() {
    return {
      store,
      message: null,
    };
  },

  components: {
    IconLibrary
  },

  mounted() {
    this.scrollChatToBottom();
  },

  watch: {
    "store.visibleChat": function () {
      setTimeout(() => {
        this.scrollChatToBottom();
      }, 1);
    },
  },

  methods: {
    scrollChatToBottom() {
      let messageArea = this.$refs.msgBox;
      messageArea.scrollTop = messageArea.scrollHeight;
    },

    async sendMessage(convo) {
      if (this.message) {
        let message = {
          value: this.message,
          id: store.currentUser.uid,
          time: Date.now(),
        };
        await updateDoc(doc(db, "chat", convo.id), {
          messages: arrayUnion(message),
          lastUpdated: Date.now(),
        });
        this.message = null;
        this.scrollChatToBottom();
      }
    },

    sentAt(message, previousMessage) {
      if (
        !previousMessage ||
        moment(message.time).format("D MMMM, YYYY") !==
          moment(previousMessage.time).format("D MMMM, YYYY")
      ) {
        return moment(message.time).format("D MMMM, YYYY");
      }
    },

    deleteChat() {
      this.$emit("delete", this.convo, this.index);
    }
  },
};
</script>

<style lang="scss">
@import "@/_shared.scss";

.messageBox {
  width: 64%;

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

    &__deleteBtn {
      background: none;
      border: none;
      outline: none;
      margin-left: auto;
      cursor: pointer;

      #trash {
        height: 32px;
      }
    }
  }

  &__messageArea {
    height: 445.5px;
    overflow: auto;

    &__messageContainer {
      margin: 20px 0;

      &__time {
        color: color(secondary);
        font-size: 14px;
        display: flex;
        justify-content: center;
        place-items: center;
        margin: 40px 0;

        p {
          margin: 0 8px;
        }

        &__line {
          width: 58px;
          height: 1px;
          background: color(border);
        }
      }

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
</style>