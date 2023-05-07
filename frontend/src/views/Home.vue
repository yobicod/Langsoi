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
        <div class="firstSight mt-4">
            <div class="langsoiTop is-flex is-justify-content-center">
                <h1 class="langsoiTxt has-text-white">Lang Soi</h1>
            </div>
            <br>
            <div class="fresh is-flex is-justify-content-center">
                <h1 class="freshTxt has-text-white" style="text-align: center;">A FRESH PIECE <br>OF SUMMER</h1>
            </div>
            <div class="seeMenu is-flex is-flex-direction-column is-justify-content-space-around is-align-items-center">
                <router-link to="../menu">
                    <button class="button seeButtonM"><a href="" class="seeM">SEE THE MENU</a></button>
                </router-link>
                <router-link to="../reservation">
                    <button class="button seeButtonR"><a href="" class="seeR">RESERVE</a></button>
                </router-link>
                
            </div>
            <br>
            <div class="circlePromo is-flex is-flex-direction-column is-align-items-center is-justify-content-center">
                <p class="has-text-white"
                    style="font-weight: 800; font-size: 40px; text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);" >NEW</p><br>
                <p class="has-text-white"
                    style="font-weight: 400;font-size: 20px; margin-top: -25px; text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);">
                    &nbsp; &nbsp;menu <br> are arrival <br> &nbsp; &nbsp; now</p>
            </div>
        </div>
        <div class="popular is-flex is-justify-content-center">
            <div class="border mt-6">
                <div class="popularItems is-flex is-justify-content-space-around">
                    <div class="pop">
                        <p class="has-text-white" style="font-weight: 800;
                        font-size: 36px;
                        line-height: 40px;">popular items</p>
                        <p class="has-text-white" style="font-weight: 400;
                        font-size: 36px;
                        line-height: 40px;">..................</p>
                        <br>
                        <p class="has-text-white" style="font-weight: 600;
                        font-size: 30px;
                        line-height: 33px;">deconnstructed salmon 129</p>
                        <br>
                        <p class="has-text-white" style="font-weight: 400;
                        font-size: 22px;
                        line-height: 24px;">
                            popular items
                            deconstructed salmon 129
                            smoked salmon trout, avo, cherry tomatoes, crispy capers, pickled red onion, spring onion,
                            sour cream, lemon, extra virgin olive oil, dil</p>
                        <br><br>
                        <button class="button" style="background: #000000;
                            border: 1px solid #FFFFFF;
                            box-sizing: border-box;"><a href="" class="has-text-white">see the menu</a></button>
                    </div>
                    <div class="pop">
                        <img src="../assets/image 19.png" alt="">
                    </div>
                </div>
                <div class="popularItems is-flex is-justify-content-space-around">
                    <div class="pop2">
                        <img src="../assets/image 20.png" alt="">
                    </div>
                    <div class="pop">
                        <p class="has-text-white" style="font-weight: 800;
                        font-size: 36px;
                        line-height: 40px;">when the place started</p>
                        <p class="has-text-white" style="font-weight: 400;
                        font-size: 36px;
                        line-height: 40px;">..................</p>
                        <br>
                        <p class="has-text-white" style="font-weight: 600;
                        font-size: 30px;
                        line-height: 33px;">Bangkok, Ladkrabang</p>
                        <br>
                        <p class="has-text-white" style="font-weight: 400;
                        font-size: 22px;
                        line-height: 24px;">
                            This is just your typical Boy meets Girl, Boy falls in love with girl, Boy joins forces as
                            master entrepreneur and master restaurateur to create Asian most loved eatery Story. Their
                            vision was to build a restaurant that would serve the most mouthwatering Thai inspired meals
                            made with love and the finest, freshest ingredients.</p>
                    </div>

                </div>
                <br>
                <p class="has-text-white ml-6" style="font-weight: 800;
                font-size: 36px;
                line-height: 40px;">let’s get social <br>
                .................</p>
            </div>
        </div>
        <div class="socials is-flex is-justify-content-center">
            <div class="socialTop is-flex is-justify-content-space-between">
                <img src="../assets/image 24.png" alt="">
                <img src="../assets/image 25.png" alt="">
                <img src="../assets/image 26.png" alt="">
                <img src="../assets/image 27.png" alt="">
            </div>
        </div>
        <div class="sec"></div>
        <div class="customersay is-flex is-justify-content-center">
            <div class="customer is-flex is-justify-content-center is-align-items-center">
                <p style="text-align: center; font-weight: 400;
                font-size: 22px;
                line-height: 24px;" class="has-text-white">
                    “The best meal and service I had in a very long time! <br> Staff is so nice and made us feel very welcome. Would highly recommender”
                </p>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "@/plugins/axios";
// @ is an alias to /src
export default {
  name: "Home",
  props: ["user"],
  data() {
    return {
      search: "",
      blogs: [],
    };
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
        font-family: 'Podkova';
    }

    .firstSight {
        width: 100%;
        height: 680px;
        background-image: url("../assets/image 15.png");
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-position: center;
        position: relative;
        /* border: 2px solid red */

    }

    .langsoiTop {
        width: 100%;
        height: 160px;
        /* background-color: red; */
    }

    .langsoiTxt {
        font-size: 110px;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        font-weight: 800;
    }

    .fresh {
        width: 100%;
        height: 180px;
    }

    .freshTxt {
        font-size: 50px;
        font-weight: 600;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }

    .seeMenu {
        width: 100%;
        height: 175px;
        /* background-color: red; */

    }

    .seeButtonM {
        width: 270px;
        height: 60px;
        background: rgba(237, 191, 126, 0.53);
        border-radius: 10px;
        border: none;
    }

    .seeButtonR {
        width: 270px;
        height: 60px;
        background: #fff;
        border-radius: 10px;
        border: none;
    }

    .seeM {
        color: white;
        font-size: 24px;
        font-weight: 600;
        font-style: normal;

    }

    .seeR {
        color: #E8BF85;
        font-size: 24px;
        font-weight: 600;
        font-style: normal;
    }

    .circlePromo {
        position: absolute;
        right: 100px;
        bottom: 100px;
        background: #70BF8B;
        border-radius: 50%;
        width: 200px;
        height: 200px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }

    .popular {
        position: relative;
        width: 100%;
        height: 1000px;
        background: #141414;
    }

    .border {
        width: 1400px;
        height: 1000px;
        /* border: 15px solid red; */
        box-sizing: border-box;
    }

    .popularItems {
        width: 100%;
        height: 400px;
        /* background-color: red; */
        z-index: 100;
    }

    .pop {
        width: 600px;
        height: 100%;
        /* background-color: red; */
    }

    .pop img {
        width: 583px;
        height: 331px;
    }

    .pop2 img {
        width: 364px;
        height: 340px;
    }

    .socials,.customersay {
        position: relative;
        width: 100%;
        height: 300px;
        background: #141414;
    }

    .socialTop {
        width: 1200px;
        height: 200px;
        /* background: red; */
    }
    .sec{
        width: 100%;
        height: 30px;
        background: #141414;
    }
    .customer {
        width: 1200px;
        height: 200px;
        background-image: url("../assets/image 29.png");
    }
</style>
