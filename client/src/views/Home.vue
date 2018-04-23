<template>
<div class="home">
  <header>
    <!-- ========================= NAVBAR FOR SEARCH ========================= -->
    <nav class="navbar navbar-expand-lg navbar-light bg-secondary sticky-top">
      <div class="dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              All
          </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item">Category 1</a>
          <a class="dropdown-item">Category 2</a>
        </div>
      </div>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn my-2 my-sm-0" type="button">Search</button>
      </form>
    </nav>
    <!-- ========================= NAVBAR FOR SIGN IN, CART, ETC ========================= -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="mx-auto order-1">
        <a class="navbar-brand mx-auto" href="#">Foot Crown</a>
      </div>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbarCollapse1,.navbarCollapse2" aria-controls="navbarCollapse1,navbarCollapse2" aria-expanded="false">
          <span class="navbar-toggler-icon"></span>
        </button>
      <div class="collapse navbar-collapse order-0 navbarCollapse1">
        <div class="navbar-collapse dual-collapse2">
          <div class="dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Our Products
              </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item">Category 1</a>
              <a class="dropdown-item">Category 2</a>
            </div>
          </div>
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link" href="#">Special Price For You!</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="collapse navbar-collapse order-2 navbarCollapse2">
        <div class="navbar-collapse dual-collapse2">
          <ul class="navbar-nav ml-auto">
            <div class="dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Sign In
                </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <div class="container">
                  <form class="form-signin">
                    <h1 class="h5 mb-3 font-weight-normal" style="color: black;">Foot Crown Sign In</h1><br>
                    <input type="email" id="inputUsername" class="form-control" placeholder="Username"><br>
                    <input type="password" id="inputPassword" class="form-control" placeholder="Password"><br>
                    <div class="checkbox mb-3">
                      <label>
                          <input type="checkbox" value="remember-me"> Remember me
                          </label>
                    </div>
                    <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button><br>
                    <p>Don't have an account? Please <a href="./signup.html">Sign Up</a></p>
                  </form>
                </div>
              </div>
            </div>
            <li class="nav-item">
              <a class="nav-link" href="#" data-toggle="modal" data-target="#exampleModal">
                  Shopping Cart
                </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <br>
  </header>
  <section>
    <!-- ========================= MODAL FOR CART ========================= -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Your Shopping Cart</h5>
          </div>
          <div class="modal-body">
            <div v-for="(val, index) in cart" v-bind:key="index">
              <div v-if="val.quantity > 0">
                <div class="font-weight-bold">
                  <img class="image" v-bind:src="val.src" width="50" /> Price: {{ val.price }} || Quantity: {{ val.quantity }}
                  <button v-on:click="deleteCart(val)" class="btn-danger">Delete</button>
                </div><br>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" v-on:click="deleteAll()">Delete All</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Checkout</button>
          </div>
        </div>
      </div>
    </div>
    <!-- ========================= HOME WELCOME ========================= -->
    <div class="container">
      <div class="row">
        <div class="col-md-12 jumbotron">
          <h1>Foot Crown</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <a href="#" class="btn btn-md btn-success">Our Best Products</a>
        </div>
      </div>
      <!-- ========================= LIST ITEMS ========================= -->
      <div id="content" class="row">
        <div class="col-md-12 flex-container">
          <div v-for="(item, index) in items" v-bind:key="index">
            <div>
              <img class="image" v-bind:src="item.src" />
            </div><br>
            <div class="font-weight-bold">
              Price: {{ item.price }} || Stock: {{ item.stock }}
            </div>
            <div>
              <button @click="addCart(item)" class="btn btn-primary">Buy This Item</button>
            </div><br>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <!-- ========================= FOOTER ========================= -->
      <div class="footer-copyright py-1 text-center">
        © 2018 Copyright: Roarized
      </div>
    </footer>
  </section>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'home',
  data () {
    return {}
  },
  computed: {
    items () {
      return this.$store.state.items
    },
    cart () {
      return this.$store.state.cart
    }
  },
  methods: {
    addCart: function (val) {
      this.$store.commit('addCart', val)
    },
    deleteCart (val) {
      this.$store.commit('deleteCart', val)
    },
    deleteAll () {
      this.$store.commit('deleteAll')
    }
  },
  created: function () {
    axios.get('http://localhost:3000/item/read')
      .then(response => {
        this.$store.commit('addItems', response.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Do+Hyeon');

.navbar {
  margin-bottom: 0px !important;
}

.sticky-top {
  margin-top: 56px;
}

.nav-link {
  color: white;
  font-weight: bold;
}

.special {
  color: black;
}

.mx-auto {
  font-family: 'Do Hyeon', sans-serif;
  font-size: 21px;
}

#content {
  padding-bottom: relative;
}

.jumbotron {
  background-color: grey;
  background-size: cover;
  background-attachment: fixed;
}

h1,
p {
  color: white;
  font-weight: bold;
}

img.image {
  max-width: 300px;
  max-height: 300px;
}

.flex-container {
  display: flex;
  flex-wrap: wrap;
  align items: flex-start;
  justify-content: space-around;
}

.liOptions {
  color: black
}

.dropdown:hover .dropdown-menu {
  display: block;
}

testing p {
  color: black;
}

footer {
  background-color: grey;
  color: white;
  font-weight: bold;
}

html,
body {
  height: 100%;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}

.container .h-100 {
  align-items: center !important;
}

body {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

form p {
  color: black;
}

.form-signin {
  width: 100%;
  max-width: 500px;
}

.form-signin .btn {
  max-width: 100px;
}
</style>
