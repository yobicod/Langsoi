<template>
    <section id="app">
        <!-- <nav class="navbar is-fixed-top is-align-items-center" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item ml-6" href="https://bulma.io">
                   <img src="lang soi.png" alt="" style="transform: scale(2)">
                </a>

                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div class="navbar-menu is-justify-content-center">
                <a class="navbar-item">Home <i class="fa-thin fa-alarm-exclamation"></i></a>
                <a class="navbar-item">Menu</a>
                <a class="navbar-item">Reserve</a>
                <a class="navbar-item">Promotion</a>
                <a class="navbar-item">Contact</a>
            </div>
            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <a class="button is-primary">
                            <strong>Sign up</strong>
                        </a>
                        <a class="button is-light">
                            Log in
                        </a>
                    </div>
                </div>
            </div>
        </nav> -->
        <br><br>
        <div class="promoBody">
            <div class="promoTop is-flex is-align-items-center is-justify-content-center is-flex-direction-column">
                <p class="dealMeals has-text-white">Our delicious<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;deals</p>
                <router-link to="../reservation">
                    <button class=" resBtn mt-6">Reserve now</button>
                </router-link>
            </div>
            <div class="showPromoCon is-flex is-justify-content-center" v-for="item in promos.promos" :key="item.promotion_id">
                <div class="struct is-flex">
                    <div class="sLeft is-flex is-align-items-center is-justify-content-center">
                        <img :src=url+item.path alt="">
                    </div>
                    <div class="sLeft">
                        <div class="txtwrap">
                            <p class="has-text-white mt-6" style="font-size: 42px;
                        line-height: 47px;">Our promotions</p>
                        <p class="has-text-white mt-5" style="font-size: 34px;
                        line-height: 38px;"> {{ item.promotion_name }}</p>
                        <p class="has-text-white mt-5" style="font-weight: 400;
                        font-size: 26px;
                        line-height: 29px;">{{ item.detail}}</p>
                        <p class="has-text-white mt-6" style="font-weight: 400;
                        font-size: 18px;
                        line-height: 20px;">Lang soi cafe</p>
                        </div>
                        
                    </div>
                </div>
                
            </div>
        </div>
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
      promos: [],
      url: 'http://localhost:3000/',
    };
  },
  mounted() {
    this.getPromotionDetails()
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
    getPromotionDetails() {
      axios
        .get("http://localhost:3000/promotion")
        .then((response) => {
          this.promos = response.data;
          console.log(this.promos)
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
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Podkova';
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
    .promoBody {
        width: 100%;
        height: 100vh;
        /* border: 2px solid red; */
    }
    .promoTop {
        position: relative;
        width: 100%;
        height: 48vh;
        /* border: 2px solid green; */
        background-image: url("../assets/promotionbg.png");
        background-repeat: no-repeat;
        /* background-attachment: fixed; */
 
    }
    .dealMeals {
        font-weight: 800;
        font-size: 48px;
        line-height: 53px;
    }
    .resBtn {
        width: 150px;
        height: 40px;
        border: 3px solid white;
        background: transparent;
        font-weight: 800;
font-size: 16px;
line-height: 27px;
color: white;
    }
    .resBtn:hover {
        border: 4px solid rgb(221, 123, 43);
        transform: scale(1.125);
        
    }
    .showPromoCon{
        width: 100%;
        height:51.75vh;
        background-color: #141414;
    }
    .struct {
        width: 75%;
        height: 51.75vh;
        /* border: 2px solid whitesmoke; */
    }
    .sLeft{
        width: 50%;
        height: 100%;
        /* border: 2px solid red; */
    }
    .sLeft img{
        width: 400px;
        height: 300px;
    }
</style>
