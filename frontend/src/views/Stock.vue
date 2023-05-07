<template>
  <section>
        <nav class="navbar is-fixed-top is-align-items-center " role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item" href="https://bulma.io">
                    <img src="https://bulma.io/images/bulma-logo.png"
                        alt="Bulma: Free, open source, and modern CSS framework based on Flexbox" width="112"
                        height="28">
                </a>

                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div class="navbar-menu is-justify-content-center ">
                <a class="navbar-item">Home</a>
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
        </nav>

        <div class="hero is-fullheight-with-navbar is-flex is-justify-content-center">
            <div class="hero">
                <div class="container">
                    <div class="textcontainer is-flex is-justify-content-center is-align-items-center">
                        <div
                            class="adminbox box has-background-light is-flex is-justify-content-center is-align-items-center">
                            <h1 class="admintext has-text-black is-size-3">Admin Panel</h1>
                        </div>
                    </div>
                    <div class="selectContainer is-flex is-justify-content-center is-align-items-center">
                        <div class="menu has-text-white is-flex is-flex-direction-row">
                            <div class="arrow-select is-flex is-justify-content-center is-flex-direction-column is-align-items-center">
                                <i class="fa fa-caret-down" aria-hidden="true" v-bind:class="{'arrow-hide': isFoodActive}"></i>
                                <button class="btn-menu"  @click="selected = 1, changeStock();" v-bind:class="{'btn-menu-change': isBeverageActive}">Food Ingredient</button>
                            </div>
                            <div class="arrow-select is-flex is-justify-content-center is-flex-direction-column is-align-items-center">
                                <i class="fa fa-caret-down" aria-hidden="true" v-bind:class="{'arrow-hide': isBeverageActive}"></i>
                                <button class="btn-menu" @click="selected = 2, changeStock();" v-bind:class="{'btn-menu-change': isFoodActive}">Beverage Ingredient</button>
                            </div>
                        </div>
                    </div>
                    <template v-if="selected === 1">
                        <div class="manageContainer is-flex is-justify-content-center">
                            <div class="showPanel is-flex is-justify-content-center">
                                <div class="details">
                                    <!-- <label>Food List</label> -->
                                    <table class="table">
                                        <thead>
                                            <th><b>Food List</b></th><br>
                                            <tr>
                                                <th>Id</th>
                                                <th>Ingredient Name </th>
                                                <th>Cost</th>
                                                <th>Amount</th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="item in adminData.food" :key="item.ingr_id">
                                                <td>{{item.ingr_id}}</td>
                                                <td>{{item.ingr_name}}</td>
                                                <td>{{item.ingr_stock}}</td>
                                                <td>{{item.ingr_stock}}</td>
                                                <td><button class="button is-warning">Edit</button></td>
                                                <td><button class="button is-danger">Delete</button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="add">
                                        <button class="button is-success">Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-if="selected === 2">
                        <div class="manageContainer is-flex is-justify-content-center">
                            <div class="showPanel is-flex is-justify-content-center">
                                <div class="details">
                                    <!-- <label>Beverage List</label> -->
                                    <table class="table">
                                        <thead>
                                            <th><b>Beverage List</b></th><br>
                                            <tr class="">
                                                <th>Id</th>
                                                <th>Ingredient Name </th>
                                                <th>Cost</th>
                                                <th>Amount</th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                             <tr v-for="item in adminData.beverage" :key="item.ingr_id">
                                                <td>{{item.ingr_id}}</td>
                                                <td>{{item.ingr_name}}</td>
                                                <td>{{item.ingr_stock}}</td>
                                                <td>{{item.ingr_stock}}</td>
                                                <td><button class="button is-warning">Edit</button></td>
                                                <td><button class="button is-danger">Delete</button></td>
                                            </tr>

                                        </tbody>
                                    </table>
                                    <div class="add">
                                        <button class="button is-success">Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>

    </section>
</template>

<script>
import axios from '@/plugins/axios'
export default {
  data () {
    return {
      selected: 1,
      isFoodActive: false,
      isBeverageActive:true,
      adminData: [],
    }
  },
  mounted() {
    this.getStockDetail();
  },
  methods: {
    changeStock(){
                if(this.selected == 1){
                    this.isFoodActive = false
                    this.isBeverageActive = true
                }
                else if(this.selected == 2){
                    this.isFoodActive = true
                    this.isBeverageActive = false
                }
            },
    getStockDetail() {
      axios
        .get("http://localhost:3000/stock")
        .then((response) => {
          this.adminData = response.data;
          console.log(this.adminData)
        })
        .catch((error) => {
        //   this.error = error.response.data.message;
            console.log(error)
        });
    },
  }

}
</script>
<style>
.navbar {
        height: 80px;
        background-color: white;
        font-size: 24px;
        font-weight: 800;
    }

    .navbar-item {
        margin: 1em;
        color: black;

    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Podkova';
    }

    #app {
        width: 100%;
        height: auto;
        background-color: #141414;
    }

    .container {
        width: 1400px;
        height: 100%;
        border: 0.5px solid white;
        border-top: none;
        border-bottom: none;
        /* padding-top: 7%; */
        /* padding-top: 7%; */
    }

    .textcontainer,
    .selectContainer {
        width: 100%;
        height: 100px;
        /* background-color: red; */
    }

    .adminbox {
        width: 538px;
        height: 68px;
        background-color: blue;
    }

    .admintext {
        font-weight: bold;
        font-size: 36px;
    }

    .showPanel {
        width: 1271;
        height: 644px;
    }

    .menu,
    .reserve,
    .promo {
        margin: 30px;
        font-size: 26px;
    }
    .btn-menu{
        /* border: 2px solid red; */
        width: 15em;
        padding: 5px;
        margin: 5px;
        background:none;
        border: none;
        color: white;
        font-size: 26px;
        font-weight: 100;
    }
    .btn-menu-change{
        color: #E58138;
        font-size: 26px;
        font-weight: 400;
    }
    .arrow {
        color: white;
    }
    /* .menu{
        display: inline-table;
    } */
    .manageContainer {
        width: 100%;
        height: 800px;
    }

    .showPanel {
        width: 1271px;
        height: 750px;
        background-color: #C4C4C4;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 25px;
        overflow: auto;

    }

    .details {
        width: 1100px;
        /* background-color: #C4C4C4; */
        /* background-color: red; */
    }

    .table {
        width: 100%;
        background-color: #C4C4C4;
    }
    .arrow-select{
        width: 100%;
        /* background-color: red;
        border: 2px solid white; */
    }
    .arrow-hide{
        opacity: 0;
    }
</style>