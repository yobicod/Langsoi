<template>
  <section id="app">
        <br><br>
        <template v-if="type === 1">
            <div class="menuTop">
                <p style="font-weight: 800;
                font-size: 70px;
                line-height: 133px;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);" class="dotUp has-text-white">..........</p>
                <p style="font-weight: 800;
                    font-size: 70px;
                    line-height: 133px;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);" class="menuTxt has-text-white">Menu</p>
                <p style="font-weight: 800;
                font-size: 70px;
                line-height: 133px;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);" class="dotDown has-text-white">..........</p>
            </div>
            <div class="selected is-flex is-justify-content-center is-align-items-center">
                <button class="btnS" @click="type = 1; isOrange('f')" ><p v-bind:class="{ isOrangee: isF }">Food</p></button>
                <button class="ml-5 has-text-white btnS" @click="type = 2; isOrange('b')" ><p v-bind:class="{ isOrangee: isB }">Beverage</p></button>
            </div>
            <div class="ourMenu is-flex is-justify-content-center">
                <div class="menuBox">
                    <div class="ourmenuTxt is-flex is-justify-content-center mt-5">
                        <p style="font-weight: 800;
                        font-size: 64px;
                        line-height: 71px;" class="has-text-white"> O</p>
                        <p style="font-weight: 800;
                        font-size: 64px;
                        line-height: 71px; color: #DD7B2B;">ur menu</p>
                        <div class="menuCardCon">

                        </div>
                    </div>
                    <br><br>
                    <div class="menuboxCon is-flex is-flex-wrap-wrap ">
                        <div class="cardM ml-6 mt-2 is-flex is-flex-direction-column is-align-items-center" v-for="item in menus.food" :key="item.menu_id">
                            <div class="top"><img :src=url+item.path></div>
                            <br>
                            <p style="text-align: center; color: #DD7B2B; font-weight: 800;
                            font-size: 16px;">{{item.menu_name}}</p>
                            <p class="has-text-white">{{item.detail}}</p>
                            <p class="has-text-white" style="text-align: center;">{{item.price}} Bath</p>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-if="type === 2">
            <div class="menuTop">
                <p style="font-weight: 800;
                font-size: 70px;
                line-height: 133px;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);" class="dotUp has-text-white">..........</p>
                <p style="font-weight: 800;
                    font-size: 70px;
                    line-height: 133px;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);" class="menuTxt has-text-white">Menu</p>
                <p style="font-weight: 800;
                font-size: 70px;
                line-height: 133px;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);" class="dotDown has-text-white">..........</p>
            </div>
            <div class="selected is-flex is-justify-content-center is-align-items-center">
                <button class="btnS has-text-white" @click="type = 1; isOrange('f')" ><p v-bind:class="{ isOrangee: isF }">Food</p></button>
                <button class="ml-5 has-text-white btnS" @click="type = 2; isOrange('b')" ><p v-bind:class="{ isOrangee: isB }">Beverage</p></button>
            </div>
            <div class="ourMenu is-flex is-justify-content-center">
                <div class="menuBox">
                    <div class="ourmenuTxt is-flex is-justify-content-center mt-5">
                        <p style="font-weight: 800;
                        font-size: 64px;
                        line-height: 71px;" class="has-text-white"> O</p>
                        <p style="font-weight: 800;
                        font-size: 64px;
                        line-height: 71px; color: #DD7B2B;">ur menu</p>
                        <div class="menuCardCon">

                        </div>
                    </div>
                    <br><br>
                    <div class="menuboxCon is-flex is-flex-wrap-wrap">
                        <div class="cardM ml-6  is-flex is-flex-direction-column is-align-items-center" v-for="item in menus.drink" :key="item.menu_id" >
                            <div class="top"><img :src=url+item.path></div>
                            <br>
                            <p style="text-align: center; color: #DD7B2B; font-weight: 800;
                            font-size: 16px;">{{item.menu_name}}</p>
                            <p class="has-text-white">{{item.detail}}</p>
                            <p class="has-text-white" style="text-align: center;">{{item.price}} Bath</p>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </section>
</template>
<script>
import axios from "@/plugins/axios";
export default {
  data() {
    return {
      type: 1,
      isF: true,
      isB: false,
      menus: [],
      url: 'http://localhost:3000/',
    };
  },
  mounted() {
    this.getMenusDetail()
  },
  methods: {
    isOrange(x) {
      if (x === "f") {
        this.isF = true;
        this.isB = false;
      } else if (x === "b") {
        this.isF = false;
        this.isB = true;
      }
    },
    getMenusDetail() {
      axios
        .get("http://localhost:3000/menu")
        .then((response) => {
          this.menus = response.data;
          console.log(this.menus)
        })
        .catch((error) => {
        //   this.error = error.response.data.message;
            console.log(error)
        });
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

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Podkova";
}

.menuTop {
  position: relative;
  width: 100%;
  height: 329px;
  background-image: url("../assets/menubg.png");
  transform: scale(1);
}

.menuTxt {
  position: absolute;
  right: 270px;
  top: 105px;
}

.dotUp {
  position: absolute;
  right: 270px;
  top: 35px;
}

.dotDown {
  position: absolute;
  right: 270px;
  top: 145px;
}
.selected {
  position: relative;
  width: 100%;
  height: 65px;
  background: red;
}
.selected {
  background: #141414;
  /* border: 0.5px solid white; */
}
.btnS {
  background-color: #141414;
  border: none;
  font-size: 24px;
}

.ourMenu {
  position: relative;
  width: 100%;
  height: 1000px;
  background: #141414;
}

.menuBox {
  width: 1200px;
  /* height: 1000px; */
  /* background-color: red; */
  /* border: 0.5px solid white; */
  position: relative;
  overflow-y: scroll;
  overflow-x: hidden;
}
.menuBox::-webkit-scrollbar {
  width: 5px; /* width of the entire scrollbar */
}
.menuBox::-webkit-scrollbar-track {
  background: #141414; /* color of the tracking area */
}
.menuBox::-webkit-scrollbar-thumb {
  background-color: #dd7b2b; /* color of the scroll thumb */
  border-radius: 20px; /* roundness of the scroll thumb */
  border: 3px solid #141414;
}
.ourmenuTxt {
  width: 1200px;
  /* background: red; */
}
.menuboxCon {
  position: absolute;
  width: 100%;
  height: 900px;
  /* background-color: red; */
  left: 6%;
}
.cardM {
  position: relative;
  width: 200px;
  height: 250px;
  /* background: #fff; */
  border-radius: 15px;
}
.cardM img {
  width: 150px;
  height: 150px;
}
.cardM:hover {
  transform: scale(1.025);
}

.isOrangee {
  color: #dd7b2b;
  font-weight: bolder;
  transform: scale(1.2);
}
.top {
  background-color: #fff;
  border-radius: 15px;
}
</style>