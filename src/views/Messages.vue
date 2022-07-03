<template>
  <div class="page">
    <div class="messages">
      <h3 class="messages__title">Messages</h3>
      <p v-if="store.chat.length < 1" class="messages__noChats">You currently have no active chats.</p>
      <div class="messages__container" v-if="store.chat.length > 0">
        <div class="messages__container__sidebar">
          <div class="messages__container__sidebar__inputBox">
            <input type="text" placeholder="Search" v-model="searchTerm" />
            <icon-library
              name="searchInput"
              class="messages__container__sidebar__inputBox__searchIcon"
            />
          </div>
          <div class="messages__container__sidebar__messages">
            <p
              class="messages__container__sidebar__messages__noChatsMsg"
              v-if="searchedChats.length < 1"
            >
              There are no chats with the given name.
            </p>
            <div
              class="messages__container__sidebar__messages__message"
              v-for="(convo, index) in searchedChats"
              :key="convo.chatedWith.id"
              :index="index"
              @click="store.visibleChat = convo.id"
              :style="[
                store.visibleChat === convo.id ? { background: '#f2f2f2' } : {},
              ]"
            >
              <img
                :src="convo.chatedWith.profileImg"
                class="
                  messages__container__sidebar__messages__message__profileImg
                "
              />
              <div
                class="messages__container__sidebar__messages__message__content"
              >
                <div
                  class="
                    messages__container__sidebar__messages__message__content__header
                  "
                >
                  <span>
                    <strong>{{ convo.chatedWith.name }}</strong>
                  </span>
                  <span
                    v-if="convo.messages.length > 0"
                    class="
                      messages__container__sidebar__messages__message__content__header__time
                    "
                    >{{
                      sentAgo(convo.messages[convo.messages.length - 1].time)
                    }}</span
                  >
                </div>
                <p
                  v-if="convo.messages.length > 0"
                  class="
                    messages__container__sidebar__messages__message__content__lastMessage
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
        </div>
        <message-box
          v-for="(convo, index) in store.chat"
          :key="convo.chatedWith.id"
          :index="index"
          :convo="convo"
          @delete="openDeletePopUp"
        />
      </div>
    </div>
    <transition name="popUp">
      <delete-pop-up
        v-if="deletePopUpVisible"
        message="chat"
        @close="
          deletePopUpVisible = false;
          deleteChatData = null;
        "
        @delete="deleteChat()"
      />
    </transition>
  </div>
</template>

<script>
import store from "@/store";
import IconLibrary from "@/components/IconLibrary.vue";
import deletePopUp from "@/components/deletePopUp.vue";
import messageBox from "@/components/messageBox.vue";
import moment from "moment";
import { doc, deleteDoc, db, updateDoc, arrayRemove } from "@/firebase";

export default {
  name: "Messages",
  data() {
    return {
      store,
      searchTerm: "",
      deletePopUpVisible: false,
      deleteChatData: null,
      deleteChatDataIndex: null
    };
  },
  components: {
    IconLibrary,
    messageBox,
    deletePopUp,
  },

  mounted() {
    this.setFirstConvo();
  },

  computed: {
    searchedChats() {
      return store.chat.filter((convo) =>
        convo.chatedWith.name.includes(this.searchTerm)
      );
    },
  },

  methods: {
    setFirstConvo() {
      if (!store.visibleChat) {
        store.visibleChat = this.searchedChats[0].id;
      }
    },

    sentAgo(time) {
      if (moment(time).fromNow() == "a few seconds ago") {
        return "now";
      }
      return moment(time).fromNow();
    },

    openDeletePopUp(deleteChatData, deleteChatDataIndex) {
      this.deleteChatData = deleteChatData;
      this.deleteChatDataIndex = deleteChatDataIndex;
      this.deletePopUpVisible = true;
    },

    async deleteChat() {
      await deleteDoc(doc(db, "chat", this.deleteChatData.id));
      await updateDoc(doc(db, "accounts", store.currentUser.uid), {
        chatedWith: arrayRemove(this.deleteChatData.chatedWith.id),
      });
      await updateDoc(doc(db, "accounts", this.deleteChatData.chatedWith.id), {
        chatedWith: arrayRemove(store.currentUser.uid),
      });
      store.currentUser.chatedWith = store.currentUser.chatedWith.filter(
        (id) => id !== this.deleteChatData.chatedWith.id
      );
      this.deletePopUpVisible = false;
      if(this.deleteChatDataIndex === 0) {
        store.visibleChat = this.searchedChats[this.deleteChatDataIndex].id;
      } else {
        store.visibleChat = this.searchedChats[this.deleteChatDataIndex - 1].id;
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
  min-height: 600px;

  @include breakpoint {
    left: 50%;
  }

  &__title {
    margin-bottom: 30px;
  }

  &__container {
    background: #fff;
    min-height: 600px;
    border-radius: 7px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    display: flex;
    margin-bottom: 50px;

    &__sidebar {
      width: 36%;
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
        &__noChatsMsg {
          padding: 12px;
        }

        &__message {
          display: flex;
          place-items: center;
          padding: 12px;
          width: 100%;
          cursor: pointer;

          &__profileImg {
            border-radius: 50%;
            height: 38px;
            width: 38px;
            margin-right: 10px;
          }

          &__content {
            width: 100%;
            &__header {
              display: flex;
              place-items: flex-end;
              justify-content: space-between;

              &__time {
                color: color(secondary);
                font-size: 11px;
                text-align: right;
              }
            }

            &__lastMessage {
              margin-top: 5px;
              color: color(secondary);
            }
          }
        }

        &__message:hover {
          background: color(input);
        }
      }
    }
  }
}
</style>