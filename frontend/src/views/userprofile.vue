<template>
  <section id="app">
    <template v-if="choice === 'info'">
      <div class="body">
        <br /><br /><br /><br /><br />
        <h1
          class="has-text-white"
          style="
            font-weight: 700;
            font-size: 60px;
            line-height: 66px;
            text-align: center;
          "
        >
          User profile
        </h1>
        <br />
        <div class="userCon is-flex">
          <div
            class="
              left
              is-flex is-flex-direction-column is-align-items-center
              mt-4
            "
          >
            <button
              class="mt-5 leftBtn"
              v-bind:class="{ whiteBorder: personalW }"
              @click="whiteBorder('w')"
            >
              Personal information
            </button>
            <button
              class="mt-5 leftBtn"
              v-bind:class="{ whiteBorder: personalR }"
              @click="whiteBorder('r')"
            >
              Reservation history
            </button>
            <button
              class="mt-5 leftBtn"
              v-bind:class="{ whiteBorder: personalL }"
              @click="whiteBorder('l')"
            >
              Log out
            </button>
          </div>
          <div class="right">
            <div class="card mt-5 is-flex">
              <div
                class="
                  cardLeft
                  is-flex
                  is-flex-direction-column
                  is-justify-content-center
                  is-a
                "
              >
                <p class="ml-4">
                  <b class="has-text-black">Name:</b>
                  {{ user.first_name }} {{ user.last_name }}
                </p>
                <p class="mt-5 ml-4">
                  <b class="has-text-black">Birth of date:</b>
                  {{ user.dob.slice(0, 10) }}
                </p>
                <p class="mt-5 ml-4">
                  <b class="has-text-black">Gender:</b> {{ user.gender }}
                </p>
                <p class="mt-5 ml-4">
                  <b class="has-text-black">Email:</b> {{ user.email }}
                </p>
                <p class="mt-5 ml-4">
                  <b class="has-text-black">Phone:</b>
                  {{ user.phone }}
                </p>
                <button
                  class="editbtn has-text-white mt-5 ml-4"
                  @click="showeditpersonal()"
                >
                  Edit personal information
                </button>
                <button
                  class="editbtn has-text-white mt-5 ml-4"
                  @click="showchangepassword()"
                >
                  Change Password
                </button>
              </div>
              <div
                class="
                  cardRight
                  is-flex is-justify-content-center is-align-items-center
                "
              >
                <div
                  class="
                    background
                    has-background-white
                    is-flex
                    is-justify-content-center
                    is-align-items-center
                    is-flex-direction-column
                  "
                >
                  <div class="imgL">
                    <img src="lang soi.png" alt="" />
                  </div>

                  <div class="imgD">
                    <img :src="url + user.path" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-bind:class="{ modal: true, 'is-active': show_model }">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">Edit Personal</p>
              <button
                class="delete"
                aria-label="close"
                @click="closeeditpersonal()"
              ></button>
            </header>
            <section class="modal-card-body">
              <div class="is-flex is-justify-content-left">
                <div>
                  <input
                    class="input"
                    type="text"
                    placeholder="First Name"
                    style="width: 100%"
                    v-model="$v.edit_fname.$model"
                    :class="{ 'is-danger': $v.edit_fname.$error }"
                  />
                  <template v-if="$v.edit_fname.$error">
                    <p class="help is-danger" v-if="!$v.edit_fname.required">
                      <!--check req-->
                      This field is required
                    </p>
                    <p class="help is-danger" v-if="!$v.edit_fname.minLength">
                      firstname must contain at least 5 characters
                    </p>
                    <p class="help is-danger" v-if="!$v.edit_fname.maxLength">
                      lastname is over 150 characters
                    </p>
                    <!--check email format-->
                  </template>
                </div>
                <div>
                  <input
                    class="input"
                    type="text"
                    placeholder="Last Name"
                    style="width: 100%"
                    v-model="$v.edit_lname.$model"
                    :class="{ 'is-danger': $v.edit_lname.$error }"
                  />
                  <template v-if="$v.edit_lname.$error">
                    <p class="help is-danger" v-if="!$v.edit_lname.required">
                      <!--check req-->
                      This field is required
                    </p>
                    <p class="help is-danger" v-if="!$v.edit_lname.minLength">
                      lastname must contain at least 5 characters
                    </p>
                    <p class="help is-danger" v-if="!$v.edit_lname.maxLength">
                      lastname is over 150 characters
                    </p>
                    <!--check email format-->
                  </template>
                </div>
              </div>
              <br />
              <div
                class="select is-flex is-justify-content-left"
                style="width: 50%"
              >
                <select
                  style="width: 100%"
                  v-model="$v.edit_gender.$model"
                  :class="{ 'is-danger': $v.edit_gender.$error }"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <br />

              <div>
                <input
                  class="input"
                  type="email"
                  placeholder="Email"
                  style="width: 100%"
                  v-model="$v.edit_email.$model"
                  :class="{ 'is-danger': $v.edit_email.$error }"
                />
                <template v-if="$v.edit_email.$error">
                  <p class="help is-danger" v-if="!$v.edit_email.required">
                    <!--check req-->
                    This field is required
                  </p>
                  <p class="help is-danger" v-if="!$v.edit_email.email">
                    Invalid Email
                  </p>
                  <!--check email format-->
                  <!--check email format-->
                </template>
              </div>

              <br />
              <div class="is-flex is-justify-content-left">
                <div>
                  <input
                    class="input"
                    type="text"
                    placeholder="Phone"
                    style="width: 100%"
                    v-model="$v.edit_phone.$model"
                    :class="{ 'is-danger': $v.edit_phone.$error }"
                  />
                  <template v-if="$v.edit_phone.$error">
                    <p class="help is-danger" v-if="!$v.edit_phone.required">
                      This field is required
                    </p>
                    <p class="help is-danger" v-if="!$v.edit_phone.phone_check">
                      Invalid Phone Number
                    </p>
                    <!--check email format-->
                  </template>
                </div>
              </div>
              <br />

              <div class="file has-name">
                <label class="file-label">
                  <input
                    class="file-input"
                    multiple
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    @change="selectImages"
                    name="myImage"
                  />
                  <span class="file-cta">
                    <span class="file-icon">
                      <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label"> Choose a file… </span>
                  </span>
                  <span class="has-name file-name">
                    {{ filename }}
                  </span>
                </label>
              </div>
              <br />
              <div v-if="images" class="columns is-multiline">
                <div
                  v-for="(image, index) in xxx"
                  :key="image.id"
                  class="column is-one-quarter"
                >
                  <div class="card">
                    <div class="card-image">
                      <figure class="image is-4by3">
                        <img
                          :src="showSelectImage(image)"
                          alt="Placeholder image"
                        />
                      </figure>
                    </div>
                    <footer class="card-footer">
                      <a
                        @click="deleteSelectImage(index)"
                        class="card-footer-item has-text-danger"
                        >Delete</a
                      >
                    </footer>
                  </div>
                </div>
              </div>

              <!-- Content ... -->
            </section>
            <footer class="modal-card-foot">
              <button class="button is-success" @click="summiteditpersonal()">
                Save changes
              </button>
              <button class="button" @click="closeeditpersonal()">
                Cancel
              </button>
            </footer>
          </div>
        </div>

        <div
          v-bind:class="{ modal: true, 'is-active': show_model_editpassword }"
        >
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">Change Password</p>
              <button
                class="delete"
                aria-label="close"
                @click="closechangepassword()"
              ></button>
            </header>
            <section class="modal-card-body">
              <label><h1 class="is-size-5">Old Password</h1></label>
              <div class="is-flex is-justify-content-left">
                <input
                  class="input"
                  type="password"
                  placeholder="Old Password"
                  style="width: 60%"
                  v-model="$v.sent_old_password.$model"
                />
                <template v-if="$v.sent_old_password.$error">
                  <p
                    class="help is-danger"
                    v-if="!$v.sent_old_password.required"
                  >
                    This field is required
                  </p>
                  <p
                    class="help is-danger"
                    v-if="!$v.sent_old_password.minLength"
                  >
                    Password be at least 8 letters
                  </p>
                  <p
                    class="help is-danger"
                    v-if="!$v.sent_old_password.complexPassword"
                  >
                    Password is too easy
                  </p>
                </template>
              </div>
              <br />
              <label><h1 class="is-size-5">New Password</h1></label>
              <div class="is-flex is-justify-content-left">
                <input
                  class="input"
                  type="password"
                  placeholder="New Password"
                  style="width: 60%"
                  v-model="$v.sent_new_password.$model"
                />
                <template v-if="$v.sent_new_password.$error">
                  <p
                    class="help is-danger"
                    v-if="!$v.sent_new_password.required"
                  >
                    This field is required
                  </p>
                  <p
                    class="help is-danger"
                    v-if="!$v.sent_new_password.minLength"
                  >
                    Password be at least 8 letters
                  </p>
                  <p
                    class="help is-danger"
                    v-if="!$v.sent_new_password.complexPassword"
                  >
                    Password is too easy
                  </p>
                </template>
              </div>
              <br />
              <label><h1 class="is-size-5">Confirm New Password</h1></label>
              <div class="is-flex is-justify-content-left">
                <input
                  class="input"
                  type="password"
                  placeholder="Comfirm Password"
                  style="width: 60%"
                  v-model="$v.sent_con_password.$model"
                />
                <template v-if="$v.sent_con_password.$error">
                  <p
                    class="help is-danger"
                    v-if="!$v.sent_con_password.required"
                  >
                    This field is required
                  </p>
                  <p class="help is-danger" v-if="!$v.sent_con_password.sameAs">
                    Password doesn't match!
                  </p>
                </template>
              </div>
              <!-- Content ... -->
            </section>
            <footer class="modal-card-foot">
              <button class="button is-success" @click="summitchangepassword()">
                Save changes
              </button>
              <button class="button" @click="closechangepassword()">
                Cancel
              </button>
            </footer>
          </div>
        </div>
      </div>
    </template>
    <template v-if="choice === 'res'">
      <div class="body">
        <br /><br /><br /><br /><br />
        <h1
          class="has-text-white"
          style="
            font-weight: 700;
            font-size: 60px;
            line-height: 66px;
            text-align: center;
          "
        >
          User profile
        </h1>
        <br />
        <div class="userCon is-flex">
          <div
            class="
              left
              is-flex is-flex-direction-column is-align-items-center
              mt-4
            "
          >
            <button
              class="mt-5 leftBtn"
              v-bind:class="{ whiteBorder: personalW }"
              @click="whiteBorder('w')"
            >
              Personal information
            </button>
            <button
              class="mt-5 leftBtn"
              v-bind:class="{ whiteBorder: personalR }"
              @click="whiteBorder('r')"
            >
              Reservation history
            </button>
            <button
              class="mt-5 leftBtn"
              v-bind:class="{ whiteBorder: personalL }"
              v-on:click="logout(); whiteBorder('l'); "
            >
              Log out
            </button>
          </div>
          <div class="right">
            <div class="card mt-5">
              <table class="table ml-6">
                <thead>
                  <th><b>Reservation history</b></th>
                  <br />
                  <tr class="">
                    <th>Booking date</th>
                    <th>Time</th>
                    <th>Seat</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in res" :key="item.res_no">
                    <td>{{ item.res_date.substring(0,10) }}</td>
                    <td>{{ timeconvert(item.res_time) }}</td>
                    <td>{{ item.res_seat }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>
<script>
import axios from "@/plugins/axios";
import {
  required,
  minLength,
  sameAs,
  email,
  maxLength,
} from "vuelidate/lib/validators";

function phone_check(value) {
  //custom validation
  return !!value.match(/0[0-9]{9}/);
}

function complexPassword(value) {
  if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
    return false;
  }
  return true;
}

export default {
  data() {
    return {
      user: {
        user_id: null,
        first_name: "",
        last_name: "",
        dob: "",
        gender: "",
        phone: "",
        email: "",
        username: "",
        password: "",
        path: null,
        user_type: "",
      },
      // res:{
      //   booking_date: '',
      //   res_date: '',
      //   res_no:'',
      //   res_seat:'',
      //   res_time:'',
      //   user_id: null
      // },
      res: [],
      choice: "info",
      personalW: true,
      personalR: false,
      personalL: false,
      show_model: false,
      show_model_editpassword: false,

      edit_fname: "",
      edit_lname: "",
      edit_gender: "",
      edit_email: "",
      edit_phone: "",

      sent_old_password: "",
      sent_new_password: "",
      sent_con_password: "",
      images: null,
      xxx: "",
      filename: "",
      url: "http://localhost:3000/",
    };
  },
  validations: {
    edit_email: {
      required: required,
      email: email,
    },
    edit_phone: {
      required: required,
      phone: phone_check,
    },
    sent_old_password: {
      required: required,
      minLength: minLength(8),
      complex: complexPassword,
    },
    sent_new_password: {
      required: required,
      minLength: minLength(8),
      complex: complexPassword,
    },
    sent_con_password: {
      required: required,
      sameAs: sameAs("sent_new_password"), //sameAs build-In validator
    },
    edit_fname: {
      required: required,
      maxLength: maxLength(150),
      minLength: minLength(5),
    },
    edit_lname: {
      required: required,
      maxLength: maxLength(150),
      minLength: minLength(5),
    },
    edit_gender: {
      required: required,
    },
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      const token = localStorage.getItem("token");
      axios.get("/user/me").then((res) => {
        this.user = res.data;
        this.getReserve();
      });
    },
    getReserve() {
      axios.get(`/user/profile/${this.user.user_id}`).then((res) => {
        this.res = res.data.res;
        console.log(this.res);
      });
    },
    whiteBorder(x) {
      if (x === "w") {
        console.log(this.user);
        console.log(this.res);
        // console.log(this.info)
        this.personalW = true;
        this.personalR = false;
        this.personalL = false;
        this.choice = "info";
        // alert('x')
      } else if (x === "r") {
        this.personalR = true;
        this.personalW = false;
        this.personalL = false;
        this.choice = "res";
      } else {
        this.personalW = false;
        this.personalR = false;
        this.personalL = true;
      }
    },
    showeditpersonal() {
      this.show_model = true;

      this.edit_fname = this.user.first_name;
      this.edit_lname = this.user.last_name;
      this.edit_gender = this.user.gender;
      this.edit_phone = this.user.phone;
      this.edit_email = this.user.email;
    },
    closeeditpersonal() {
      this.show_model = false;
    },
    summiteditpersonal() {
      this.$v.edit_fname.$touch();
      this.$v.edit_lname.$touch();
      this.$v.edit_gender.$touch();
      this.$v.edit_phone.$touch();
      this.$v.edit_email.$touch();
      if (
        !this.$v.edit_fname.$invalid ||
        !this.$v.edit_lname.$invalid ||
        !this.$v.edit_gender.$invalid ||
        !this.$v.edit_phone.$invalid ||
        !this.$v.edit_email.$invalid
      ) {
        let formData = new FormData();
        formData.append("id", this.user.user_id);
        formData.append("fname", this.edit_fname);
        formData.append("lname", this.edit_lname);
        formData.append("gender", this.edit_gender);
        formData.append("phone", this.edit_phone);
        formData.append("email", this.edit_email);
        formData.append("myImage", this.images);
        // let data = {
        //   id: this.user.user_id,
        //   fname: this.edit_fname,
        //   lname: this.edit_lname,
        //   gender: this.edit_gender,
        //   phone: this.edit_phone,
        //   email: this.edit_email,
        //   myImage: this.images,
        // };
        axios
          .put("http://localhost:3000/user/profile/edit", formData)
          .then((res) => {
            alert("editcomplete");
            this.getUser();
            this.show_model = false;
          })
          .catch((err) => {
            if (formData.myImage == null) {
              alert("Please insert image");
            }
            alert(err.response.data.details.message);
          });
      } else {
        console.log("bobo");
        console.log(this.$v);
      }
    },

    showchangepassword() {
      this.show_model_editpassword = true;
    },
    closechangepassword() {
      this.show_model_editpassword = false;
    },
    summitchangepassword() {
      this.$v.sent_old_password.$touch();
      this.$v.sent_new_password.$touch();
      this.$v.sent_con_password.$touch();
      if (
        !this.$v.sent_old_password.$invalid ||
        !this.$v.sent_new_password.$invalid ||
        !this.$v.sent_con_password.$invalid
      ) {
        let formData = {
          password: this.sent_old_password,
          new_password: this.sent_new_password,
          confirm_password: this.sent_con_password,
          id: this.user.user_id,
        };
        axios
          .put("http://localhost:3000/user/profile/changepassword", formData)
          .then((res) => {
            alert("edit_pass_complete");
            this.getUser();
            this.show_model_editpassword = false;
          })
          .catch((err) => {
            alert(err.response.data.details.message);
          });
      }
    },
    selectImages(event) {
      this.xxx = event.target.files;
      this.images = event.target.files[0];
      // console.log(this.images)
      this.filename = this.images.name;
    },
    showSelectImage() {
      // for preview only
      return URL.createObjectURL(this.images);
    },
    deleteSelectImage(index) {
      this.images = null;
      this.filename = '';
    },
     timeconvert(time_in) {
      var time_hour = parseInt(time_in.slice(11, 13)) + 7;
      var time_min = time_in.slice(14, 16);
      var time_sec = time_in.slice(17, 19);
      return time_hour + ":" + time_min + ":" + time_sec;
    },
    logout() {
      localStorage.clear();
      this.$router.push("../");
      location.reload();
    }
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Podkova";
}

body {
  overflow-y: hidden;
}

.navbar {
  height: 80px;
  /* display: flex; */
  /* background-color: black; */
  /* border: 2px solid black; */
  font-size: 24px;
  font-weight: 800;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.navbar-item {
  /* border: 2px solid black; */
  /* height: 80%; */
  /* margin: 1em; */
  color: black;
  margin-left: 1em;
}

.body {
  width: 100%;
  height: 960px;
  background: #141414;
}

.userCon {
  width: 100%;
  height: 750px;
  /* border: 2px solid white; */
  /* background-color: red; */
}

.left {
  width: 500px;
  height: 750px;
  /* background-color: white; */
}

.right {
  width: 1300px;
  height: 750px;
  /* background-color: aqua; */
}

.leftBtn {
  width: 310px;
  height: 55px;
  border-radius: 25px;
  background: #c4c4c4;
  font-weight: 700;
  font-size: 22px;
  line-height: 24px;
  outline: none;
  text-decoration: none;
  /* border: 3px solid white; */
}

.whiteBorder {
  border: 3px solid white;
}

button {
  outline: none;
}

button:active {
  border-style: outset;
}

.card {
  width: 85%;
  height: 75%;
  border-radius: 50px;
  background: #c4c4c4;
}

.cardLeft {
  width: 40%;
  height: 100%;
  /* background-color: red; */
  /* border: 2px solid blue; */
}

.cardLeft p {
  font-weight: 500;
  font-size: 24px;
}

.cardRight {
  position: relative;
  width: 60%;
  height: 100%;
  /* border: 2px solid green; */
  /* background-color: red; */
  transform: scale(0.8);
}

.editbtn {
  background: #282828;
  width: 290px;
  height: 65px;
  border-radius: 10px;
  font-weight: 500;
  font-size: 22px;
}

.background {
  width: 700px;
  height: 100%;
  /* background-color: red; */
  border-radius: 35px;
}

.imgL {
  width: 350px;
}

.imgL img {
  transform: scale(0.85);
}

.imgD {
  width: 320px;
  height: 370px;
  border-radius: 50%;
  /* background-color: red; */
}

.imgD img {
  border-radius: 50%;
}

.table {
  width: 80%;
  background-color: #c4c4c4;
  font-size: 18px;
}
</style>