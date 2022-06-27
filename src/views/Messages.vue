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
        <message-box
          v-for="(convo, index) in store.chat"
          :key="convo.chatedWith.id"
          :index="index"
          :convo="convo"
        />
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import IconLibrary from "@/components/IconLibrary.vue";
import messageBox from "@/components/messageBox.vue";

export default {
  name: "Messages",
  data() {
    return {
      store,
    };
  },
  components: {
    IconLibrary,
    messageBox,
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
  }
}
</style>