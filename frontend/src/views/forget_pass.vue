<template>
  <div class="hero is-fullheight-with-navbar is-flex is-justify-content-center">
    <div class="hero" style="transform: scale(0.75); drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));">
      <div
        class="
          container is-flex is-justify-content-center
        "
      >
        <div class="manageContainer is-flex is-justify-content-center">
          <div
            class="
              showPanel
              is-flex is-flex-direction-column is-align-items-center
            "
          >
            <div>
              <h1 class="is-size-1 has-text-black" >Create New Password</h1>
            </div>
            <br /><br /><br />
            <div class="is-flex is-flex-direction-column login">
              <div class="field" v-if="pass">
                <label for="username" style="font-weight: 700;
font-size: 23px;">Username:</label><br />
                <input
                  v-model="$v.username.$model"
                  :class="{ 'is-danger': $v.username.$error }"
                  class="log-input"
                  type="text"

                />
                <template v-if="$v.username.$error">
                  <p class="help is-danger is-size-5" v-if="!$v.username.required">
                    This field is required
                  </p>
                  <p class="help is-danger is-size-5" v-if="!$v.username.minValue">
                    Username must contain at least 5 characters
                  </p>
                </template>
              </div>

              <div class="field" v-if="pass">
                <label for="phone" style="font-weight: 700;
font-size: 23px;">Phone:</label><br />
                <input
                  v-model="$v.phone.$model"
                  :class="{ 'is-danger': $v.phone.$error }"
                  class="log-input"
                  type="text"
                />
                <template v-if="$v.phone.$error">
                  <p class="help is-danger is-size-5" v-if="!$v.phone.required">
                    This field is required
                  </p>
                  <p class="help is-danger is-size-5" v-if="!$v.phone.phone_check">
                    Invalid Phone Number
                  </p>
                </template>
              </div>
              <div class="field" v-if="pass == false">
                <label for="newpass">New Password:</label><br />
                <input
                  v-model="$v.new_password.$model"
                  :class="{ 'is-danger': $v.new_password.$error }"
                  class="log-input"
                  type="password"
                />
                <template
                  v-if="$v.new_password.$error"
                >
                  <p class="help is-danger is-size-5" v-if="!$v.new_password.required">
                    This field is required
                  </p>
                  <p
                    class="help is-danger is-size-5"
                    v-if="!$v.new_password.complexPassword"
                  >
                    Password is too easy!
                  </p>
                </template>
              </div>
              <div class="field" v-if="pass == false">
                <label for="newpass" class="is-size-5">Confirm New Password:</label><br />
                <input
                  v-model="$v.confirm_password.$model"
                  :class="{ 'is-danger': $v.confirm_password.$error }"
                  class="log-input"
                  type="password"
                />
                <template
                  v-if="$v.confirm_password.$error"
                >
                  <p
                    class="help is-danger is-size-5"
                    v-if="!$v.confirm_password.required"
                  >
                    This field is required
                  </p>
                  <p class="help is-danger is-size-5" v-if="!$v.confirm_password.sameAs">
                    Password doesn't match
                  </p>
                </template>
              </div>
              <br />
              <div>
                <button
                  v-if="pass"
                  class="has-text-white btn-login"
                  @click="next()"
                >
                  Next
                </button>
                <button
                  v-if="pass == false"
                  class="has-text-white btn-login" 
                  @click="submit();"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
import { required, sameAs, minLength } from "vuelidate/lib/validators";

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
      username: "",
      password: "",
      phone: "",
      new_password: "",
      confirm_password: "",
      pass: true,
      error: "",
      nextpage: false,
    };
  },
  methods: {
    submit() {
      // Validate all fields
      this.$v.$touch();
      console.log("hi");
      // เช็คว่าในฟอร์มไม่มี error
      if (!this.$v.new_password.$invalid || !this.$v.confirm_password.$invalid) {
        let data = {
          username: this.username,
          new_password: this.new_password,
          confirm_password: this.confirm_password,
          phone: this.phone,
        };

        axios
          .put("http://localhost:3000/forgetpass/change", data)
          .then((res) => {
            alert("edit password complete");
            //   this.isEditReserveModal = false;
            //   this.mangedata();
            this.$router.push({ path: "/user/login" });
          })
          .catch((error) => {
            this.error = error.response.data;
            console.log(error.response.data);
          });
      } else {
        console.log("bobo");
      }
    },
    next() {
      this.$v.username.$touch();
      this.$v.phone.$touch();
      console.log("hi next");
      console.log(this.username);
      console.log(this.phone);
      if (!this.$v.username.$invalid || !this.$v.phone.$invalid) {
        let data = {
          username: this.username,
          phone: this.phone,
        };
        axios
          .post("http://localhost:3000/forgetpass/getuser", data)
          .then((res) => {
            // alert("edit password complete");
            //   this.isEditReserveModal = false;
            //   this.mangedata();
            this.pass = false;
            console.log("done!");
          })
          .catch((error) => {
            alert("username of phone number incorrect");
            this.error = error.response.data;
            console.log(error.response.data);
          });
      } else {
        //   this.pass = true;
        // this.nextpage = false;
        console.log("bobo next failed");
      }
    //   this.new_password = "";
    //   this.confirm_password = "";
      console.log(this.$v);
    },
  },
  validations: {
    username: {
      required: required,
      minLength: minLength(5),
    },
    phone: {
      required: required,
      phone: phone_check,
    },
    new_password: {
      required: required,
      newpass: complexPassword,
    },
    confirm_password: {
      required: required,
      sameAs: sameAs("new_password"),
    },
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

#app {
  width: 100%;
  height: auto;
  background-color: rgb(218, 218, 218);
}
.container {
  position: relative;
  width: 1400px;
  height: 100vh;
  /* border: 0.5px solid red; */
  border-top: none;
  border-bottom: none;
  /* margin-top: 110px; */
}

.manageContainer {
  position: absolute;
  top: 10%;
  width: 1138px;
  height: 700px;
  margin-top: auto;
  /* background-image: url("../assets/coffee.png"); */
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 5%;
  background-color: white;
}

.showPanel {
  width: auto;
  height: auto;
  margin-top: 70px;
  /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */
  border-radius: 25px;
  overflow: auto;
}

.login {
  width: 100%;
  color: black;
  font-size: 1.5rem;
  /* background-color: red; */
}

input {
  width: 339px;
  height: 54px;
  /* border-radius: 20px; */
  background: transparent;
  border: 3px solid #e9a057;
  box-sizing: border-box;
  font-size: 1rem;
  border-radius: 25px;
  padding: 15px;
  outline: none;
}
input:focus {
  border: 3px solid #d87872;
}
.btn-login {
  width: 339px;
  height: 54px;
  font-size: 1.5rem;
  border-radius: 20px;
background-color: #1EB262;
border: none;
}

a {
  color: #1bb034;
  font-size: 1.25rem;
}
</style>