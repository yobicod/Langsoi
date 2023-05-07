<template >
  <div style="background-color: rgb(218, 218, 218)">
    
    <div
      class="container mt-6"
      style="background-color: white; height: 100vh; width: 100%; border-radius: 5%; transform: scale(0.8); drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));"
      >
      <div class="column is-12" style="">
        <h1
          class="
            
            has-text-weight-bold has-text-black has-text-centered
          "
          style="margin-bottom: 8%; font-weight: 900;
font-size: 45px;"
        >
          Register
        </h1>
      </div>

      <div class="columns" style="margin-left: auto; margin-bottom: 5%">
        <div
          class="column is-half"
          style="margin-left: auto; margin-right: auto; width: 45%"
        >
          <div class="columns">
            <h1
              class=" has-text-weight-bold"
              style="width: 35%; margin-right: 5%; font-weight: 700;
font-size: 23px;" 
            >
              First Name
            </h1>
            <input
              v-model="$v.first_name.$model"
              :class="{ 'is-danger': $v.first_name.$error }"
              class="input is-normal form-input"
              type="text form-input"
            />
          </div>
          <template v-if="$v.first_name.$error">
            <p class="help is-danger is-size-5" v-if="!$v.first_name.required">
              <!--check req-->
              This field is required
            </p>
            <p class="help is-danger is-size-5" v-if="!$v.first_name.minLength">
              first_name must contain at least 5 characters
            </p>
            <p class="help is-danger is-size-5" v-if="!$v.first_name.maxLength">
              first_name is over 150 characters
            </p>
            <!--check email format-->
          </template>
        </div>

        <div
          class="column is-half"
          style="margin-left: auto; margin-right: auto; width: 45%"
        >
          <div class="columns">
            <h1
              class="has-text-weight-bold"
              style="width: 35%; margin-right: 5%; font-weight: 700;
font-size: 23px;"
            >
              Last Name
            </h1>
            <input
              v-model="$v.last_name.$model"
              :class="{ 'is-danger': $v.last_name.$error }"
              class="input is-normal form-input"
              type="text form-input"
              placeholder="Normal input"
            />
          </div>
          <template v-if="$v.last_name.$error">
            <p class="help is-danger is-size-5" v-if="!$v.last_name.required">
              <!--check req-->
              This field is required
            </p>
            <p class="help is-danger is-size-5" v-if="!$v.last_name.minLength">
              last_name must contain at least 5 characters
            </p>
            <p class="help is-danger is-size-5" v-if="!$v.last_name.maxLength">
              last_name is over 150 characters
            </p>
            <!--check last_name format-->
          </template>
        </div>
      </div>

      <div class="columns" style="margin-left: auto; margin-bottom: 5%">
        <div
          class="column is-half"
          style="margin-left: auto; margin-right: auto; width: 45%"
        >
          <div class="columns">
            <h1
              class="has-text-weight-bold"
              style="width: 35%; margin-right: 5%; width: 35%; margin-right: 5%; font-weight: 700;
font-size: 23px;"
            >
              Email
            </h1>
            <input
              v-model="$v.email.$model"
              :class="{ 'is-danger': $v.email.$error }"
              class="input is-normal form-input"
              type="text"
              placeholder=""
            />
          </div>
          <template v-if="$v.email.$error">
            <p class="help is-danger is-size-5" v-if="!$v.email.required">
              <!--check req-->
              This field is required
            </p>
            <p class="help is-danger is-size-5" v-if="!$v.email.email">Invalid Email</p>
            <!--check email format-->
          </template>
        </div>

        <div
          class="column is-half"
          style="margin-left: auto; margin-right: auto; width: 45%"
        >
          <div class="columns">
            <h1
              class="has-text-weight-bold"
              style="width: 35%; margin-right: 5%; width: 35%; margin-right: 5%; font-weight: 700;
font-size: 23px;"
            >
              Date of birth
            </h1>
            <input
              v-model="$v.dob.$model"
              :class="{ 'is-danger': $v.dob.$error }"
              class="input form-input"
              type="date"
              placeholder=""
            />
          </div>
          <template v-if="$v.dob.$error">
            <p class="help is-danger is-size-5" v-if="!$v.dob.required">
              This field is required
            </p>
            <p class="help is-danger is-size-5" v-if="!$v.dob.minValue">date over</p>
          </template>
        </div>
      </div>

      <div class="columns" style="margin-left: auto; margin-bottom: 5%">
        <div
          class="column is-half"
          style="margin-left: auto; margin-right: auto; width: 45%"
        >
          <div class="columns">
            <h1
              class=" has-text-weight-bold"
              style="width: 35%; margin-right: 5%; width: 35%; margin-right: 5%; font-weight: 700;
font-size: 23px;"
            >
              Gender
            </h1>
            <select
              class="input is-normal form-input"
              v-model="$v.gender.$model"
              :class="{ 'is-danger': $v.gender.$error }"
            >
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
        </div>

        <div
          class="column is-half"
          style="margin-left: auto; margin-right: auto; width: 45%"
        >
          <div class="columns">
            <h1
              class="has-text-weight-bold"
              style="width: 35%; margin-right: 5%; width: 35%; margin-right: 5%; font-weight: 700;
font-size: 23px;"
            >
              Phone
            </h1>
            <input
              v-model="$v.phone.$model"
              :class="{ 'is-danger': $v.phone.$error }"
              class="input is-normal form-input"
              type="text"
              placeholder=""
            />
          </div>
          <template v-if="$v.phone.$error">
            <p class="help is-danger is-size-5" v-if="!$v.phone.required">
              This field is required
            </p>
            <p class="help is-danger is-size-5" v-if="!$v.phone.phone_check">
              Invalid Phone Number
            </p>
          </template>
        </div>
      </div>

      <div class="columns" style="margin-left: auto; margin-bottom: 2%">
        <div
          class="column is-half"
          style="margin-left: auto; margin-right: auto; width: 45%"
        >
          <div class="columns">
            <h1
              class=" has-text-weight-bold"
              style="width: 35%; margin-right: 5%; width: 35%; margin-right: 5%; font-weight: 700;
font-size: 23px;"
            >
              Username
            </h1>
            <input
              v-model="$v.username.$model"
              :class="{ 'is-danger': $v.username.$error }"
              class="input is-normal form-input"
              type="text"
              placeholder=""
            />
          </div>
          <template v-if="$v.username.$error">
            <p class="help is-danger is-size-5" v-if="!$v.username.required">
              <!--check req-->
              This field is required
            </p>
            <p class="help is-danger is-size-5" v-if="!$v.username.minLength">
              Username must contain at least 5 characters
            </p>
            <!--check username format-->
          </template>
        </div>

        <div
          class="column is-half"
          style="margin-left: auto; margin-right: auto; width: 45%"
        >
          <div class="columns">
            <h1
              class=" has-text-weight-bold"
              style="width: 35%; margin-right: 5%; width: 35%; margin-right: 5%; font-weight: 700;
font-size: 23px;"
            >
              Password
            </h1>
            <input
              v-model="$v.password.$model"
              :class="{ 'is-danger': $v.password.$error }"
              class="input is-normal form-input"
              type="password"
              form-inputpe="password"
              placeholder=""
            />
          </div>
          <template v-if="$v.password.$error">
            <p class="help is-danger is-size-5" v-if="!$v.password.required">
              This field is required
            </p>
            <p class="help is-danger is-size-5" v-if="!$v.password.minLength">
              Password be at least 8 letters
            </p>
            <p class="help is-danger is-size-5" v-if="!$v.password.complexPassword">
              Password is too easy
            </p>
          </template>
        </div>
      </div>
      <div class="columns mt-6" style="margin-left: auto; margin-bottom: 2%">
        <div
          class="column is-half"
          style="margin-left: auto; margin-right: auto; width: 45%"
        >
          <div class="column" style="margin-left: auto; margin-bottom: 2%">
            <label class="checkbox is-size-5 columns">
              <input
                v-model="$v.term_agree.$model"
                :class="{ 'is-danger': $v.term_agree.$error }"
                type="checkbox"
                style="margin-top: 0.5%; margin-right: 1%; margin-left: 2.5%; width:20px; height:20px;"
              />
              <h1 style="color: black">I agree to the terms and conditions</h1>
            </label>
            <template v-if="$v.term_agree.$error">
              <p class="help is-danger is-size-5" v-if="!$v.term_agree.term">
                You need to accept terms and conditions
              </p>
            </template>
          </div>
        </div>

        <div
          class="column is-half"
          style="margin-left: auto; margin-right: auto; width: 45%"
        >
          <div class="columns">
            <h1
              class=" has-text-weight-bold"
              style="width: 35%; margin-right: 5%; width: 35%; margin-right: 5%; font-weight: 700;
font-size: 23px;"
            >
              Confirm Password
            </h1>
            <input
              v-model="$v.confirm_password.$model"
              :class="{ 'is-danger': $v.confirm_password.$error }"
              class="input is-normal form-input"
              type="password"
              form-inputpe="password"
            />
          </div>
          <template v-if="$v.confirm_password.$error">
            <p class="help is-danger is-size-5" v-if="!$v.confirm_password.required">
              This field is required
            </p>
             <p class="help is-danger is-size-5" v-if="!$v.confirm_password.sameAs">
              Password doesn't match!
            </p>
          </template>
        </div>
      </div>

      <div class="column" style="margin-left: auto; margin-bottom: 5%">
        <button
          class="button is-success is-size-5"
          style="margin-left: 1.75%; width: 20%; border-radius: 25px; transform: scale(1.125)"
          @click="submit()"
        >
          Sign Up
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import {
  required,
  email,
  minLength,
  sameAs,
  maxLength,
  minValue,
  maxValue,
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
function date_check(value) {

  let box = parseInt(value.substring(0, 4));
  console.log(2022-box)
  if (2022-box < 18) {
    return false;
  } else {
    return true;
  }
}

export default {
  data() {
    return {
      username: "",
      password: "",
      confirm_password: "",
      email: "",
      phone: "",
      first_name: "",
      last_name: "",
      dob: "",
      gender: "",
      term_agree: true,
    };
  },
  validations: {
    email: {
      required: required,
      email: email,
    },
    phone: {
      required: required,
      phone: phone_check,
    },
    password: {
      required: required,
      minLength: minLength(8),
      complex: complexPassword,
    },
    confirm_password: {
      required: required,
      sameAs: sameAs("password"), //sameAs build-In validator
    },
    username: {
      required: required,
      minLength: minLength(5),
    },
    first_name: {
      required: required,
      maxLength: maxLength(150),
      minLength: minLength(5),
    },
    last_name: {
      required: required,
      maxLength: maxLength(150),
      minLength: minLength(5),
    },
    dob: {
      required: required,
      // minValue: minValue(value => value > new Date().toISOString())
      minValue: date_check,
    },
    gender: {
      required: required,
    },
    term_agree: {
      term: sameAs(() => true),
    },
  },
  methods: {
    submit() {
      // Validate all fields
      this.$v.$touch();
      console.log("hi");
      // เช็คว่าในฟอร์มไม่มี error
      if (!this.$v.$invalid) {
        let data = {
          username: this.username,
          password: this.password,
          confirm_password: this.confirm_password,
          email: this.email,
          phone: this.phone,
          first_name: this.first_name,
          last_name: this.last_name,
          dob: this.dob,
          gender: this.gender,
        };

        axios
          .post("http://localhost:3000/user/signup", data)
          .then((res) => {
            alert("Sign up Success");
            this.$router.push({ path: "/user/login" });
          })
          .catch((err) => {
            alert(err.response.data.details.message);
          });
      } else {
        console.log("bobo");
      }
    },
  },
};
</script>
<style>
.form-input {
  border-radius: 25px;
  border-color: white;
  background-color: #eeeeee;
  color: black;
}
</style>