<template>
  <div class="page">
    <transition name="popUp">
      <successful-update-modal
        v-if="successModalVisible"
        @close="successModalVisible = false"
      />
    </transition>
    <div class="settings">
      <h3>Account Settings</h3>
      <div class="settings__form">
        <div>
          <label for="name">Brand/business name</label>
          <input
            type="text"
            id="name"
            :placeholder="
              store.currentUser.accType === 'business'
                ? 'Enter your brand/business name'
                : 'Enter your username'
            "
            :style="[msg.name ? { outline: '2px solid rgb(207, 49, 49)' } : {}]"
            v-model="updateValues.name"
          />
          <p class="msg" v-if="msg.name">{{ msg.name }}</p>
        </div>

        <div>
          <label for="country">Country</label>
          <select id="country" v-model="updateValues.country">
            <option value="Afganistan">Afghanistan</option>
            <option value="Albania">Albania</option>
            <option value="Algeria">Algeria</option>
            <option value="American Samoa">American Samoa</option>
            <option value="Andorra">Andorra</option>
            <option value="Angola">Angola</option>
            <option value="Anguilla">Anguilla</option>
            <option value="Antigua & Barbuda">Antigua & Barbuda</option>
            <option value="Argentina">Argentina</option>
            <option value="Armenia">Armenia</option>
            <option value="Aruba">Aruba</option>
            <option value="Australia">Australia</option>
            <option value="Austria">Austria</option>
            <option value="Azerbaijan">Azerbaijan</option>
            <option value="Bahamas">Bahamas</option>
            <option value="Bahrain">Bahrain</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="Barbados">Barbados</option>
            <option value="Belarus">Belarus</option>
            <option value="Belgium">Belgium</option>
            <option value="Belize">Belize</option>
            <option value="Benin">Benin</option>
            <option value="Bermuda">Bermuda</option>
            <option value="Bhutan">Bhutan</option>
            <option value="Bolivia">Bolivia</option>
            <option value="Bonaire">Bonaire</option>
            <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
            <option value="Botswana">Botswana</option>
            <option value="Brazil">Brazil</option>
            <option value="British Indian Ocean Ter">
              British Indian Ocean Ter
            </option>
            <option value="Brunei">Brunei</option>
            <option value="Bulgaria">Bulgaria</option>
            <option value="Burkina Faso">Burkina Faso</option>
            <option value="Burundi">Burundi</option>
            <option value="Cambodia">Cambodia</option>
            <option value="Cameroon">Cameroon</option>
            <option value="Canada">Canada</option>
            <option value="Canary Islands">Canary Islands</option>
            <option value="Cape Verde">Cape Verde</option>
            <option value="Cayman Islands">Cayman Islands</option>
            <option value="Central African Republic">
              Central African Republic
            </option>
            <option value="Chad">Chad</option>
            <option value="Channel Islands">Channel Islands</option>
            <option value="Chile">Chile</option>
            <option value="China">China</option>
            <option value="Christmas Island">Christmas Island</option>
            <option value="Cocos Island">Cocos Island</option>
            <option value="Colombia">Colombia</option>
            <option value="Comoros">Comoros</option>
            <option value="Congo">Congo</option>
            <option value="Cook Islands">Cook Islands</option>
            <option value="Costa Rica">Costa Rica</option>
            <option value="Cote DIvoire">Cote DIvoire</option>
            <option value="Croatia">Croatia</option>
            <option value="Cuba">Cuba</option>
            <option value="Curaco">Curacao</option>
            <option value="Cyprus">Cyprus</option>
            <option value="Czech Republic">Czech Republic</option>
            <option value="Denmark">Denmark</option>
            <option value="Djibouti">Djibouti</option>
            <option value="Dominica">Dominica</option>
            <option value="Dominican Republic">Dominican Republic</option>
            <option value="East Timor">East Timor</option>
            <option value="Ecuador">Ecuador</option>
            <option value="Egypt">Egypt</option>
            <option value="El Salvador">El Salvador</option>
            <option value="Equatorial Guinea">Equatorial Guinea</option>
            <option value="Eritrea">Eritrea</option>
            <option value="Estonia">Estonia</option>
            <option value="Ethiopia">Ethiopia</option>
            <option value="Falkland Islands">Falkland Islands</option>
            <option value="Faroe Islands">Faroe Islands</option>
            <option value="Fiji">Fiji</option>
            <option value="Finland">Finland</option>
            <option value="France">France</option>
            <option value="French Guiana">French Guiana</option>
            <option value="French Polynesia">French Polynesia</option>
            <option value="French Southern Ter">French Southern Ter</option>
            <option value="Gabon">Gabon</option>
            <option value="Gambia">Gambia</option>
            <option value="Georgia">Georgia</option>
            <option value="Germany">Germany</option>
            <option value="Ghana">Ghana</option>
            <option value="Gibraltar">Gibraltar</option>
            <option value="Great Britain">Great Britain</option>
            <option value="Greece">Greece</option>
            <option value="Greenland">Greenland</option>
            <option value="Grenada">Grenada</option>
            <option value="Guadeloupe">Guadeloupe</option>
            <option value="Guam">Guam</option>
            <option value="Guatemala">Guatemala</option>
            <option value="Guinea">Guinea</option>
            <option value="Guyana">Guyana</option>
            <option value="Haiti">Haiti</option>
            <option value="Hawaii">Hawaii</option>
            <option value="Honduras">Honduras</option>
            <option value="Hong Kong">Hong Kong</option>
            <option value="Hungary">Hungary</option>
            <option value="Iceland">Iceland</option>
            <option value="Indonesia">Indonesia</option>
            <option value="India">India</option>
            <option value="Iran">Iran</option>
            <option value="Iraq">Iraq</option>
            <option value="Ireland">Ireland</option>
            <option value="Isle of Man">Isle of Man</option>
            <option value="Israel">Israel</option>
            <option value="Italy">Italy</option>
            <option value="Jamaica">Jamaica</option>
            <option value="Japan">Japan</option>
            <option value="Jordan">Jordan</option>
            <option value="Kazakhstan">Kazakhstan</option>
            <option value="Kenya">Kenya</option>
            <option value="Kiribati">Kiribati</option>
            <option value="Korea North">Korea North</option>
            <option value="Korea Sout">Korea South</option>
            <option value="Kuwait">Kuwait</option>
            <option value="Kyrgyzstan">Kyrgyzstan</option>
            <option value="Laos">Laos</option>
            <option value="Latvia">Latvia</option>
            <option value="Lebanon">Lebanon</option>
            <option value="Lesotho">Lesotho</option>
            <option value="Liberia">Liberia</option>
            <option value="Libya">Libya</option>
            <option value="Liechtenstein">Liechtenstein</option>
            <option value="Lithuania">Lithuania</option>
            <option value="Luxembourg">Luxembourg</option>
            <option value="Macau">Macau</option>
            <option value="Macedonia">Macedonia</option>
            <option value="Madagascar">Madagascar</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Malawi">Malawi</option>
            <option value="Maldives">Maldives</option>
            <option value="Mali">Mali</option>
            <option value="Malta">Malta</option>
            <option value="Marshall Islands">Marshall Islands</option>
            <option value="Martinique">Martinique</option>
            <option value="Mauritania">Mauritania</option>
            <option value="Mauritius">Mauritius</option>
            <option value="Mayotte">Mayotte</option>
            <option value="Mexico">Mexico</option>
            <option value="Midway Islands">Midway Islands</option>
            <option value="Moldova">Moldova</option>
            <option value="Monaco">Monaco</option>
            <option value="Mongolia">Mongolia</option>
            <option value="Montserrat">Montserrat</option>
            <option value="Morocco">Morocco</option>
            <option value="Mozambique">Mozambique</option>
            <option value="Myanmar">Myanmar</option>
            <option value="Nambia">Nambia</option>
            <option value="Nauru">Nauru</option>
            <option value="Nepal">Nepal</option>
            <option value="Netherland Antilles">Netherland Antilles</option>
            <option value="Netherlands">Netherlands (Holland, Europe)</option>
            <option value="Nevis">Nevis</option>
            <option value="New Caledonia">New Caledonia</option>
            <option value="New Zealand">New Zealand</option>
            <option value="Nicaragua">Nicaragua</option>
            <option value="Niger">Niger</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Niue">Niue</option>
            <option value="Norfolk Island">Norfolk Island</option>
            <option value="Norway">Norway</option>
            <option value="Oman">Oman</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Palau Island">Palau Island</option>
            <option value="Palestine">Palestine</option>
            <option value="Panama">Panama</option>
            <option value="Papua New Guinea">Papua New Guinea</option>
            <option value="Paraguay">Paraguay</option>
            <option value="Peru">Peru</option>
            <option value="Phillipines">Philippines</option>
            <option value="Pitcairn Island">Pitcairn Island</option>
            <option value="Poland">Poland</option>
            <option value="Portugal">Portugal</option>
            <option value="Puerto Rico">Puerto Rico</option>
            <option value="Qatar">Qatar</option>
            <option value="Republic of Montenegro">
              Republic of Montenegro
            </option>
            <option value="Republic of Serbia">Republic of Serbia</option>
            <option value="Reunion">Reunion</option>
            <option value="Romania">Romania</option>
            <option value="Russia">Russia</option>
            <option value="Rwanda">Rwanda</option>
            <option value="St Barthelemy">St Barthelemy</option>
            <option value="St Eustatius">St Eustatius</option>
            <option value="St Helena">St Helena</option>
            <option value="St Kitts-Nevis">St Kitts-Nevis</option>
            <option value="St Lucia">St Lucia</option>
            <option value="St Maarten">St Maarten</option>
            <option value="St Pierre & Miquelon">St Pierre & Miquelon</option>
            <option value="St Vincent & Grenadines">
              St Vincent & Grenadines
            </option>
            <option value="Saipan">Saipan</option>
            <option value="Samoa">Samoa</option>
            <option value="Samoa American">Samoa American</option>
            <option value="San Marino">San Marino</option>
            <option value="Sao Tome & Principe">Sao Tome & Principe</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="Senegal">Senegal</option>
            <option value="Seychelles">Seychelles</option>
            <option value="Sierra Leone">Sierra Leone</option>
            <option value="Singapore">Singapore</option>
            <option value="Slovakia">Slovakia</option>
            <option value="Slovenia">Slovenia</option>
            <option value="Solomon Islands">Solomon Islands</option>
            <option value="Somalia">Somalia</option>
            <option value="South Africa">South Africa</option>
            <option value="Spain">Spain</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="Sudan">Sudan</option>
            <option value="Suriname">Suriname</option>
            <option value="Swaziland">Swaziland</option>
            <option value="Sweden">Sweden</option>
            <option value="Switzerland">Switzerland</option>
            <option value="Syria">Syria</option>
            <option value="Tahiti">Tahiti</option>
            <option value="Taiwan">Taiwan</option>
            <option value="Tajikistan">Tajikistan</option>
            <option value="Tanzania">Tanzania</option>
            <option value="Thailand">Thailand</option>
            <option value="Togo">Togo</option>
            <option value="Tokelau">Tokelau</option>
            <option value="Tonga">Tonga</option>
            <option value="Trinidad & Tobago">Trinidad & Tobago</option>
            <option value="Tunisia">Tunisia</option>
            <option value="Turkey">Turkey</option>
            <option value="Turkmenistan">Turkmenistan</option>
            <option value="Turks & Caicos Is">Turks & Caicos Is</option>
            <option value="Tuvalu">Tuvalu</option>
            <option value="Uganda">Uganda</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Ukraine">Ukraine</option>
            <option value="United Arab Erimates">United Arab Emirates</option>
            <option value="United States of America">
              United States of America
            </option>
            <option value="Uruguay">Uruguay</option>
            <option value="Uzbekistan">Uzbekistan</option>
            <option value="Vanuatu">Vanuatu</option>
            <option value="Vatican City State">Vatican City State</option>
            <option value="Venezuela">Venezuela</option>
            <option value="Vietnam">Vietnam</option>
            <option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
            <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
            <option value="Wake Island">Wake Island</option>
            <option value="Wallis & Futana Is">Wallis & Futana Is</option>
            <option value="Yemen">Yemen</option>
            <option value="Zaire">Zaire</option>
            <option value="Zambia">Zambia</option>
            <option value="Zimbabwe">Zimbabwe</option>
          </select>
        </div>

        <div>
          <label for="social-icons">Social links</label>
          <select id="social-icons" name="social-icons" v-model="linkChosen">
            <option value="Instagram">Instagram</option>
            <option value="Facebook">Facebook</option>
            <option value="TikTok">TikTok</option>
            <option value="YouTube">YouTube</option>
            <option value="LinkedIn">LinkedIn</option>
          </select>
        </div>

        <div>
          <label for="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Enter your city"
            v-model="updateValues.city"
            :style="[msg.city ? { outline: '2px solid rgb(207, 49, 49)' } : {}]"
          />
          <p v-if="msg.city" class="msg">{{ msg.city }}</p>
        </div>

        <div v-show="linkChosen === 'Instagram'">
          <p>Instagram</p>
          <input
            placeholder="Paste your Instagram profile link"
            v-model="updateValues.instagram"
          />
        </div>
        <div v-show="linkChosen === 'Facebook'">
          <p>Facebook</p>
          <input
            placeholder="Paste your Facebook profile link"
            v-model="updateValues.facebook"
          />
        </div>
        <div v-show="linkChosen === 'TikTok'">
          <p>TikTok</p>
          <input
            placeholder="Paste your TikTok profile link"
            v-model="updateValues.tiktok"
          />
        </div>
        <div v-show="linkChosen === 'YouTube'">
          <p>YouTube</p>
          <input
            placeholder="Paste your YouTube profile link"
            v-model="updateValues.youtube"
          />
        </div>
        <div v-show="linkChosen === 'LinkedIn'">
          <p>LinkedIn</p>
          <input
            placeholder="Paste your LinkedIn profile link"
            v-model="updateValues.linkedIn"
          />
        </div>
      </div>

      <p>
        {{
          store.currentUser.accType == "promo"
            ? "Interests:"
            : "Business categories:"
        }}
      </p>
      <div class="checkbox-area" v-if="store.currentUser.accType == 'promo'">
        <label class="checkbox-area__container"
          >Beauty
          <input
            type="checkbox"
            value="beauty"
            v-model="updateValues.categories"
          />
          <span class="checkmark"></span>
        </label>

        <label class="checkbox-area__container"
          >Blogging/vlogging
          <input
            type="checkbox"
            value="blogging/vlogging"
            v-model="updateValues.categories"
          />
          <span class="checkmark"></span>
        </label>

        <label class="checkbox-area__container"
          >Fashion
          <input
            type="checkbox"
            value="fashion"
            v-model="updateValues.categories"
          />
          <span class="checkmark"></span>
        </label>

        <label class="checkbox-area__container"
          >Food
          <input
            type="checkbox"
            value="food"
            v-model="updateValues.categories"
          />
          <span class="checkmark"></span>
        </label>

        <label class="checkbox-area__container"
          >Technology
          <input
            type="checkbox"
            value="technology"
            v-model="updateValues.categories"
          />
          <span class="checkmark"></span>
        </label>

        <label class="checkbox-area__container"
          >Lifestyle
          <input
            type="checkbox"
            value="lifestyle"
            v-model="updateValues.categories"
          />
          <span class="checkmark"></span>
        </label>

        <label class="checkbox-area__container"
          >Music
          <input
            type="checkbox"
            value="music"
            v-model="updateValues.categories"
          />
          <span class="checkmark"></span>
        </label>

        <label class="checkbox-area__container"
          >Photography
          <input
            type="checkbox"
            value="photography"
            v-model="updateValues.categories"
          />
          <span class="checkmark"></span>
        </label>

        <label class="checkbox-area__container"
          >Sports and fitness
          <input
            type="checkbox"
            value="sports and fitness"
            v-model="updateValues.categories"
          />
          <span class="checkmark"></span>
        </label>

        <label class="checkbox-area__container"
          >Travel
          <input
            type="checkbox"
            value="travel"
            v-model="updateValues.categories"
          />
          <span class="checkmark"></span>
        </label>

        <label class="checkbox-area__container"
          >Other
          <input
            type="checkbox"
            value="other"
            v-model="updateValues.categories"
          />
          <span class="checkmark"></span>
        </label>
      </div>

      <div class="checkbox-area" v-if="store.currentUser.accType == 'business'">
        <label class="checkbox-area__container"
          >Beauty products or services for women
          <input
            type="checkbox"
            value="beauty products or services for women"
            v-model="updateValues.categories"
          />
          <span class="checkmark"></span>
        </label>

        <label class="checkbox-area__container"
          >Grooming products or services for men
          <input
            type="checkbox"
            value="grooming products or services for men"
            v-model="updateValues.categories"
          />
          <span class="checkmark"></span>
        </label>

        <label class="checkbox-area__container"
          >Women's fashion
          <input
            type="checkbox"
            value="women's fashion"
            v-model="updateValues.categories"
          />
          <span class="checkmark"></span>
        </label>

        <label class="checkbox-area__container"
          >Men's fashion
          <input
            type="checkbox"
            value="men's fashion"
            v-model="updateValues.categories"
          />
          <span class="checkmark"></span>
        </label>

        <label class="checkbox-area__container"
          >Food and suplements
          <input
            type="checkbox"
            value="food and suplements"
            v-model="updateValues.categories"
          />
          <span class="checkmark"></span>
        </label>

        <label class="checkbox-area__container"
          >Sports and fitness
          <input
            type="checkbox"
            value="sports and fitness"
            v-model="updateValues.categories"
          />
          <span class="checkmark"></span>
        </label>

        <label class="checkbox-area__container"
          >Technology
          <input
            type="checkbox"
            value="technology"
            v-model="updateValues.categories"
          />
          <span class="checkmark"></span>
        </label>

        <label class="checkbox-area__container"
          >Travel and tourism
          <input
            type="checkbox"
            value="travel and tourism"
            v-model="updateValues.categories"
          />
          <span class="checkmark"></span>
        </label>

        <label class="checkbox-area__container"
          >Other
          <input
            type="checkbox"
            value="other"
            v-model="updateValues.categories"
          />
          <span class="checkmark"></span>
        </label>
      </div>
      <p class="msg-category" v-if="msg.categories">{{ msg.categories }}</p>

      <button class="primary-button" @click="updateAccountData()">
        Update
      </button>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import successfulUpdateModal from "@/components/successfulUpdateModal.vue";
import { db, doc, updateDoc } from "@/firebase";

export default {
  name: "Settings",
  data() {
    return {
      store,
      linkChosen: "Instagram",
      successModalVisible: false,
      msg: {
        name: null,
        city: null,
        categories: null,
      },
      updateValues: {
        name: store.currentUser.name,
        country: store.currentUser.country,
        city: store.currentUser.city,
        categories: store.currentUser.categories,
        instagram: store.currentUser.instagram,
        facebook: store.currentUser.facebook,
        tiktok: store.currentUser.tiktok,
        youtube: store.currentUser.youtube,
        linkedIn: store.currentUser.linkedIn,
      },
    };
  },

  components: {
    successfulUpdateModal,
  },

  methods: {
    async updateAccountData() {
      let valid = true;
      if (!this.updateValues.name) {
        this.msg.name = "This field cannot be empty";
        valid = false;
      } else {
        this.msg.name = null;
      }
      if (!this.updateValues.city) {
        this.msg.city = "This field cannot be empty";
        valid = false;
      } else {
        this.msg.city = null;
      }
      if (this.updateValues.categories.length < 1) {
        this.msg.categories = "You need to select at least one category!";
        valid = false;
      } else {
        this.msg.categories = null;
      }

      if (valid) {
        await updateDoc(doc(db, "accounts", store.currentUser.uid), {
          name: this.updateValues.name,
          city: this.updateValues.city,
          country: this.updateValues.country,
          categories: this.updateValues.categories,
          instagram: this.updateValues.instagram,
          facebook: this.updateValues.facebook,
          tiktok: this.updateValues.tiktok,
          youtube: this.updateValues.youtube,
          linkedIn: this.updateValues.linkedIn,
        });
        store.currentUser.name = this.updateValues.name;
        store.currentUser.city = this.updateValues.city;
        store.currentUser.country = this.updateValues.country;
        store.currentUser.categories = this.updateValues.categories;
        store.currentUser.instagram = this.updateValues.instagram;
        store.currentUser.facebook = this.updateValues.facebook;
        store.currentUser.tiktok = this.updateValues.tiktok;
        store.currentUser.youtube = this.updateValues.youtube;
        store.currentUser.linkedIn = this.updateValues.linkedIn;
        this.successModalVisible = true;
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/_shared.scss";

.settings {
  margin-top: 130px;
  position: relative;
  width: 90%;
  max-width: 850px;
  left: calc(50% + 150px);
  transform: translateX(-50%);

  @include breakpoint {
    left: 50%;
  }

  h3 {
    margin-bottom: 40px;
  }

  &__form {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin: 20px 0;

    div {
      flex: 1;

      input,
      select {
        padding: 12px;
        margin-top: 10px;
        border: none;
        border-radius: 10px;
        background-color: color(input);
        width: 100%;
        outline: none;
        min-width: 300px;
        max-width: 415px;
      }

      label {
        display: block;
      }
    }
  }

  .checkbox-area {
    display: flex;
    flex-wrap: wrap;
    place-items: center;
    justify-content: space-between;
    margin-top: 20px;

    &__container {
      width: 50%;
      max-width: 220px;
      margin-bottom: 10px;
      display: block;
      position: relative;
      cursor: pointer;
      padding-left: 30px !important;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      line-height: 1.25;

      input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
      }

      .checkmark {
        position: absolute;
        top: 50%;
        left: 0;
        height: 19px;
        width: 19px;
        background-color: color(input);
        border-radius: 2px;
        transform: translateY(-50%);
      }
    }

    &__container:hover input ~ .checkmark {
      background-color: color(secondary);
    }

    &__container input:checked ~ .checkmark {
      background-color: color(primary);
    }

    .checkmark:after {
      content: "";
      position: absolute;
      display: none;
    }

    &__container input:checked ~ .checkmark:after {
      display: block;
    }

    &__container .checkmark:after {
      left: 6px;
      top: 2px;
      width: 5px;
      height: 9px;
      border: solid white;
      border-width: 0 3px 3px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }

  .primary-button {
    display: block;
    margin: 75px auto 40px auto;
  }

  .msg {
    position: absolute;
    font-size: 10.5px;
    color: rgb(207, 49, 49);
    margin-top: 3px;
  }

  .msg-category {
    position: absolute;
    font-size: 13px;
    color: rgb(207, 49, 49);
    margin-top: 3px;
    padding-top: 5px;
    border-top: 1px solid rgb(207, 49, 49);
  }
}
</style>