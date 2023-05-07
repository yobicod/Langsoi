<template>
  <div class="container">
    <section id="app">
      <br /><br /><br /><br />
      <template v-if="selected === 1">
        <div
          class="
            hero
            is-fullheight-with-navbar is-flex is-justify-content-center
          "
        >
          <div class="container">
            <div
              class="
                textcontainer
                is-flex is-justify-content-center is-align-items-center
              "
            >
              <div
                class="
                  adminbox
                  box
                  has-background-light
                  is-flex is-justify-content-center is-align-items-center
                "
              >
                <h1 class="admintext has-text-black is-size-3">Admin Panel</h1>
              </div>
            </div>
            <div class="arrowContainer is-flex is-justify-content-center">
              <div
                style="width: 400px"
                class="is-flex is-justify-content-space-around"
              >
                <img
                  src="https://cdn.discordapp.com/attachments/963724471435395112/969845224404840458/right.png"
                  alt="arrow"
                  class="arrowSelected"
                  v-bind:class="{ arrowSelectedHide: isArrowMenu }"
                />
                <img
                  src="https://cdn.discordapp.com/attachments/963724471435395112/969845224404840458/right.png"
                  alt="arrow"
                  class="arrowSelected"
                  v-bind:class="{ arrowSelectedHide: isArrowReserve }"
                />
                <img
                  src="https://cdn.discordapp.com/attachments/963724471435395112/969845224404840458/right.png"
                  alt="arrow"
                  class="arrowSelected"
                  v-bind:class="{ arrowSelectedHide: isArrowPromo }"
                />
              </div>
            </div>
            <div
              class="
                selectContainer
                is-flex is-justify-content-center is-align-items-center
              "
            >
              <div class="menu has-text-white">
                <button
                  class="menu has-text-white"
                  v-on:click="
                    selected = 1;
                    changeButtonColor();
                  "
                >
                  <!-- <img src="right.png" alt="arrow" class="arrowSelected"> -->
                  <p v-bind:class="{ selectedPanel: isMenu }">Menu</p>
                </button>
                <button
                  class="reserve has-text-white"
                  v-on:click="
                    selected = 2;
                    changeButtonColor();
                  "
                >
                  <p v-bind:class="{ selectedPanel: isReserve }">Reserve</p>
                </button>
                <button
                  class="promo has-text-white"
                  v-on:click="
                    selected = 3;
                    changeButtonColor();
                  "
                >
                  <p v-bind:class="{ selectedPanel: isPromo }">Promotion</p>
                </button>
              </div>
            </div>
            <div class="manageContainer is-flex is-justify-content-center">
              <div class="showPanel is-flex is-justify-content-center">
                <div class="details">
                  <table class="table">
                    <thead>
                      <th><b>Menu List</b></th>
                      <br />
                      <tr class="">
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="menu in admindata.menu" :key="menu.menu_id">
                        <td>{{ menu.menu_name }}</td>
                        <td>{{ menu.price }} Bath</td>
                        <td>{{ menu.detail }}</td>
                        <td>{{ menu.menu_type }}</td>
                        <td>
                          <button
                            class="button is-warning"
                            @click="
                              showEditMenuModal(
                                menu.menu_id,
                                menu.menu_name,
                                menu.price,
                                menu.detail,
                                menu.menu_type
                              )
                            "
                          >
                            Edit <i class="fa-solid fa-pen-to-square"></i>
                          </button>
                        </td>
                        <td>
                          <button
                            class="button is-danger"
                            @click="
                              showDeleteMenuModal(menu.menu_id, menu.menu_name)
                            "
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <button
                    class="button is-success"
                    style="
                      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                      width: 110px;
                    "
                    @click="showNewMenu()"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- add modal -->
        <div class="modal" :class="{ 'is-active': isAddMenuModal }">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">New Menu</p>
              <button
                class="delete"
                aria-label="close"
                @click="closeNewMenu()"
              ></button>
            </header>
            <section class="modal-card-body">
              <!-- Content ... -->
              <div class="is-flex is-justify-content-space-around">
                <input
                  class="input"
                  type="text"
                  placeholder="Menu Name"
                  style="width: 60%"
                  v-model="$v.menu_new_name.$model" :class="{'is-danger' : $v.menu_new_name.$error}"
                />
                <input
                  class="input"
                  type="text"
                  name=""
                  id=""
                  placeholder="Price"
                  style="width: 40%"
                  v-model="$v.menu_new_price.$model" :class="{'is-danger' : $v.menu_new_price.$error}"
                />
              </div>
              <div style="position: relative">
                 <template v-if="$v.menu_new_name.$error">
                  <p class="help is-danger is-size-6" v-if="!$v.menu_new_name.required" style="position:absolute; left: 0;">This field is required</p>
                </template>
                <template v-if="$v.menu_new_price.$error">
                  <p class="help is-danger is-size-6" v-if="!$v.menu_new_price.required" style="position:absolute; right: 16%;">This field is required</p>
                </template>
              </div>
              <br>
              <br />
              <div class="is-flex is-justify-content-left">
                <!-- <input
                  class="input"
                  type="text"
                  placeholder="Food Type"
                  style="width: 50%"
                  v-model="menu_new_type"
                /> -->
                <div class="select" style="width: 50%;">
                  <select style="width:100%"
                    v-model="menu_new_type">
                    <option>food</option>
                    <option>drink</option>
                  </select>
                </div>
              </div>
              
              <br />
              <textarea
                class="textarea"
                name="description"
                id="des"
                cols="30"
                rows="10"
                placeholder="Description"
                v-model="menu_new_detail"
              ></textarea>
              <br>
              <div style="position: relative">
                 
              </div>
              
              <br />
              <div class="file has-name">
                <label class="file-label">
                  <input
                    class="file-input"
                    multiple
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    @change="selectImages"
                    name="myImage"
                  />
                  <span class="file-cta">
                    <span class="file-icon">
                      <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label"> Choose a file… </span>
                  </span>
                  <span class="has-name file-name">
                    {{ filename }}
                  </span>
                </label>
              </div>
              <br />
              <div v-if="images" class="columns is-multiline">
                <div
                  v-for="(image, index) in xxx"
                  :key="image.id"
                  class="column is-one-quarter"
                >
                  <div class="card">
                    <div class="card-image">
                      <figure class="image is-4by3">
                        <img
                          :src="showSelectImage(image)"
                          alt="Placeholder image"
                        />
                      </figure>
                    </div>
                    <footer class="card-footer">
                      <a
                        @click="deleteSelectImage(index)"
                        class="card-footer-item has-text-danger"
                        >Delete</a
                      >
                    </footer>
                  </div>
                </div>
              </div>
            </section>
            <footer class="modal-card-foot">
              <button class="button is-success" @click="summitNewMenu()">
                Save changes
              </button>
              <button class="button" @click="closeNewMenu()">Cancel</button>
            </footer>
          </div>
        </div>
        <!-- edit modal -->
        <div class="modal" :class="{ 'is-active': isEditMenuModal }">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">Edit Menu</p>
              <button
                class="delete"
                aria-label="close"
                @click="closeEditMenuModal()"
              ></button>
            </header>
            <section class="modal-card-body">
              <!-- Content ... -->
              <div class="is-flex is-justify-content-space-around">
                <input
                  class="input"
                  type="text"
                  placeholder="Menu Name"
                  style="width: 60%"
                  v-model="$v.menu_edit_name.$model" :class="{'is-danger': $v.menu_edit_name.$error}"
                />
                <input
                  class="input"
                  type="text"
                  name=""
                  id=""
                  placeholder="Price"
                  style="width: 40%"
                  v-model="$v.menu_edit_price.$model" :class="{'is-danger': $v.menu_edit_price.$error}"
                />
              </div>
              <div style="position: relative">
                 <template v-if="$v.menu_edit_name.$error">
  
                  <p class="help is-danger is-size-6" v-if="!$v.menu_edit_name.required" style="position:absolute; left: 0;">This field is required</p>
                </template>
                <template v-if="$v.menu_new_price.$error">
                  <p class="help is-danger is-size-6" v-if="!$v.menu_edit_price.required" style="position:absolute; right: 16%;">This field is required</p>
                </template>
              </div>
              <br /><br>
              <div class="is-flex is-justify-content-left">
                <!-- <input
                  class="input"
                  type="text"
                  placeholder="Food Type"
                  style="width: 50%"
                  v-model="menu_edit_type"
                /> -->
                <div class="select" style="width: 50%;">
                  <select style="width:100%"
                    v-model="menu_edit_type">
                    <option value="food">food</option>
                    <option value="drink">drink</option>
                  </select>
                </div>
              </div>
              <br />
              <textarea
                class="textarea"
                name="description"
                id="des"
                cols="30"
                rows="10"
                placeholder="Description"
                v-model="menu_edit_detail"
              ></textarea>
              
              <br />
              <div class="file">
                <label class="file-label">
                  <input
                    class="file-input"
                    multiple
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    @change="selectImages"
                    name="myImage"
                  />
                  <span class="file-cta">
                    <span class="file-icon">
                      <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label"> Choose a file… </span>
                  </span>
                  <span class="has-name file-name">
                    {{ filename }}
                  </span>
                </label>
              </div>
              <div v-if="images" class="columns is-multiline">
                <div
                  v-for="(image, index) in xxx"
                  :key="image.id"
                  class="column is-one-quarter"
                >
                  <div class="card">
                    <div class="card-image">
                      <figure class="image is-4by3">
                        <img
                          :src="showSelectImage(image)"
                          alt="Placeholder image"
                        />
                      </figure>
                    </div>
                    <footer class="card-footer">
                      <a
                        @click="deleteSelectImage(index)"
                        class="card-footer-item has-text-danger"
                        >Delete</a
                      >
                    </footer>
                  </div>
                </div>
              </div>
            </section>
            <footer class="modal-card-foot">
              <button class="button is-success" @click="summitEditModal()">
                Save changes
              </button>
              <button class="button" @click="closeEditMenuModal()">
                Cancel
              </button>
            </footer>
          </div>
        </div>
        <!-- delete modal -->
        <div class="modal" :class="{ 'is-active': isDeleteMenuModal }">
          <div class="modal-background"></div>
          <div class="modal-card">
            <section class="modal-card-body">
              <!-- Content ... -->
              <p class="modal-card-content">
                Are you sure you want to delete "{{ deletename }}" ?
              </p>
              <br />
            </section>
            <footer class="modal-card-foot">
              <button
                class="button is-danger"
                @click="summintDeleteMenuModal()"
              >
                Confirm
              </button>
              <button class="button" @click="closeDeleteMenuModal()">
                Cancel
              </button>
            </footer>
          </div>
        </div>
      </template>

      <template v-else-if="selected === 2">
        <div
          class="
            hero
            is-fullheight-with-navbar is-flex is-justify-content-center
          "
        >
          <div class="hero">
            <div class="container">
              <div
                class="
                  textcontainer
                  is-flex is-justify-content-center is-align-items-center
                "
              >
                <div
                  class="
                    adminbox
                    box
                    has-background-light
                    is-flex is-justify-content-center is-align-items-center
                  "
                >
                  <h1 class="admintext has-text-black is-size-3">
                    Admin Panel
                  </h1>
                </div>
              </div>
              <div class="arrowContainer is-flex is-justify-content-center">
                <div
                  style="width: 400px"
                  class="is-flex is-justify-content-space-around"
                >
                  <img
                    src="https://cdn.discordapp.com/attachments/963724471435395112/969845224404840458/right.png"
                    alt="arrow"
                    class="arrowSelected"
                    v-bind:class="{ arrowSelectedHide: isArrowMenu }"
                  />
                  <img
                    src="https://cdn.discordapp.com/attachments/963724471435395112/969845224404840458/right.png"
                    alt="arrow"
                    class="arrowSelected"
                    v-bind:class="{ arrowSelectedHide: isArrowReserve }"
                  />
                  <img
                    src="https://cdn.discordapp.com/attachments/963724471435395112/969845224404840458/right.png"
                    alt="arrow"
                    class="arrowSelected"
                    v-bind:class="{ arrowSelectedHide: isArrowPromo }"
                  />
                </div>
              </div>
              <div
                class="
                  selectContainer
                  is-flex is-justify-content-center is-align-items-center
                "
              >
                <div class="menu has-text-white">
                  <button
                    class="menu has-text-white"
                    v-on:click="
                      selected = 1;
                      changeButtonColor();
                    "
                  >
                    <p v-bind:class="{ selectedPanel: isMenu }">Menu</p>
                  </button>
                  <button
                    class="reserve has-text-white"
                    v-on:click="
                      selected = 2;
                      changeButtonColor();
                    "
                  >
                    <p v-bind:class="{ selectedPanel: isReserve }">Reserve</p>
                  </button>
                  <button
                    class="promo has-text-white"
                    v-on:click="
                      selected = 3;
                      changeButtonColor();
                    "
                  >
                    <p v-bind:class="{ selectedPanel: isPromo }">Promotion</p>
                  </button>
                </div>
              </div>
              <div class="manageContainer is-flex is-justify-content-center">
                <div class="showPanel is-flex is-justify-content-center">
                  <div class="details">
                    <table class="table">
                      <thead>
                        <th><b>Reservation List</b></th>
                        <br />
                        <tr class="">
                          <th>Customer Name</th>
                          <th>Booking date</th>
                          <th>Time</th>
                          <th>Seat</th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="res in admindata.reservation"
                          :key="res.res_no"
                        >
                          <td>{{ res.first_name + " " + res.last_name }}</td>
                          <td>{{ res.res_date.slice(0, 10) }}</td>
                          <td>{{ timeconvert(res.res_time) }}</td>
                          <td>{{ res.res_seat }}</td>

                          <td>
                            <button
                              class="button is-warning"
                              @click="
                                showEditReserve(
                                  res.res_no,
                                  res.first_name,
                                  res.last_name,
                                  res.res_date,
                                  res.res_time,
                                  res.res_seat
                                )
                              "
                            >
                              Edit <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                          </td>
                          <td>
                            <button
                              class="button is-danger"
                              @click="
                                showDeleteReserve(
                                  res.res_no,
                                  res.first_name,
                                  res.last_name,
                                  res.res_date
                                )
                              "
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <!-- <button class="button is-success"
                                        style="box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); width: 110px;"
                                        @click="isAddReserveModal=true">Add</button> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- add modal -->
        <div class="modal" :class="{ 'is-active': isAddReserveModal }">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">New Reservation</p>
              <button
                class="delete"
                aria-label="close"
                @click="isAddReserveModal = false"
              ></button>
            </header>
            <section class="modal-card-body">
              <!-- Content ... -->
              <div class="is-flex is-justify-content-space-around">
                <input
                  class="input"
                  type="text"
                  placeholder="Customer Name"
                  style="width: 60%"
                />
                <input
                  class="input"
                  type="date"
                  name=""
                  id=""
                  placeholder="Bookingdate"
                  style="width: 30%"
                />
              </div>
              <br />
              <div class="is-flex is-justify-content-space-around">
                <input
                  class="input"
                  type="time"
                  placeholder="Customer Name"
                  style="width: 60%"
                />
                <input
                  class="input"
                  type="text"
                  name=""
                  id=""
                  placeholder="Seat"
                  style="width: 30%"
                />
              </div>
            </section>
            <footer class="modal-card-foot">
              <button class="button is-success" @click="saveEditList()">
                Save changes
              </button>
              <button class="button" @click="isAddReserveModal = false">
                Cancel
              </button>
            </footer>
          </div>
        </div>
        <!-- edit modal -->
        <div class="modal" :class="{ 'is-active': isEditReserveModal }">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">Edit Reservation</p>
              <button
                class="delete"
                aria-label="close"
                @click="isEditReserveModal = false"
              ></button>
            </header>
            <section class="modal-card-body">
              <!-- Content ... -->
              <div class="is-flex is-justify-content-space-around">
                <input
                  class="input"
                  type="text"
                  placeholder="Customer Name"
                  style="width: 60%"
                  disabled
                  v-model="res_edit_name"
                />
                <input
                  class="input"
                  type="date"
                  name=""
                  id=""
                  placeholder="Bookingdate"
                  style="width: 30%"
                  v-model="res_edit_date"
                />
              </div>
              <br />
              <div class="is-flex is-justify-content-space-around">
                <!-- <input class="input" type="time" placeholder="Customer Name" style="width:60%" v-model="res_edit_time"/> -->
                <select
                  class="select"
                  style="width: 60%; height: 4vh"
                  v-model="res_edit_time"
                >
                  <option value="8:00:00">8.00 AM</option>
                  <option value="9:00:00">9.00 AM</option>
                  <option value="10:00:00">10.00 AM</option>
                  <option value="11:00:00">11.00 AM</option>
                  <option value="12:00:00">12.00 AM</option>
                  <option value="13:00:00">1.00 PM</option>
                  <option value="14:00:00">2.00 PM</option>
                  <option value="15:00:00">3.00 PM</option>
                  <option value="16:00:00">4.00 PM</option>
                  <option value="17:00:00">5.00 PM</option>
                  <option value="18:00:00">6.00 PM</option>
                  <option value="19:00:00">7.00 PM</option>
                  <option value="20:00:00">8.00 PM</option>
                  <option value="21:00:00">9.00 PM</option>
                  <option value="22:00:00">10.00 PM</option>
                </select>
                <input
                  class="input"
                  type="text"
                  name=""
                  id=""
                  placeholder="Seat"
                  style="width: 30%"
                  v-model="$v.res_edit_seat.$model" :class="{'is-danger' : $v.res_edit_seat.$error}"
                />
              </div>
               <div style="position: relative">
                <template v-if="$v.res_edit_seat.$error">
                  <p class="help is-danger is-size-6" v-if="!$v.res_edit_seat.required" style="position:absolute; right: 9%;">This field is required</p>
                </template>
            </div>
            </section>
            <footer class="modal-card-foot">
              <button class="button is-success" @click="summitEditReserve()">
                Save changes
              </button>
              <button class="button" @click="closeEditReserve()">Cancel</button>
            </footer>
          </div>
        </div>
        <!-- delete modal -->
        <div class="modal" :class="{ 'is-active': isDeleteReserveModal }">
          <div class="modal-background"></div>
          <div class="modal-card">
            <section class="modal-card-body">
              <!-- Content ... -->
              <p class="modal-card-content">
                Are you sure you want to delete "{{
                  "Reserve By  " +
                  res_name_delete +
                  " On Date " +
                  res_date_delete
                }}" ?
              </p>
              <br />
            </section>
            <footer class="modal-card-foot">
              <button class="button is-danger" @click="summitDeleteReserve()">
                Confirm
              </button>
              <button class="button" @click="closeDeleteReserve()">
                Cancel
              </button>
            </footer>
          </div>
        </div>
      </template>

      <template v-else-if="selected === 3">
        <div
          class="
            hero
            is-fullheight-with-navbar is-flex is-justify-content-center
          "
        >
          <div class="hero">
            <div class="container">
              <div
                class="
                  textcontainer
                  is-flex is-justify-content-center is-align-items-center
                "
              >
                <div
                  class="
                    adminbox
                    box
                    has-background-light
                    is-flex is-justify-content-center is-align-items-center
                  "
                >
                  <h1 class="admintext has-text-black is-size-3">
                    Admin Panel
                  </h1>
                </div>
              </div>
              <div class="arrowContainer is-flex is-justify-content-center">
                <div
                  style="width: 400px"
                  class="is-flex is-justify-content-space-around"
                >
                  <img
                    src="https://cdn.discordapp.com/attachments/963724471435395112/969845224404840458/right.png"
                    alt="arrow"
                    class="arrowSelected"
                    v-bind:class="{ arrowSelectedHide: isArrowMenu }"
                  />
                  <img
                    src="https://cdn.discordapp.com/attachments/963724471435395112/969845224404840458/right.png"
                    alt="arrow"
                    class="arrowSelected"
                    v-bind:class="{ arrowSelectedHide: isArrowReserve }"
                  />
                  <img
                    src="https://cdn.discordapp.com/attachments/963724471435395112/969845224404840458/right.png"
                    alt="arrow"
                    class="arrowSelected"
                    v-bind:class="{ arrowSelectedHide: isArrowPromo }"
                  />
                </div>
              </div>
              <div
                class="
                  selectContainer
                  is-flex is-justify-content-center is-align-items-center
                "
              >
                <div class="menu has-text-white">
                  <button
                    class="menu has-text-white"
                    v-on:click="
                      selected = 1;
                      changeButtonColor();
                    "
                  >
                    <p v-bind:class="{ selectedPanel: isMenu }">Menu</p>
                  </button>
                  <button
                    class="reserve has-text-white"
                    v-on:click="
                      selected = 2;
                      changeButtonColor();
                    "
                  >
                    <p v-bind:class="{ selectedPanel: isReserve }">Reserve</p>
                  </button>
                  <button
                    class="promo has-text-white"
                    v-on:click="
                      selected = 3;
                      changeButtonColor();
                    "
                  >
                    <p v-bind:class="{ selectedPanel: isPromo }">Promotion</p>
                  </button>
                </div>
              </div>
              <div class="manageContainer is-flex is-justify-content-center">
                <div class="showPanel is-flex is-justify-content-center">
                  <div class="details">
                    <table class="table">
                      <thead>
                        <th><b>Promotion List</b></th>
                        <br />
                        <tr class="">
                          <th>Name</th>
                          <th>Description</th>

                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="promo in admindata.promotion"
                          :key="promo.promotion_id"
                        >
                          <td>{{ promo.promotion_name }}</td>
                          <td>{{ promo.detail }}</td>
                          <td>
                            <button
                              class="button is-warning"
                              @click="
                                showEditPromotion(
                                  promo.promotion_id,
                                  promo.promotion_name,
                                  promo.state_date,
                                  promo.end_date,
                                  promo.detail,
                                  promo.discount
                                )
                              "
                            >
                              Edit <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                          </td>
                          <td>
                            <button
                              class="button is-danger"
                              @click="
                                showDeletePromotion(
                                  promo.promotion_id,
                                  promo.promotion_name
                                )
                              "
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <button
                      class="button is-success"
                      style="
                        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                        width: 110px;
                      "
                      @click="showAddPromotion()"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- add modal -->
        <div class="modal" :class="{ 'is-active': isAddPromoModal }">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">New Promotion</p>
              <button
                class="delete"
                aria-label="close"
                @click="closeAddPromotion()"
              ></button>
            </header>
            <section class="modal-card-body">
              <!-- Content ... -->
              <input
                class="input"
                type="text"
                placeholder="Promotion name"
                v-model="$v.pro_new_name.$model" :class="{'is-danger': $v.pro_new_name.$error}"
              />
              <div style="position: relative">
                 <template v-if="$v.pro_new_name.$error">
                  <p class="help is-danger is-size-6" v-if="!$v.pro_new_name.required" style="position:absolute; left: 0;">This field is required</p>
                </template>
      
              </div>
              <br /><br />
              <div class="is-flex is-justify-content-space-around">
                <input
                  class="input"
                  type="date"
                  placeholder="Start Date"
                  style="width: 50%"
                  v-model="pro_new_start_date"
                />
                <input
                  class="input"
                  type="date"
                  placeholder="End Date"
                  style="width: 50%"
                  v-model="pro_new_end_date"
                />
              </div>
              <br />
              <div class="is-flex is-justify-content-left">
                <input
                  class="input"
                  type="number"
                  placeholder="Discount"
                  style="width: 50%"
                  v-model="pro_new_discount"
                />
              </div>
              <br />
              <textarea
                class="textarea"
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="Description"
                v-model="pro_new_detail"
              ></textarea>
              <br />
              <div class="file">
                <label class="file-label">
                  <input
                    class="file-input"
                    multiple
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    @change="selectImages"
                    name="myImage"
                  />
                  <span class="file-cta">
                    <span class="file-icon">
                      <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label"> Choose a file… </span>
                  </span>
                  <span class="has-name file-name">
                    {{ filename }}
                  </span>
                </label>
              </div>
              <div v-if="images" class="columns is-multiline">
                <div
                  v-for="(image, index) in xxx"
                  :key="image.id"
                  class="column is-one-quarter"
                >
                  <div class="card">
                    <div class="card-image">
                      <figure class="image is-4by3">
                        <img
                          :src="showSelectImage(image)"
                          alt="Placeholder image"
                        />
                      </figure>
                    </div>
                    <footer class="card-footer">
                      <a
                        @click="deleteSelectImage(index)"
                        class="card-footer-item has-text-danger"
                        >Delete</a
                      >
                    </footer>
                  </div>
                </div>
              </div>
            </section>
            <footer class="modal-card-foot">
              <button class="button is-success" @click="summitAddPromotion()">
                Save changes
              </button>
              <button class="button" @click="closeAddPromotion()">
                Cancel
              </button>
            </footer>
          </div>
        </div>
        <!-- edit modal -->
        <div class="modal" :class="{ 'is-active': isEditPromoModal }">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">Edit Promotion</p>
              <button
                class="delete"
                aria-label="close"
                @click="closeEditPromotion()"
              ></button>
            </header>
            <section class="modal-card-body">
              <!-- Content ... -->
              <input
                class="input"
                type="text"
                placeholder="Promotion name"
                v-model="pro_edit_name"
              />

              
              <br /><br />
              <div class="is-flex is-justify-content-space-around">
                <input
                  class="input"
                  type="date"
                  placeholder="Start Date"
                  style="width: 50%"
                  v-model="pro_edit_start_date"
                />
                <input
                  class="input"
                  type="date"
                  placeholder="End Date"
                  style="width: 50%"
                  v-model="pro_edit_end_date"
                />
              </div>
              <br />
              <div class="is-flex is-justify-content-left">
                <input
                  class="input"
                  type="number"
                  placeholder="Discount"
                  style="width: 50%"
                  v-model="pro_edit_discount"
                />
              </div>
              <br />
              <textarea
                class="textarea"
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="Description"
                v-model="pro_edit_detail"
              ></textarea>
              <br />
              <div class="file">
                <label class="file-label">
                  <input
                    class="file-input"
                    multiple
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    @change="selectImages"
                    name="myImage"
                  />
                  <span class="file-cta">
                    <span class="file-icon">
                      <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label"> Choose a file… </span>
                  </span>
                  <span class="has-name file-name">
                    {{ filename }}
                  </span>
                </label>
              </div>
              <div v-if="images" class="columns is-multiline">
                <div
                  v-for="(image, index) in xxx"
                  :key="image.id"
                  class="column is-one-quarter"
                >
                  <div class="card">
                    <div class="card-image">
                      <figure class="image is-4by3">
                        <img
                          :src="showSelectImage(image)"
                          alt="Placeholder image"
                        />
                      </figure>
                    </div>
                    <footer class="card-footer">
                      <a
                        @click="deleteSelectImage(index)"
                        class="card-footer-item has-text-danger"
                        >Delete</a
                      >
                    </footer>
                  </div>
                </div>
              </div>
            </section>
            <footer class="modal-card-foot">
              <button class="button is-success" @click="summitEditPromotion()">
                Save changes
              </button>
              <button class="button" @click="closeEditPromotion()">
                Cancel
              </button>
            </footer>
          </div>
        </div>
        <!-- delete modal -->
        <div class="modal" :class="{ 'is-active': isDeletePromoModal }">
          <div class="modal-background"></div>
          <div class="modal-card">
            <section class="modal-card-body">
              <!-- Content ... -->
              <p class="modal-card-content">
                Are you sure you want to delete "{{ pro_name_delete }}" ?
              </p>
              <br />
            </section>
            <footer class="modal-card-foot">
              <button class="button is-danger" @click="summitDeletePromotion()">
                Confirm
              </button>
              <button class="button" @click="closeDeletePromotion()">
                Cancel
              </button>
            </footer>
          </div>
        </div>
      </template>
    </section>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
import {
  required,
  email,
  minLength,
  sameAs,
  maxLength,
  minValue,
  maxValue,
} from "vuelidate/lib/validators";
export default {
  data() {
    return {
      selected: 1,
      isMenu: true,
      isReserve: false,
      isPromo: false,
      isArrowMenu: false,
      isArrowReserve: true,
      isArrowPromo: true,
      isAddMenuModal: false,
      isEditMenuModal: false,
      isDeleteMenuModal: false,
      isAddReserveModal: false,
      isEditReserveModal: false,
      isDeleteReserveModal: false,
      isAddPromoModal: false,
      isEditPromoModal: false,
      isDeletePromoModal: false,
      admindata: [],
      deletename: "",
      delete_id: "",
      menu_new_name: "",
      menu_new_price: "",
      menu_new_detail: "",
      menu_new_type: "",
      menu_edit_name: "",
      menu_edit_price: "",
      menu_edit_detail: "",
      menu_edit_type: "",
      menu_edit_id: "",

      res_edit_id: "",
      res_edit_date: "",
      res_edit_time: "",
      res_edit_seat: "",
      res_edit_name: "",

      res_id_delete: "",
      res_name_delete: "",
      res_date_delete: "",

      pro_new_name: "",
      pro_new_start_date: "",
      pro_new_end_date: "",
      pro_new_discount: "",
      pro_new_detail: "",

      pro_edit_id: "",
      pro_edit_name: "",
      pro_edit_start_date: "",
      pro_edit_end_date: "",
      pro_edit_discount: "",
      pro_edit_detail: "",

      pro_id_delete: "",
      pro_name_delete: "",

      images: null,
      filename: "Please choose a file",
      xxx: "",
    };
  },
  mounted() {
    this.mangedata();
  },
  validations: {
    menu_new_name: {
      required: required
    },
    menu_new_price: {
      required: required
    },
     menu_edit_name: {
      required: required
    },
     menu_edit_price: {
      required: required
    },
    pro_new_name: {
      required: required
    },
    res_edit_seat: {
      required: required
    }
  },
  methods: {
    test_vue() {
      this.button_count += 1;
      console.log("SZ");
    },
    summit() {},
    changeButtonColor() {
      if (this.selected === 1) {
        this.isMenu = true;
        this.isReserve = false;
        this.isPromo = false;
        this.isArrowMenu = false;
        this.isArrowReserve = true;
        this.isArrowPromo = true;
      } else if (this.selected === 2) {
        this.isMenu = false;
        this.isReserve = true;
        this.isPromo = false;
        this.isArrowMenu = true;
        this.isArrowReserve = false;
        this.isArrowPromo = true;
        // alert('xx')
      } else if (this.selected === 3) {
        this.isMenu = false;
        this.isReserve = false;
        this.isPromo = true;
        this.isArrowMenu = true;
        this.isArrowReserve = true;
        this.isArrowPromo = false;
        // alert('xx')
      }
    },
    mangedata() {
      axios
        .get("http://localhost:3000/adminpanel")
        .then((response) => {
          this.admindata = response.data;
          //console.log(this.admindata)
          //console.log(this.admindata.menu)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showEditMenuModal(id, name, price, detail, type) {
      this.isEditMenuModal = true;
      this.menu_edit_id = id;
      this.menu_edit_name = name;
      this.menu_edit_price = price;
      this.menu_edit_detail = detail;
      this.menu_edit_type = type;
    },
    closeEditMenuModal() {
      this.isEditMenuModal = false;
    },
    summitEditModal() {
      // let data_edit = {
      //   id: this.menu_edit_id,
      //   name: this.menu_edit_name,
      //   price: this.menu_edit_price,
      //   detail: this.menu_edit_detail,
      //   type: this.menu_edit_type,
      // };
      if(this.menu_edit_name === "" || this.menu_edit_price === "" || this.menu_edit_type === "" || this.images === null) {
        alert("pls fill all required")
        return false
      }
      let formData = new FormData();
      formData.append("id", this.menu_edit_id);
      formData.append("name", this.menu_edit_name);
      formData.append("price", this.menu_edit_price);
      formData.append("detail", this.menu_edit_detail);
      formData.append("type", this.menu_edit_type);
      formData.append("myImage", this.images);
      axios
        .put("http://localhost:3000/adminpanel/editmenu", formData)
        .then((res) => {
          alert("edit complete");
          this.isEditMenuModal = false;
          this.mangedata();
        })
        .catch((err) => {
          alert(err.response.data.details.message);
        });
    },

    showDeleteMenuModal(id, current_menu_name) {
      this.isDeleteMenuModal = true;
      this.deletename = current_menu_name;
      this.delete_id = id;
    },
    closeDeleteMenuModal() {
      this.isDeleteMenuModal = false;
    },
    summintDeleteMenuModal() {
      axios
        .delete(`http://localhost:3000/adminpanel/deletemenu/${this.delete_id}`)
        .then((res) => {
          this.mangedata();
        })
        .catch((err) => {
          alert(err.response.data.details.message);
        });
      this.isDeleteMenuModal = false;
    },
    showNewMenu() {
      this.isAddMenuModal = true;
    },
    closeNewMenu() {
      this.isAddMenuModal = false;
      this.menu_new_name = "";
      this.menu_new_price = "";
      this.menu_new_detail = "";
    },
    summitNewMenu() {
      // let data_add = {
      //   name: this.menu_new_name,
      //   price: this.menu_new_price,
      //   detail: this.menu_new_detail,
      //   type: this.menu_new_type,
      //   pic: this.images
      // };
      let formData = new FormData();
      formData.append("name", this.menu_new_name);
      formData.append("price", this.menu_new_price);
      formData.append("detail", this.menu_new_detail);
      formData.append("type", this.menu_new_type);
      formData.append("myImage", this.images);
       if(this.menu_new_name === "" || this.menu_new_price === "" || this.menu_new_type === "" || this.images === null) {
        alert("Pls fill all required")
        return false
      }
      axios
        .post("http://localhost:3000/adminpanel/addmenu", formData)
        .then((res) => {
          // console.log(this.menu_new_name)
          // console.log(this.menu_new_price)
          // console.log(this.menu_new_detail)
          // console.log(this.menu_new_type)
          // console.log(this.images)
          alert("Add complete");
          this.mangedata();
          this.menu_new_name = "";
          console.log("ho1");
          this.menu_new_price = "";
          console.log("ho2");
          this.menu_new_detail = "";
          console.log("ho3");
          this.menu_new_type = "";
          console.log("ho4");
          this.images = null;
          console.log("ho5");
          this.filename = '';
        })
        .catch((err) => {
          alert(err.response.data.details.message);
        });
      this.isAddMenuModal = false;
    },

    showEditReserve(id, f_name, l_name, date, time, seat) {
      this.isEditReserveModal = true;
      this.res_edit_id = id;
      this.res_edit_name = f_name + " " + l_name;
      this.res_edit_date = date.slice(0, 10);
      this.res_edit_time = this.timeconvert(time);
      this.res_edit_seat = seat;
    },
    closeEditReserve() {
      this.isEditReserveModal = false;
    },
    summitEditReserve() {
      
      if(this.res_edit_date === "" || this.res_edit_time === "" || this.res_edit_seat === "") {
        alert("Pls fill all required")
        return false
      }else {
        this.isEditReserveModal = false;
      }
      let data_edit = {
        res_no: this.res_edit_id,
        date: this.res_edit_date,
        time: this.res_edit_time,
        seat: this.res_edit_seat,
      };
      axios
        .put("http://localhost:3000/adminpanel/editreservation", data_edit)
        .then((res) => {
          alert("edit res complete");
          this.isEditReserveModal = false;
          this.mangedata();
        })
        .catch((err) => {
          alert(err.response.data.details.message);
        });
    },

    showDeleteReserve(id, f_name, l_name, date) {
      this.res_name_delete = f_name + " " + l_name;
      this.res_id_delete = id;
      this.res_date_delete = date.slice(0, 10);
      this.isDeleteReserveModal = true;
    },
    closeDeleteReserve() {
      this.isDeleteReserveModal = false;
    },
    summitDeleteReserve() {
      axios
        .delete(
          `http://localhost:3000/adminpanel/deletres/${this.res_id_delete}`
        )
        .then((res) => {
          this.mangedata();
          console.log("delete res Complete");
          this.isDeleteReserveModal = false;
        })
        .catch((err) => {
          alert(err.response.data.details.message);
        });
    },
    showAddPromotion() {
      this.isAddPromoModal = true;
    },
    closeAddPromotion() {
      this.isAddPromoModal = false;
      this.pro_new_name = "";
      this.pro_new_start_date = "";
      this.pro_new_end_date = "";
      this.pro_new_discount = "";
      this.pro_new_detail = "";
    },
    summitAddPromotion() {
      // let data_add = {
      //   name: this.pro_new_name,
      //   start_date: this.pro_new_start_date,
      //   end_date: this.pro_new_end_date,
      //   discount: this.pro_new_discount,
      //   detail: this.pro_new_detail,
      // };
      if(this.pro_new_name === "" || this.pro_new_start_date === "" || this.pro_new_end_date === ""  || this.pro_new_detail === "" || this.images === null || this.pro_new_discount === "" || this.pro_new_detail === "") {
        alert("Plse fill all required")
        return false
      }  
      let formData = new FormData();
      formData.append("name", this.pro_new_name);
      formData.append("start_date", this.pro_new_start_date);
      formData.append("end_date", this.pro_new_end_date);
      formData.append("discount", this.pro_new_discount);
      formData.append("detail", this.pro_new_detail);
      formData.append("myImage", this.images);
      axios
        .post("http://localhost:3000/adminpanel/addpromotion", formData)
        .then((res) => {
          alert("Add complete");
          this.mangedata();
          this.isAddPromoModal = false;
        })
        .catch((err) => {
          alert(err.response.data.details.message);
        });
    },

    showEditPromotion(
      promotion_id,
      promotion_name,
      state_date,
      end_date,
      detail,
      discount
    ) {
      this.isEditPromoModal = true;

      this.pro_edit_id = promotion_id;
      this.pro_edit_name = promotion_name;
      this.pro_edit_start_date = state_date.slice(0, 10);
      this.pro_edit_end_date = end_date.slice(0, 10);
      this.pro_edit_detail = detail;
      this.pro_edit_discount = discount;
    },
    closeEditPromotion() {
      this.isEditPromoModal = false;
    },
    summitEditPromotion() {
      if(this.pro_edit_name === "" || this.pro_edit_start_date === "" || this.pro_edit_end_date === "" || this.pro_edit_discount === "" || this.pro_edit_detail === "" || this.images === null) {
        alert("Pls fill all required")
        return false
      }
      else {
        this.isEditPromoModal = false;
      }
      
      let formData = new FormData();
      formData.append("id", this.pro_edit_id);
      formData.append("name", this.pro_edit_name);
      formData.append("start_date", this.pro_edit_start_date);
      formData.append("end_date", this.pro_edit_end_date);
      formData.append("discount", this.pro_edit_discount);
      formData.append("detail", this.pro_edit_detail);
      formData.append("myImage", this.images);
      axios
        .put("http://localhost:3000/adminpanel/editpromotion", formData)
        .then((res) => {
          alert("editcomplete");
          this.mangedata();
          this.isAddPromoModal = false;
        })
        .catch((err) => {
          alert(err.response.data.details.message);
        });
    },

    showDeletePromotion(promotion_id, promotion_name) {
      this.pro_id_delete = promotion_id;
      this.pro_name_delete = promotion_name;
      this.isDeletePromoModal = true;
    },
    closeDeletePromotion() {
      this.isDeletePromoModal = false;
    },
    summitDeletePromotion() {
      axios
        .delete(
          `http://localhost:3000/adminpanel/deletepromo/${this.pro_id_delete}`
        )
        .then((res) => {
          this.mangedata();
          console.log("delete pro Complete");
          this.isDeletePromoModal = false;
        })
        .catch((err) => {
          alert(err.response.data.details.message);
        });
    },
    timeconvert(time_in) {
      var time_hour = parseInt(time_in.slice(11, 13)) + 7;
      var time_min = time_in.slice(14, 16);
      var time_sec = time_in.slice(17, 19);
      return time_hour + ":" + time_min + ":" + time_sec;
    },
    selectImages(event) {
      this.images = event.target.files[0];
      this.xxx = event.target.files;
      // console.log(this.images)
      this.filename = this.images.name;
    },
    showSelectImage() {
      // for preview only
      return URL.createObjectURL(this.images);
    },
    deleteSelectImage(index) {
      this.images = null;
      this.filename = '';
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
  border: none;
  background-color: #141414;
  font-weight: 100;
}

.arrow {
  color: white;
}

.manageContainer {
  width: 100%;
  height: 800px;
}

.showPanel {
  width: 1271px;
  height: 750px;
  background-color: #c4c4c4;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  overflow: auto;
  padding-top: 2%;
}

.details {
  width: 1100px;
  /* background-color: #C4C4C4; */
  /* background-color: red; */
}

.table {
  width: 100%;
  background-color: #c4c4c4;
}

.selectedPanel {
  font-weight: 900;
  color: #e58138;
}

.arrowContainer {
  width: 100%;
  height: 5px;
  /* background-color: rebeccapurple; */
}

.arrowSelected {
  width: 20px;
  height: 20px;
  transform: rotate(90deg);
  margin-right: 60px;
}

.arrowSelectedHide {
  opacity: 0;
}

* {
  font-family: "Podkova";
  font-weight: 400;
}
</style>