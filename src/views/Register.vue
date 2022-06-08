<template>
  <div class="register">
    <loading-modal v-if="openLoading" :loading="loading"/>
    <div class="register__sidebar">
      <div class="register__sidebar__title">
        <img
          src="@/assets/Logo-purple.svg"
          alt="PromoteZone-logo"
          height="45"
        />
        <span>Registration</span>
      </div>
      <div class="register__sidebar__steps">
        <span>Account option</span>
        <div
          class="bulletpoint b1"
          :style="[
            step == 1
              ? { background: '#5656d8' }
              : step == 2
              ? { background: '#5656d8' }
              : step == 3
              ? { background: '#5656d8' }
              : step == 4
              ? { background: '#5656d8' }
              : {},
          ]"
        ></div>
        <span>General info</span>
        <div
          class="bulletpoint b2"
          :style="[
            step == 2
              ? { background: '#5656d8' }
              : step == 3
              ? { background: '#5656d8' }
              : step == 4
              ? { background: '#5656d8' }
              : {},
          ]"
        ></div>
        <span>Business categories/Interests</span>
        <div
          class="bulletpoint b3"
          :style="[
            step == 3
              ? { background: '#5656d8' }
              : step == 4
              ? { background: '#5656d8' }
              : {},
          ]"
        ></div>
        <span>Profile setup</span>
        <div
          class="bulletpoint b4"
          :style="[step == 4 ? { background: '#5656d8' } : {}]"
        ></div>
        <div
          class="progress"
          :style="[
            step == 1
              ? { height: '0px' }
              : step == 2
              ? { height: '68px' }
              : step == 3
              ? { height: '127px' }
              : { height: '184px' },
          ]"
        ></div>
      </div>
    </div>

    <div class="register__step1" v-show="step === 1">
      <h2>Choose your account option</h2>
      <div class="register__step1__options">
        <label class="register__step1__options__radios">
          <input
            type="radio"
            name="radio"
            value="business"
            v-model="registration.accType"
          />
          <div class="register__step1__options__radios__btn">
            <icon-library name="business"></icon-library>
            <h3>Business account</h3>
          </div>
        </label>
        <label class="register__step1__options__radios">
          <input
            type="radio"
            name="radio"
            value="promo"
            v-model="registration.accType"
          />
          <div class="register__step1__options__radios__btn">
            <icon-library name="promo"></icon-library>
            <h3>Promo account</h3>
          </div>
        </label>
      </div>
      <button @click="next()" type="button" class="primary-button">Next</button>
    </div>

    <div class="register__step2" v-show="step === 2">
      <h2>Fill your account info</h2>
      <div class="register__step2__form">
        <div v-if="registration.accType == 'business'">
          <p>Brand/business name</p>
          <input
            placeholder="Enter a name for your brand or business"
            v-model="registration.name"
            :style="[
              msg.name
                ? { outline: '2px solid rgb(207, 49, 49)' }
                : { outline: 'none' },
            ]"
          />
          <p class="msg" v-if="msg.name">{{ msg.name }}</p>
        </div>
        <div v-if="registration.accType == 'promo'">
          <p>Username</p>
          <input
            placeholder="Enter a username"
            v-model="registration.name"
            :style="[
              msg.name
                ? { outline: '2px solid rgb(207, 49, 49)' }
                : { outline: 'none' },
            ]"
          />
          <p class="msg" v-if="msg.name">{{ msg.name }}</p>
        </div>
        <div>
          <p>E-mail adress</p>
          <input
            type="email"
            placeholder="Enter an e-mail adress"
            v-model="auth.email"
            :style="[
              msg.email
                ? { outline: '2px solid rgb(207, 49, 49)' }
                : { outline: 'none' },
            ]"
          />
          <p class="msg" v-if="msg.email">{{ msg.email }}</p>
        </div>
        <div>
          <p>Password</p>
          <input
            :type="visible"
            placeholder="Enter a password"
            v-model="auth.password"
            :style="[
              msg.password
                ? { outline: '2px solid rgb(207, 49, 49)' }
                : { outline: 'none' },
            ]"
          />
          <p class="msg" v-if="msg.password">{{ msg.password }}</p>
          <img
            src="@/assets/eye.svg"
            class="register__step2__form__eye"
            v-if="visible == 'password'"
            @click="showPassword()"
          />
          <img
            src="@/assets/eye-off.svg"
            class="register__step2__form__eye"
            v-if="visible == 'text'"
            @click="hidePassword()"
          />
        </div>
        <div>
          <p>Repeat password</p>
          <input
            :type="visibleRepeat"
            placeholder="Repeat password"
            v-model="auth.repeatPassword"
            :style="[
              msg.repeatPassword
                ? { outline: '2px solid rgb(207, 49, 49)' }
                : { outline: 'none' },
            ]"
          />
          <p class="msg" v-if="msg.repeatPassword">{{ msg.repeatPassword }}</p>
          <img
            src="@/assets/eye.svg"
            class="register__step2__form__eye"
            v-if="visibleRepeat == 'password'"
            @click="showPasswordRepeat()"
          />
          <img
            src="@/assets/eye-off.svg"
            class="register__step2__form__eye"
            v-if="visibleRepeat == 'text'"
            @click="hidePasswordRepeat()"
          />
        </div>
        <div>
          <p>Select your country</p>
          <select id="country" name="country" v-model="registration.country">
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
          <p>City</p>
          <input
            placeholder="Enter your city"
            v-model="registration.city"
            :style="[
              msg.city
                ? { outline: '2px solid rgb(207, 49, 49)' }
                : { outline: 'none' },
            ]"
          />
          <p class="msg" v-if="msg.city">{{ msg.city }}</p>
        </div>
        <div>
          <p>Add your social links</p>
          <select id="social-icons" name="social-icons" v-model="linkChosen">
            <option value="Instagram">Instagram</option>
            <option value="Facebook">Facebook</option>
            <option value="TikTok">TikTok</option>
            <option value="YouTube">YouTube</option>
            <option value="LinkedIn">LinkedIn</option>
          </select>
        </div>
        <div v-show="linkChosen === 'Instagram'">
          <p>Instagram</p>
          <input
            placeholder="Paste your Instagram profile link"
            v-model="registration.socialLinks.instagram"
          />
        </div>
        <div v-show="linkChosen === 'Facebook'">
          <p>Facebook</p>
          <input
            placeholder="Paste your Facebook profile link"
            v-model="registration.socialLinks.facebook"
          />
        </div>
        <div v-show="linkChosen === 'TikTok'">
          <p>TikTok</p>
          <input
            placeholder="Paste your TikTok profile link"
            v-model="registration.socialLinks.tiktok"
          />
        </div>
        <div v-show="linkChosen === 'YouTube'">
          <p>YouTube</p>
          <input
            placeholder="Paste your YouTube profile link"
            v-model="registration.socialLinks.youtube"
          />
        </div>
        <div v-show="linkChosen === 'LinkedIn'">
          <p>LinkedIn</p>
          <input
            placeholder="Paste your LinkedIn profile link"
            v-model="registration.socialLinks.linkedIn"
          />
        </div>
      </div>
      <div class="register__step2__footer">
        <button
          @click="
            back();
            emptyCategories();
          "
          type="button"
          class="secondary-button"
        >
          Back
        </button>
        <button @click="next()" type="button" class="primary-button">
          Next
        </button>
      </div>
    </div>

    <div
      class="register__step3 register__business"
      v-show="step === 3 && registration.accType == 'business'"
    >
      <h2>Select your business categories</h2>
      <div class="register__step3__form">
        <label class="register__step3__form__container"
          >Beauty products or services for women
          <input
            type="checkbox"
            value="beauty products or services for women"
            v-model="registration.categories"
          />
          <span class="checkmark"></span>
        </label>

        <label class="register__step3__form__container"
          >Grooming products or services for men
          <input
            type="checkbox"
            value="grooming products or services for men"
            v-model="registration.categories"
          />
          <span class="checkmark"></span>
        </label>

        <label class="register__step3__form__container"
          >Women's fashion
          <input
            type="checkbox"
            value="women's fashion"
            v-model="registration.categories"
          />
          <span class="checkmark"></span>
        </label>

        <label class="register__step3__form__container"
          >Men's fashion
          <input
            type="checkbox"
            value="men's fashion"
            v-model="registration.categories"
          />
          <span class="checkmark"></span>
        </label>

        <label class="register__step3__form__container"
          >Food and suplements
          <input
            type="checkbox"
            value="food and suplements"
            v-model="registration.categories"
          />
          <span class="checkmark"></span>
        </label>

        <label class="register__step3__form__container"
          >Sports and fitness
          <input
            type="checkbox"
            value="sports and fitness"
            v-model="registration.categories"
          />
          <span class="checkmark"></span>
        </label>

        <label class="register__step3__form__container"
          >Technology
          <input
            type="checkbox"
            value="technology"
            v-model="registration.categories"
          />
          <span class="checkmark"></span>
        </label>

        <label class="register__step3__form__container"
          >Travel and tourism
          <input
            type="checkbox"
            value="travel and tourism"
            v-model="registration.categories"
          />
          <span class="checkmark"></span>
        </label>

        <label class="register__step3__form__container"
          >Other
          <input
            type="checkbox"
            value="other"
            v-model="registration.categories"
          />
          <span class="checkmark"></span>
        </label>
        <p class="msg-category" v-if="msg.categories">{{ msg.categories }}</p>
      </div>
      <div class="register__step3__footer">
        <button @click="back()" type="button" class="secondary-button">
          Back
        </button>
        <button @click="next()" type="button" class="primary-button">
          Next
        </button>
      </div>
    </div>

    <div
      class="register__step3 register__promo"
      v-show="step === 3 && registration.accType == 'promo'"
    >
      <h2>Select your interests</h2>
      <div class="register__step3__form">
        <div>
          <label class="register__step3__form__container"
            >Beauty
            <input
              type="checkbox"
              value="beauty"
              v-model="registration.categories"
            />
            <span class="checkmark"></span>
          </label>

          <label class="register__step3__form__container"
            >Blogging/vlogging
            <input
              type="checkbox"
              value="blogging/vlogging"
              v-model="registration.categories"
            />
            <span class="checkmark"></span>
          </label>
        </div>

        <div>
          <label class="register__step3__form__container"
            >Fashion
            <input
              type="checkbox"
              value="fashion"
              v-model="registration.categories"
            />
            <span class="checkmark"></span>
          </label>

          <label class="register__step3__form__container"
            >Food
            <input
              type="checkbox"
              value="food"
              v-model="registration.categories"
            />
            <span class="checkmark"></span>
          </label>
        </div>

        <div>
          <label class="register__step3__form__container"
            >Technology
            <input
              type="checkbox"
              value="technology"
              v-model="registration.categories"
            />
            <span class="checkmark"></span>
          </label>

          <label class="register__step3__form__container"
            >Lifestyle
            <input
              type="checkbox"
              value="lifestyle"
              v-model="registration.categories"
            />
            <span class="checkmark"></span>
          </label>
        </div>

        <div>
          <label class="register__step3__form__container"
            >Music
            <input
              type="checkbox"
              value="music"
              v-model="registration.categories"
            />
            <span class="checkmark"></span>
          </label>

          <label class="register__step3__form__container"
            >Photography
            <input
              type="checkbox"
              value="photography"
              v-model="registration.categories"
            />
            <span class="checkmark"></span>
          </label>
        </div>

        <div>
          <label class="register__step3__form__container"
            >Sports and fitness
            <input
              type="checkbox"
              value="sports and fitness"
              v-model="registration.categories"
            />
            <span class="checkmark"></span>
          </label>

          <label class="register__step3__form__container"
            >Travel
            <input
              type="checkbox"
              value="travel"
              v-model="registration.categories"
            />
            <span class="checkmark"></span>
          </label>
        </div>

        <div>
          <label class="register__step3__form__container"
            >Other
            <input
              type="checkbox"
              value="other"
              v-model="registration.categories"
            />
            <span class="checkmark"></span>
          </label>
        </div>
        <p class="msg-category" v-if="msg.categories">{{ msg.categories }}</p>
      </div>
      <div class="register__step3__footer">
        <button @click="back()" type="button" class="secondary-button">
          Back
        </button>
        <button @click="next()" type="button" class="primary-button">
          Next
        </button>
      </div>
    </div>

    <div class="register__step4" v-show="step === 4">
      <div class="register__step4__header">
        <croppa
          v-model="registration.profileImgReference"
          :width="90"
          :height="90"
          placeholder=""
          placeholder-color="#2b3033"
          :placeholder-font-size="10"
          canvas-color="transparent"
          :show-remove-button="true"
          remove-button-color="#8b889c"
          :remove-button-size="28"
          :prevent-white-space="true"
        >
          <img slot="placeholder" src="@/assets/camera.svg" />
          <div
            class="spinner"
            v-if="
              registration.profileImgReference &&
              registration.profileImgReference.loading
            "
          ></div>
          >
        </croppa>
        <div class="register__step4__header__text">
          <h2>{{ registration.name }}</h2>
          <h4> {{ registration.city }}, {{ registration.country }}</h4>
        </div>
        <div class="register__step4__header__icons">
          <a
            :href="registration.socialLinks.instagram"
            target="_blank"
            v-if="registration.socialLinks.instagram"
          >
            <icon-library name="instagram" />
          </a>
          <a
            :href="registration.socialLinks.facebook"
            target="_blank"
            v-if="registration.socialLinks.facebook"
          >
            <icon-library name="facebook" />
          </a>
          <a
            :href="registration.socialLinks.tiktok"
            target="_blank"
            v-if="registration.socialLinks.tiktok"
          >
            <icon-library name="tiktok" />
          </a>
          <a
            :href="registration.socialLinks.youtube"
            target="_blank"
            v-if="registration.socialLinks.youtube"
          >
            <icon-library name="youtube" />
          </a>
          <a
            :href="registration.socialLinks.linkedIn"
            target="_blank"
            v-if="registration.socialLinks.linkedIn"
          >
            <icon-library name="linkedin" />
          </a>
        </div>
      </div>
      <div class="register__step4__content">
        <div v-if="registration.accType === 'business'">
          <p>Bio</p>
          <textarea
            placeholder="Enter a few word about your brand"
            v-model="registration.bio"
          />
        </div>
        <div v-if="registration.accType === 'promo'">
          <p>Bio</p>
          <textarea
            placeholder="Enter a few words about yourself"
            v-model="registration.bio"
          />
        </div>
        <span>Gallery</span>
        <button class="primary-button" @click="openInput">Add</button>
        <input
          type="file"
          @change="uploadFile"
          multiple
          accept="image/*"
          ref="fileInput"
          style="display: none"
        />
        <div class="register__step4__content__gallery">
          <div
            v-for="(file, index) in fileUrl"
            :key="index"
            class="register__step4__content__gallery__post"
          >
            <img
              class="register__step4__content__gallery__post__img"
              :src="file"
            />
            <img
              src="@/assets/x.svg"
              height="28"
              class="register__step4__content__gallery__post__removeBtn"
              @click="removeFile(index)"
            />
            <textarea
              placeholder="Enter a description"
              v-model="registration.files[index].desc"
            />
          </div>
        </div>
      </div>
      <div class="register__step4__footer">
        <button @click="back()" type="button" class="secondary-button">
          Back
        </button>
        <button type="button" class="primary-button" @click="finish()">
          Finish
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import IconLibrary from "@/components/IconLibrary.vue";
import loadingModal from "@/components/loadingModal.vue";
import store from "@/store";
import {
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
  updateDoc,
  setDoc,
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  arrayUnion,
} from "@/firebase";

export default {
  name: "Register",
  data: function () {
    return {
      store,
      openLoading: false,
      loading: true,
      step: 1,
      msg: [],
      visible: "password",
      visibleRepeat: "password",
      linkChosen: "Instagram",
      fileUrl: [],
      auth: {
        email: null,
        password: null,
        repeatPassword: null,
      },
      registration: {
        accType: "business",
        name: null,
        country: "Croatia",
        city: null,
        socialLinks: {
          instagram: null,
          facebook: null,
          tiktok: null,
          youtube: null,
          linkedIn: null,
        },
        categories: [],
        profileImgReference: null,
        bio: null,
        files: [],
      },
    };
  },

  components: {
    IconLibrary,
    loadingModal
  },
  methods: {
    next() {
      this.step++;
    },
    back() {
      this.step--;
    },
    showPassword() {
      this.visible = "text";
    },
    hidePassword() {
      this.visible = "password";
    },
    showPasswordRepeat() {
      this.visibleRepeat = "text";
    },
    hidePasswordRepeat() {
      this.visibleRepeat = "password";
    },
    openInput() {
      this.$refs.fileInput.click();
    },
    uploadFile(event) {
      const selectedFiles = event.target.files;
      const self = this;
      for (var i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        if (!file.type.match("image.*")) {
          continue;
        }
        setTimeout(() => {
          this.registration.files.push({
            img: file,
            desc: "",
          });
          const reader = new FileReader();
          reader.onload = function (event) {
            self.fileUrl.push(event.target.result);
          };
          reader.readAsDataURL(file);
        }, i * 1000);
      }
    },
    removeFile(index) {
      this.registration.files.splice(index, 1);
      this.fileUrl.splice(index, 1);
      this.$refs.fileInput.value = null;
    },
    emptyCategories() {
      this.registration.categories = [];
    },

    async finish() {
      let valid = true;

      if (
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.auth.email)
      ) {
        this.msg["email"] = "";
        valid = true;
      } else {
        this.msg["email"] = "Invalid Email Address";
        this.step = 2;
        valid = false;
      }

      if (!this.auth.password || this.auth.password.length < 6) {
        this.msg["password"] = "Password must be at least 6 characters";
        this.step = 2;
        valid = false;
      } else {
        this.msg["password"] = "";
        valid = true;
      }

      if (this.auth.password !== this.auth.repeatPassword) {
        this.msg["repeatPassword"] = "Password doesn't match";
        this.step = 2;
        valid = false;
      }

      if (!this.registration.name) {
        this.msg["name"] = "This field cannot be empty";
        this.step = 2;
        valid = false;
      }

      if (!this.registration.city) {
        this.msg["city"] = "This field cannot be empty";
        this.step = 2;
        valid = false;
      }

      if (this.registration.categories.length < 1) {
        this.msg["categories"] = "Please select at least one category!";
        valid = false;
        if (this.step == 2) {
          this.step = 2;
        } else {
          this.step = 3;
        }
      }
      
      store.loadingTime = this.registration.files.length * 3000;

      if (valid) {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          this.auth.email,
          this.auth.password
        );

        this.openLoading = true;        

        await setDoc(doc(db, "accounts", user.uid), {
          uid: user.uid,
          accType: this.registration.accType,
          name: this.registration.name,
          country: this.registration.country,
          city: this.registration.city,
          instagram: this.registration.socialLinks.instagram,
          facebook: this.registration.socialLinks.facebook,
          tiktok: this.registration.socialLinks.tiktok,
          youtube: this.registration.socialLinks.youtube,
          linkedIn: this.registration.socialLinks.linkedIn,
          categories: this.registration.categories,
          bio: this.registration.bio,
        });

        // Create the file metadata
        /** @type {any} */
        const metadata = {
          contentType: "image",
        };

        this.registration.profileImgReference.generateBlob((blobData) => {
          let profileImgName = this.registration.name + "-profile-image.png";

          const storageRef = ref(
            storage,
            this.registration.name + `(${user.uid})/` + profileImgName
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
              await updateDoc(doc(db, "accounts", user.uid), {
                profileImg: profileImgUrl,
              });
            }
          );
        });

        for (let i = 0; i < this.registration.files.length; i++) {
          setTimeout(async () => {
            let imagesName =
              this.registration.name + "-image-" + Date.now() + ".png";
            const storageRef = ref(
              storage,
              this.registration.name + `(${user.uid})/` + imagesName
            );
            const uploadImges = uploadBytesResumable(
              storageRef,
              this.registration.files[i].img,
              metadata
            );

            // Listen for state changes, errors, and completion of the upload.

            uploadImges.on(
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

                // if( progress == 100 && i == this.registration.files.length - 1 ) {
                //   console.log("All done!")
                //   store.loading = false;
                //   router.push({ name: "Home" });
                // } else {
                //   store.loading = true;
                // }
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
                const imagesUrl = await getDownloadURL(
                  uploadImges.snapshot.ref
                );
                let imagesDesc = this.registration.files[i].desc;
                const image = { url: imagesUrl, desc: imagesDesc };
                await updateDoc(doc(db, "accounts", user.uid), {
                  images: arrayUnion(image),
                });
                if ((i == this.registration.files.length - 1)) {
                  this.loading = false;
                }
              }
            );
          }, i * 3000);
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/_shared.scss";

.register {
  display: flex;
  width: 100%;
  flex-basis: 1293px;
  padding: 50px 20px;
  justify-content: space-between;
  margin: auto;

  &__sidebar {
    min-width: 283px;
    margin-right: 100px;
    position: relative;
    min-height: 522px;
    top: 0px;
    &__title {
      margin-bottom: 40px;

      img {
        display: block;
        margin-bottom: 10px;
      }

      span {
        margin-left: 52px;
        font-size: 19px;
        font-weight: 600;
      }
    }

    &__steps {
      span {
        display: block;
        padding: 40px 0px 0px 50px;
      }
    }
    &__steps::after {
      content: "";
      position: absolute;
      width: 4px;
      height: 185px;
      top: 2px;
      left: 0px;
      margin-top: 155px;
      background: color(border);
    }

    @include breakpoint4 {
      display: none;
    }

    .progress {
      position: absolute;
      width: 4px;
      top: 158px;
      background-color: color(primary);
      z-index: 20;
      transition: 0.5s ease-in-out;
    }

    .bulletpoint {
      background: color(border);
      position: absolute;
      height: 12px;
      width: 12px;
      border-radius: 50%;
      z-index: 50;
      left: -4px;
      transition: 0.7s ease-in-out;
    }

    .b1 {
      top: 157px;
    }

    .b2 {
      top: 215px;
    }

    .b3 {
      top: 273px;
    }

    .b4 {
      top: 331px;
    }
  }

  &__step1 {
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    margin: auto;
    max-width: 90%;
    animation: fadeIn 0.5s ease;

    &__options {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;

      &__radios {
        input {
          display: none;
        }

        input:checked + .register__step1__options__radios__btn {
          border: 3px solid color(primary);
        }

        &__btn {
          margin: 71px 30px 0px 30px;
          padding: 20px;
          border: 3px solid transparent;
          display: inline-block;
          border-radius: 10px;
          position: relative;
          text-align: center;
          box-shadow: 0 0 20px #c3c3c367;
          cursor: pointer;

          h3 {
            margin-top: 20px;
          }
        }
      }
    }
    .primary-button {
      float: right;
      margin: 71px 30px 0px 0px;
    }
  }

  &__step2 {
    background-color: #fff;
    max-width: 616px;
    margin: auto;
    padding: 30px;
    border-radius: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    width: 90%;
    animation: fadeIn 0.5s ease;

    &__form {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      margin: 40px 0;

      div {
        flex: 1;

        input,
        select {
          padding: 12px;
          margin-top: 5px;
          border: none;
          border-radius: 10px;
          background-color: color(input);
          width: 100%;
          min-width: 268px;
        }
      }

      &__eye {
        height: 25px;
        position: absolute;
        cursor: pointer;
        margin-top: 12.5px;
        margin-left: -35px;
      }
    }

    &__footer {
      .primary-button {
        float: right;
        margin-right: 30px;
      }
      .secondary-button {
        margin-left: 30px;
      }
    }
  }

  &__step3 {
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
    display: flex;
    margin: auto;
    flex-direction: column;
    flex-basis: 616px;
    min-height: 522px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    max-width: 90%;
    animation: fadeIn 0.5s ease;

    &__form {
      margin: 60px 0px 0px 20px;

      &__container {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 12px;
        cursor: pointer;
        font-size: 16px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }

        .checkmark {
          position: absolute;
          top: 0;
          left: 0;
          height: 19px;
          width: 19px;
          background-color: color(input);
          border-radius: 2px;
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

    &__footer {
      .primary-button {
        float: right;
        margin-right: 30px;
      }
      .secondary-button {
        margin-left: 30px;
      }
    }
  }

  &__business {
    .register__step3__footer {
      margin-top: 62px;
    }
  }

  &__promo {
    .register__step3__form {
      margin-left: 30px;
      margin-right: 30px;
      min-height: 272px;

      div {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .register__step3__form__container {
          width: 185px;
        }
      }
    }
    .register__step3__footer {
      margin-top: 60px;
    }
  }

  &__step4 {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 870px;
    min-height: 522px;
    gap: 30px;
    max-width: 90%;
    margin: auto;
    animation: fadeIn 0.5s ease;

    &__header {
      display: flex;
      gap: 30px;

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

    &__content {
      textarea {
        padding: 12px;
        margin-top: 5px;
        border: none;
        border-radius: 10px;
        background-color: color(input);
        width: 100%;
        resize: none;
        font-family: Arial, Helvetica, sans-serif;
        line-height: 1.5;
        margin-bottom: 20px;
      }

      &__gallery {
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 15px;

        &__post {
          animation: fadeIn 0.5s;
          max-width: 280px;

          &__img {
            height: 280px;
            width: 280px;
            object-fit: cover;
            border-radius: 5px;
          }

          textarea {
            margin-bottom: 0px;
          }

          &__removeBtn {
            position: absolute;
            margin-left: -15px;
            margin-top: -7px;
            background: #fff;
            border-radius: 50%;
            border: 1px solid #fff;
            cursor: pointer;
            transition: 0.2s ease-in;
          }

          &__removeBtn:hover {
            transform: scale(1.2);
          }
        }
      }

      .primary-button {
        padding: 9px 15px;
        margin-left: 15px;
        border-radius: 15px;
      }
    }

    &__footer {
      display: flex;
      justify-content: space-between;
      margin-top: auto;
      .primary-button {
        margin-right: 30px;
      }
      .secondary-button {
        margin-left: 30px;
      }
    }
  }
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

.croppa-container {
  background-color: color(input);
  border-radius: 50%;

  canvas {
    border-radius: 50%;
  }

  svg.icon-remove {
    filter: drop-shadow(0px 0px 0px rgba(0, 0, 0, 0));
    border: 1px solid #fff;
    transition: 0.2s ease-in;
  }

  svg.icon-remove:hover {
    transform: scale(1.2);
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