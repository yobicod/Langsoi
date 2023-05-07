<template>
  <div class="hero is-fullheight-with-navbar is-flex is-justify-content-center">
    <div class="hero" style="transform: scale(0.75); drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));">
      <div
        class="
          container
          is-flex is-justify-content-center is-align-items-center
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
              <h1 class="is-size-1 has-text-black" style="font-weight: 700;
font-size: 48px;">Login</h1>
            </div>
            <br /><br /><br />
            <div class="is-flex is-flex-direction-column login">
              <div>
                <label for="username" style="font-weight: 700;
font-size: 30px;">Username:</label><br />
                
                <input
                  class="log-input"
                  type="text"
                  id="username"
                  name="username"
                  v-model="username"
                />
                <span class="icon is-small is-left" style="position: absolute; right: 40%; top: 40.5%;">
                  <i class="fas fa-user"></i>
                 </span>
                
              </div>
              <br />
              <div>
                <label for="password" style="font-weight: 700;
font-size: 30px;">Password:</label><br />
                <input
                  class="log-input"
                  type="password"
                  id="password"
                  name="password"
                  v-model="password"
                />
              </div>
              <br />
              <div>
                <router-link to="/forgotpassword">
                  <strong>Forget password?</strong>
                </router-link>
                <!-- <a for="forget" >Foget password?</a> -->
                <br>
                <button class="has-text-white btn-login" style="background-color: #1EB262; border: none;" @click="submit();">
                  Login
                </button>
                <p>If you don't have account <router-link to="/user/signup"><strong>Register here</strong></router-link></p>
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
export default {
  data() {
    return {
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    submit() {
      const data = {
        username: this.username,
        password: this.password,
      };

      axios
        .post("http://localhost:3000/user/login/", data)
        .then((res) => {
          const token = res.data.token;
          const role = res.data.role;
          // console.log(res.data)
          this.user = res.data.role;
          console.log(this.user)
          localStorage.setItem("token", token);
          localStorage.setItem("role", role);
          this.$emit("auth-change");
          this.$router.push({ path: "/" });
        })
        .catch((error) => {
          alert("Incorrect username or password")
          console.log(error)
          console.log(error.response)
          this.error = error.response.data;
          console.log(error.response.data);
        });
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
  width: 1000%;
  height: 100vh;
  /* border: 0.5px solid white; */
  border-top: none;
  border-bottom: none;
  /* margin-top: 110px; */
  /* background: ; */
}

.manageContainer {
  width: 1138px;
  height: 850px;
  margin-top: auto;
  /* background-image: url("../assets/coffee.png"); */
  background-repeat: no-repeat;
  background-position: center;
  background-color: white;
  border-radius: 5%;
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
  /* border: none; */
}

a {
  color: #1bb034;
  font-size: 1.25rem;
}
</style>