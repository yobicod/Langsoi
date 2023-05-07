<template>
  <div id="app">
    <!-- nav bar -->
    <nav
      class="navbar is-fixed-top is-align-items-center"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a class="navbar-item ml-6" href="https://bulma.io">
          <img src="https://cdn.discordapp.com/attachments/963724471435395112/971059121405173770/lang_soi.png" alt="" style="transform: scale(2); z-index: 1000;" />
        </a>

        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu is-justify-content-center">
        <router-link to="/" class="navbar-item">
          <strong>Home</strong>
        </router-link>
        <router-link to="/menu" class="navbar-item">
          <strong>Menu</strong>
        </router-link>
        <router-link to="/reservation" class="navbar-item">
          <strong>Reservation</strong>
        </router-link>
        <router-link to="/promotion" class="navbar-item">
          <strong>Promotion</strong>
        </router-link>
        <router-link to="/contact" class="navbar-item">
          <strong>Contact</strong>
        </router-link>
        <router-link v-if="isAdmin()" to="/adminpanel" class="navbar-item">
          <strong>AdminPanel</strong>
        </router-link>
      </div>
      <div class="navbar-end">
        <div v-if="user" class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            <figure class="image is-24x24 my-auto">
              <img
                class="is-rounded"
                src="https://bulma.io/images/placeholders/128x128.png"
              />
            </figure>
            <span class="pl-3">{{ user.first_name }} {{ user.last_name }}</span>
          </a>
          <div class="navbar-dropdown">
            <router-link to="/user/profile" class="navbar-item">
          <strong>Profile</strong>
        </router-link>
            <a class="navbar-item" @click="logout()">Log out</a>
          </div>
        </div>

        <div v-if="!user" class="navbar-item">
          <router-link to="/user/login">
            <strong>Login</strong>
          </router-link>
        </div>
        <div v-if="!user" class="navbar-item">
          <router-link to="/user/signup">
            <strong>Signup</strong>
          </router-link>
        </div>
      </div>
    </nav>

    <!-- <router-view :key="$route.fullPath" @auth-change="onAuthChange" /> -->
    <router-view
      :key="$route.fullPath"
      @auth-change="onAuthChange"
      :user="user"
    />
  </div>
</template>

<script>
import axios from "@/plugins/axios";
export default {
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    this.onAuthChange();
  },
  methods: {
    onAuthChange() {
      const token = localStorage.getItem("token");
      if (token) {
        this.getUser();
      }
    },
    getUser() {
      const token = localStorage.getItem("token");
      axios.get("/user/me").then((res) => {
        this.user = res.data;
      });
    },
    logout() {
      localStorage.clear();
      this.$router.push("../");
      location.reload();
    },
    isAdmin() {
      // console.log(this.user)
      try {
        if (this.user.user_type == "staff") {
          return true;
        } else {
          return false;
        }
      } catch {
        return false;
      }
    },
  },
};
</script>
<style>
.navbar {
  height: 80px;
  /* display: flex; */
  /* background-color: black; */
  /* border: 2px solid black; */
  font-size: 20px;
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
</style>