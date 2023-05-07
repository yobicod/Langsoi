<template>
  <div class="con">
    <div class="conTop">
      <img src="../assets/pizza.jpg" alt="" />
      <h1 class="contacttxt has-text-white typewriter">Lang soi cafe</h1>
      <p class="has-text-white wish">
        We wish you have the best experience with us
      </p>
      <button class="has-text-white homebtn mt-3" onclick="window.location.href='/'">
        <a style="color: white">Home</a>
      </button>
    </div>
    <!-- <div class="conmid">
            <h1 class="has-text-white mt-6 contact" style="text-align: center;">Contact</h1>
        </div> -->
    <br />
    <div class="bottom is-flex is-justify-content-center">
      <div class="one">
        <p class="has-text-white onead">Address</p>
        <p
          class="has-text-white"
          style="font-weight: 500; font-size: 46px; line-height: 38px"
        >
          ...........
        </p>
        <br />
        <p class="lad">Ladkrabang, Bangkok 10520</p>
        <br />
        <p class="has-text-white">065-xxxxxxx</p>
      </div>
      <div class="one">
        <p class="has-text-white onead">Business Hours</p>
        <p
          class="has-text-white"
          style="font-weight: 500; font-size: 46px; line-height: 38px"
        >
          ...........
        </p>
        <br />
        <p class="lad">Monday - Thursday: 08.00 - 23.00</p>
        <p class="lad">Friday: 08.00 - 24.00</p>
        <p class="lad">Saturday: 09.00 - 24.00</p>
        <p class="lad">Sunday: 09.00 - 17.00</p>
      </div>
      <div class="one">
        <p class="has-text-white onead di">Direction</p>
        <div class="mapwrap">
          <div class="mapouter">
            <div class="gmap_canvas">
              <iframe
                class="gmap_iframe"
                width="100%"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
                src="https://maps.google.com/maps?width=480&amp;height=250&amp;hl=en&amp;q=kmitl&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              ></iframe
              ><a href="https://mcpepro.com/">Minecraft Download</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
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
.mapouter {
  position: relative;
  text-align: right;
  width: 100%;
  height: 250px;
}
.gmap_canvas {
  overflow: hidden;
  background: none !important;
  width: 100%;
  height: 250px;
}
.gmap_iframe {
  height: 250px !important;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Podkova";
  overflow: hidden;
}
.con {
  width: 100%;
  height: 100vh;
  background-color: #141414;
  position: relative;
}
.conTop {
  position: relative;
  width: 100%;
  height: 60vh;
}
.conTop img {
  width: 100%;
  height: 60vh;
}
/* .conmid {
        width: 1200px;
        height: 100vh;
        border: 0.5px solid white;
    }
    .contact {
        font-size: 72px;
    } */
.contacttxt {
  position: absolute;
  top: 30%;
  left: 5%;
  font-weight: 800;
  font-size: 48px;
  line-height: 53px;
}
.wish {
  position: absolute;
  top: 50%;
  left: 5%;
  font-style: normal;
  font-weight: 400;
  font-size: 26px;
  line-height: 29px;
}
.homebtn {
  position: absolute;
  width: 140px;
  height: 40px;
  top: 65%;
  left: 5%;
  /* border: 1px solid white; */
  background: transparent;
  border: 1px solid white;
}
.homebtn:hover, .homebtn:hover + a{
    transform: scale(1.1);
    border: 1px solid rgb(209, 155, 55)
}

.typewriter {
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: 0.15em solid orange; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  letter-spacing: 0.15em; /* Adjust as needed */
  animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
}

/* The typing effect */
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 25%;
  }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: orange;
  }
}
.bottom {
  position: relative;
  width: 100%;
  height: 40vh;
  /* border: 0.5px solid white; */
}
.mapwrap {
  position: absolute;
  right: 0;
  bottom: 0;
  transform: scale(0.8);
}
.ditxt {
  position: absolute;
  top: 35vh;
  right: 30%;
  font-weight: 600;
  font-size: 34px;
  line-height: 38px;
}
.one {
  position: relative;
  width: 25%;
  height: 35vh;
  /* border: 2px solid green; */
}
.onead {
  font-weight: 800;
  font-size: 36px;
  line-height: 53px;
}
.lad {
  color: rgb(197, 197, 197);
  font-weight: 400;
  font-size: 20px;
  line-height: 38px;
}
.di {
  position: absolute;
  left: 10%;
}
.mapwrap {
  /* border: 10px solid red; */
  position: absolute;
  left: 0;
}
</style>