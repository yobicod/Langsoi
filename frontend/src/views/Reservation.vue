<template>
  <div class="container">
    <br><br><br><br>
    <div class="columns is-centered mt-6" style="margin:auto;">
        <h1 class=" is-size-2 has-text-weight-bold has-text-black">BOOK A TABLE</h1>
    </div>
    <div class="columns is-12" style="margin-top:7%">
        <div class="column is-3" style="margin:auto; border-bottom:6px solid black; border-top:6px solid black;">
          <h1 class="is-size-3 has-text-weight-bold has-text-black">MAKE A BOOKING</h1>
        </div>
        <div class="column is-3" style="margin:auto; border-bottom:6px solid black; border-top:6px solid black;">
          <h1 class="is-size-3 has-text-weight-bold has-text-black">OPENING TIMES</h1>
        </div>
        <div class="column is-3" style="margin:auto; border-bottom:6px solid black; border-top:6px solid black;">
          <h1 class="is-size-3 has-text-weight-bold has-text-black">CONTACT</h1>
        </div>
    </div>


    <div class="columns is-12" style="margin-top:4%">
        <div class="column is-3" style="margin-left:auto; margin-right:auto;">
          <div class="" style="background-color:#C4C4C4; border-radius: 10px;" >
            <br>
              <h1 class=" has-text-centered is-size-5 has-text-weight-bold has-text-black" style="margin-bottom:3%;">Make a booking</h1>
              <input class="input" type="date" style="width: 80%; margin-left:10%; background-color:#C4C4C4; border-color: black" @change="what_day_is(); check_date()" v-model="date_res">
              <div class="control has-icons-left" style="margin-left:10%;">
                <div class="select" style="width: 88.85%;">
                  <select style="width: 100%; background-color:#C4C4C4; border-color: black" v-model="time_res">
                    <option value="8:00:00" v-show="mon_turs || fri">8.00 AM</option>
                    <option value="9:00:00" v-show="sun || satur || mon_turs || fri">9.00 AM</option>
                    <option value="10:00:00" v-show="sun || satur || mon_turs || fri">10.00 AM</option>
                    <option value="11:00:00" v-show="sun || satur || mon_turs || fri">11.00 AM</option>
                    <option value="12:00:00" v-show="sun || satur || mon_turs || fri">12.00 AM</option>
                    <option value="13:00:00" v-show="sun || satur || mon_turs || fri">1.00 PM</option>
                    <option value="14:00:00" v-show="sun || satur || mon_turs || fri">2.00 PM</option>
                    <option value="15:00:00" v-show="sun || satur || mon_turs || fri">3.00 PM</option>
                    <option value="16:00:00" v-show="sun || satur || mon_turs || fri">4.00 PM</option>
                    <option value="17:00:00" v-show="satur || mon_turs || fri">5.00 PM</option>
                    <option value="18:00:00" v-show="satur || mon_turs || fri">6.00 PM</option>
                    <option value="19:00:00" v-show="satur || mon_turs || fri">7.00 PM</option>
                    <option value="20:00:00" v-show="satur || mon_turs || fri">8.00 PM</option>
                    <option value="21:00:00" v-show="satur || mon_turs || fri">9.00 PM</option>
                    <option value="22:00:00" v-show="satur || mon_turs || fri">10.00 PM</option>
                    <option value="23:00:00" v-show="satur || fri">11.00 PM</option>
                  </select>
                </div>
                <div class="icon is-small is-left">
                  <i class="fa fa-clock-o" style="color:black"></i>
                </div>
              </div>

              <div class="control has-icons-left" style="margin-left:10%;">
                <div class="select" style="width: 88.85%;">
                  <select style="width: 100%; background-color:#C4C4C4; border-color: black;" v-model="people_res">
                    <option value=1>1 People</option>
                    <option value=2>2 People</option>
                    <option value=3>3 People</option>
                    <option value=4>4 People</option>
                    <option value=5>5 People</option>
                    <option value=6>6 People</option>
                    <option value=7>7 People</option>
                    <option value=8>8 People</option>
                  </select>
                </div>
                <div class="icon is-small is-left">
                  <i class="fa fa-user" style="color:black"></i>
                </div>
              </div>
              <button class=" button is-size-5 has-text-white" style="margin-left:10%;  margin-top:7%; width:80%; margin-bottom:7%; background: #F33C43;" v-on:click="show_model_confirm()">Reserve</button>
          </div>
          <br>
          <br>
          <h1 class="is-size-5 has-text-weight-light">You must to reserve before 1 day</h1>
        </div>


        <div class="column is-3" style="margin-left:auto; margin-right:auto; position: relative; top:0%;">
          <h1 class="is-size-5 has-text-weight-bold">Monday - Thursday : 08.00-23.00</h1>
          <br>
          <h1 class="is-size-5 has-text-weight-bold">Friday : 08.00-24.00</h1>
          <br>
          <h1 class="is-size-5 has-text-weight-bold">Saturday : 09.00-24.00</h1>
          <br>
          <h1 class="is-size-5 has-text-weight-bold">Sunday : 09.00-17.00</h1>
        </div>


        <div class="column is-3" style="margin-left:auto; margin-right:auto; border-bottom:6px">
          <h1 class="is-size-5 has-text-weight-bold" style="color:green;">Email</h1>
          <br>
          <h1 class="is-size-5 has-text-weight-bold">02 057 6011</h1>
          <br>
          <h1 class="is-size-5 has-text-weight-bold">Bangkok, Ladkrabang</h1>
          <br>
          <div class=" columns is-12" style="margin-left:auto; margin-top:auto; ">
            <button class="button is-link" style="margin-right:5%;" v-on:click="test_vue()">
              <span class="icon"><i class="fab fa-facebook"></i></span>
            </button>
            <button class="button is-danger" style="margin-right:5%;" v-on:click="test_vue()">
              <span class="icon"><i class="fab fa-instagram"></i></span>
            </button>
            <button class="button is-info" style="margin-right:5%;" v-on:click="test_vue()">
              <span class="icon"><i class="fab fa-twitter"></i></span>
            </button>

          </div>
        </div>
    </div>

    <div v-bind:class="{'modal': true, 'is-active':show_model}">
      <div class="modal-background"></div>
      <div class="modal-card" style="border-radius: 25px;">
      <section class="modal-card-body">
        <!-- Content ... -->
        <div style="margin-left:5%;">
          <h1 class="is-size-4 has-text-weight-bold">Reservation confirm
            <span class="icon has-text-success"  style="margin-top:auto;">
              <i class="fas fa-check-square"></i>
            </span>
          </h1>
          <h1 class="is-size-6 has-text-weight-light">To {{ user.first_name + ' ' + user.last_name }} </h1>
          <br>
          <p class="is-size-6 has-text-weight-light">Your reservation is at <b>{{date_res}} {{time_res}}</b> with <b>{{people_res}} people</b></p>
          <br>
          <br>
          <p class="is-size-7 has-text-weight-light">Plase make sure that details are correctly</p>
        </div>
        <div style="margin-left:5%; margin-top:5%; margin-bottom:1%;" class=" columns">
          <button class="button is-success is-focused" style="margin-right:5%; width:25%;" v-on:click="summit()">Confirm</button>
          <button class="button is-danger is-focused" style="width:25%;" v-on:click="close_modal()">Reject</button>
        </div>
      </section>
    </div>
    </div>

  </div>

</template>

<script>
import axios from '@/plugins/axios'
export default {
  data () {
    return {
      username: '',
      password: '',
      error: '',
      button_count:0,
      show_model:false,
      date_res:'2022-05-12',
      time_res:'8:00:00',
      people_res:'1',
      mon_turs:true,
      satur:true,
      sun:true,
      fri:true,
      day_is:'',
      user: null,
    }
  },
  mounted() {
    this.getUser()
  },
  methods: {
    test_vue(){
      this.button_count += 1
      console.log('SZ')
    },
    summit(){
      //
      let data_sent = {date:this.date_res, time:this.time_res, people:this.people_res}
      axios
          .post("http://localhost:3000/reservation/res_in", data_sent)
          .then((res) => {
            if(res.data.isfull) {
              alert(res.data.text)
              this.show_model = false
            }
            else {
              alert("Sent complete");
              this.show_model = false
            }
          })
          .catch((err) => {
            alert(err.response.data.details.message)
          });
    },
    close_modal(){
      this.show_model = false
    },
    show_model_confirm(){
       if(this.user.user_type == 'staff'){
        alert("staff can't reservation")
      }
      else{
        this.show_model = true
      }
    },
    what_day_is(){
      const d = new Date(this.date_res)
      this.day_is = d.getDay()
      if(this.day_is == 1 || this.day_is == 2 || this.day_is == 3 || this.day_is == 4){
        this.satur = false
        this.sun = false
        this.mon_turs = true
        this.fri = false
      }
      else if(this.day_is == 5){
        this.satur = false
        this.sun = false
        this.mon_turs = false
        this.fri = true
      }
      else if(this.day_is == 6){
        this.satur = true
        this.sun = false
        this.mon_turs = false
        this.fri = false
      }
      //day_is = 0
      else{
        this.mon_turs = false
        this.satur = false
        this.sun = true
        this.fri = false
      }
    },
    check_date(){
        var today = new Date().toISOString().slice(0, 10);
        
        // console.log(today)
        // console.log(this.date_res)
        if(this.date_res < today){
          alert('Please reserve in present')
          this.date_res = ''
        }
        else if(this.date_res == today) {
          alert('Please reserve before 1 day')
          this.date_res = ''
        }
    },
    getUser() {
      const token = localStorage.getItem("token");
      axios.get("/user/me").then((res) => {
        this.user = res.data;
      });
    }
  }

}
</script>
<style>
  body{
        margin: 0;
        padding: 0;
        font-family: 'Podkova';
        background-image: url("https://cdn.discordapp.com/attachments/963724471435395112/969960582277120040/image_12.png");
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-position: center;
        height: 100vh;
    }
  * {
        font-family: 'Podkova';
        font-weight: 400;
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
</style>