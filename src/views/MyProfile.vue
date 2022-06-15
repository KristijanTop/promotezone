<template>
  <div class="page">
    <div class="myProfile">
      <div class="myProfile__heading">
        <div class="myProfile__heading__img">
          <img
            :src="store.currentUser.profileImg"
            v-if="!profileImgUpdate && store.currentUser.profileImg"
          />
          <img
            src="@/assets/user.svg"
            v-if="!profileImgUpdate && !store.currentUser.profileImg"
            class="profileImgPlaceholder"
          />
          <div
            class="myProfile__heading__img__update"
            @click="toggleUpdateProfileImg()"
            v-if="!profileImgUpdate"
          >
            <span>Change</span>
          </div>
          <croppa
            v-show="profileImgUpdate"
            v-model="updateData.profileImgReference"
            :width="90"
            :height="90"
            placeholder=""
            placeholder-color="#2b3033"
            :placeholder-font-size="10"
            canvas-color="transparent"
            :show-remove-button="false"
            remove-button-color="#8b889c"
            :remove-button-size="28"
            :prevent-white-space="true"
          >
            <img slot="placeholder" src="@/assets/camera.svg" />
            <div
              class="spinner"
              v-if="
                updateData.profileImgReference &&
                updateData.profileImgReference.loading
              "
            ></div>
          </croppa>
          <button
            class="discardBtn"
            v-if="profileImgUpdate"
            @click="discardChanges()"
          >
            <img src="@/assets/x.svg" />
          </button>
          <button
            class="updateBtn"
            v-if="profileImgUpdate"
            @click="updateProfileImg()"
          >
            <img src="@/assets/check.svg" />
          </button>
        </div>
        <div class="myProfile__heading__text">
          <h2>{{ store.currentUser.name }}</h2>
          <h4>
             {{ store.currentUser.city }}, {{ store.currentUser.country }}
          </h4>
        </div>
        <div class="myProfile__heading__icons">
          <a
            :href="store.currentUser.instagram"
            target="_blank"
            v-if="store.currentUser.instagram"
          >
            <icon-library name="instagram" />
          </a>
          <a
            :href="store.currentUser.facebook"
            target="_blank"
            v-if="store.currentUser.facebook"
          >
            <icon-library name="facebook" />
          </a>
          <a
            :href="store.currentUser.tiktok"
            target="_blank"
            v-if="store.currentUser.tiktok"
          >
            <icon-library name="tiktok" />
          </a>
          <a
            :href="store.currentUser.youtube"
            target="_blank"
            v-if="store.currentUser.youtube"
          >
            <icon-library name="youtube" />
          </a>
          <a
            :href="store.currentUser.linkedIn"
            target="_blank"
            v-if="store.currentUser.linkedIn"
          >
            <icon-library name="linkedin" />
          </a>
        </div>
      </div>

      <div class="myProfile__tags">
        <div
          class="myProfile__tags__tag"
          v-for="tag in store.currentUser.categories"
          :key="tag"
        >
          {{ tag }}
        </div>
      </div>

      <div class="myProfile__bio">
        <p v-if="!bioUpdate" ref="bioParagraph">
          {{ store.currentUser.bio }}
          <button @click="bioUpdate = true" class="editBtn">
            <img src="@/assets/edit.svg" />
          </button>
        </p>
        <textarea
          v-if="bioUpdate"
          v-model="updateData.bio"
          :style="{ height: bioHeight }"
          :placeholder="
            store.currentUser.accType === 'business'
              ? 'Enter a few words about your brand'
              : 'Enter a few words about yourself'
          "
        ></textarea>
        <img
          src="@/assets/x.svg"
          class="discardBioBtn"
          v-if="bioUpdate"
          @click="bioUpdate = false"
        />
        <img
          src="@/assets/check.svg"
          class="updateBioBtn"
          v-if="bioUpdate"
          @click="updateBio()"
        />
      </div>

      <span>Gallery</span>
      <button class="primary-button">Add</button>

      <div class="myProfile__gallery">
        <img
          v-for="(img, index) in store.currentUser.images"
          :key="img.url"
          :src="img.url"
          @click="
            carouselVisible = true;
            visibleImage = index;
          "
        />
      </div>
    </div>

    <transition name="carousel">
      <carousel
        @next="next"
        @prev="prev"
        @close="carouselVisible = false"
        v-if="carouselVisible"
      >
        <carousel-slide
          class="carouselImg"
          v-for="(image, index) in store.currentUser.images"
          :key="image.url"
          :index="index"
          :visibleImage="visibleImage"
        >
          <div class="img-slide">
            <div class="img-slide__heading-mobile">
              <img class="profileImg" :src="store.currentUser.profileImg" />
              <h4>{{ store.currentUser.name }}</h4>
            </div>
            <img class="image" :src="image.url" />
            <div class="img-slide__content">
              <div class="img-slide__content__heading">
                <img class="profileImg" :src="store.currentUser.profileImg" />
                <h3>{{ store.currentUser.name }}</h3>
              </div>
              <span class="img-slide__content__location"
                > {{ store.currentUser.city }},
                {{ store.currentUser.country }}
              </span>
              <div class="img-slide__content__tags">
                <span
                  class="img-slide__content__tags__tag"
                  v-for="tag in store.currentUser.categories"
                  :key="tag"
                  >{{ tag }}</span
                >
              </div>
              <p>{{ image.desc }}</p>
            </div>
          </div>
        </carousel-slide>
      </carousel>
    </transition>
  </div>
</template>

<script>
import store from "@/store";
import IconLibrary from "@/components/IconLibrary.vue";
import carousel from "@/components/carousel.vue";
import carouselSlide from "@/components/carouselSlide.vue";
import {
  db,
  doc,
  updateDoc,
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  arrayUnion,
} from "@/firebase";

export default {
  name: "MyProfile",
  data() {
    return {
      store,
      carouselVisible: false,
      visibleImage: null,
      profileImgUpdate: false,
      bioUpdate: false,
      updateData: {
        profileImgReference: null,
        bio: store.currentUser.bio,
      },
    };
  },

  computed: {
    imagesLength() {
      return store.currentUser.images.length;
    },
    bioHeight() {
      return this.$refs.bioParagraph.clientHeight + 24 + "px";
    },
  },

  methods: {
    next() {
      if (this.visibleImage >= this.imagesLength - 1) {
        this.visibleImage = 0;
      } else {
        this.visibleImage++;
      }
    },
    prev() {
      if (this.visibleImage <= 0) {
        this.visibleImage = this.imagesLength - 1;
      } else {
        this.visibleImage--;
      }
    },
    toggleUpdateProfileImg() {
      this.profileImgUpdate = true;
      this.updateData.profileImgReference.chooseFile();
    },
    discardChanges() {
      this.profileImgUpdate = false;
      this.updateData.profileImgReference.remove();
    },
    async updateProfileImg() {
      // Create the file metadata
      /** @type {any} */
      const metadata = {
        contentType: "image",
      };

      if (this.updateData.profileImgReference.hasImage()) {
        this.updateData.profileImgReference.generateBlob((blobData) => {
          let profileImgName = store.currentUser.name + "-profile-image.png";

          const storageRef = ref(
            storage,
            store.currentUser.name +
              `(${store.currentUser.uid})/` +
              profileImgName
          );
          const uploadProfileImg = uploadBytesResumable(
            storageRef,
            blobData,
            metadata
          );

          // Listen for state changes, errors, and completion of the upload.
          uploadProfileImg.on(
            "state_changed",
            (snapshot) => {
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
              }
            },
            (error) => {
              // A full list of error codes is available at
              // https://firebase.google.com/docs/storage/web/handle-errors
              switch (error.code) {
                case "storage/unauthorized":
                  // User doesn't have permission to access the object
                  break;
                case "storage/canceled":
                  // User canceled the upload
                  break;

                // ...

                case "storage/unknown":
                  // Unknown error occurred, inspect error.serverResponse
                  break;
              }
            },
            async () => {
              // Upload completed successfully, now we can get the download URL
              const profileImgUrl = await getDownloadURL(
                uploadProfileImg.snapshot.ref
              );
              await updateDoc(doc(db, "accounts", store.currentUser.uid), {
                profileImg: profileImgUrl,
              });
              this.profileImgUpdate = false;
              store.currentUser.profileImg = profileImgUrl;
              this.updateData.profileImgReference.remove();
            }
          );
        });
      } else {
        await updateDoc(doc(db, "accounts", store.currentUser.uid), {
          profileImg: null,
        });
        this.profileImgUpdate = false;
        store.currentUser.profileImg = null;
      }
    },
    async updateBio() {
      await updateDoc(doc(db, "accounts", store.currentUser.uid), {
        bio: this.updateData.bio,
      });
      store.currentUser.bio = this.updateData.bio;
      this.bioUpdate = false;
    },
  },

  components: {
    IconLibrary,
    carousel,
    carouselSlide,
  },
};
</script>

<style lang="scss">
@import "@/_shared.scss";

.page {
  width: 100vw;
}

.myProfile {
  margin-top: 80px;
  padding: 30px;
  position: relative;
  max-width: 930px;
  left: calc(50% + 150px);
  transform: translateX(-50%);

  @include breakpoint {
    left: 50%;
  }

  &__heading {
    display: flex;
    gap: 30px;

    &__img {
      height: 90px;
      width: 90px;
      background: color(input);
      border-radius: 50%;
      display: flex;
      place-items: center;
      justify-content: center;

      img {
        width: 100%;
        border-radius: 50%;
      }

      .profileImgPlaceholder {
        width: 87%;
      }

      &__update {
        height: 90px;
        width: 90px;
        border-radius: 50%;
        overflow: hidden;
        background: #f2f2f2be;
        opacity: 0;
        position: absolute;
        top: 30px;
        left: 30px;
        z-index: 20;
        cursor: pointer;
        display: flex;
        place-items: center;
        transition: 0.2s ease;
        padding: 2px;

        span {
          width: 100%;
          text-align: center;
          font-weight: 600;
        }
      }

      &__update:hover {
        opacity: 1;
      }
    }

    .discardBtn {
      position: absolute;
      margin-left: 75px;
      margin-top: -70px;
      background: #fff;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      transition: 0.2s ease-in;
      height: 20px;
      width: 20px;
    }

    .discardBtn:hover {
      transform: scale(1.1);
    }

    .updateBtn {
      position: absolute;
      margin-left: 75px;
      margin-top: 70px;
      background: #fff;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      transition: 0.2s ease-in;
      height: 20px;
      width: 20px;
    }

    .updateBtn:hover {
      transform: scale(1.1);
    }

    &__text {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
    }

    &__icons {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: auto;
      padding-top: 15px;
      gap: 15px;
    }
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 30px;

    &__tag {
      padding: 12px 15px;
      background: color(input);
      border-radius: 20px;
      font-size: 13px;
      font-weight: 600;
    }
  }

  &__bio {
    margin: 30px 0;

    p {
      line-height: 1.5;
      text-align: justify;
    }

    .editBtn {
      background: none;
      border: none;
      outline: none;
      cursor: pointer;
      margin-left: 2px;
      display: inline-block;
      vertical-align: middle;
    }

    textarea {
      padding: 12px;
      border: none;
      border-radius: 10px;
      background-color: color(input);
      width: 100%;
      resize: none;
      font-family: "GothamBook";
      line-height: 1.5;
      font-size: 16px;
      text-align: justify;
    }

    .discardBioBtn {
      position: absolute;
      height: 20px;
      width: 20px;
      right: 65px;
      cursor: pointer;
      display: block;
      margin-top: 5px;
    }

    .updateBioBtn {
      position: absolute;
      height: 20px;
      width: 20px;
      right: 35px;
      cursor: pointer;
      display: block;
      margin-top: 5px;
    }
  }

  .primary-button {
    padding: 9px 15px;
    margin-left: 15px;
    border-radius: 15px;
  }

  &__gallery {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
    margin-top: 30px;

    img {
      height: 280px;
      width: 280px;
      object-fit: cover;
      border-radius: 5px;
      cursor: pointer;
    }
  }
}

.croppa-container {
  background-color: color(input);
  border-radius: 50%;

  canvas {
    border-radius: 50%;
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

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>