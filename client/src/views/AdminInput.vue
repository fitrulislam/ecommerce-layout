<template>
<div class="content">
  <nav class="navbar navbar-expand-lg justify-content-between navbar-dark bg-dark fixed-top">
    <a class="navbar-brand" href="#">Foot Crown Admin Page</a>
    <a class="nav-link" href="#">Sign Out</a>
  </nav>
  <div class="container">
    <div class="d-flex">
      <button type="button" class="btn btn-md btn-primary" data-toggle="modal" data-target="#addModal">
        Add Item
      </button>
    </div>
    <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <form @submit.prevent="addData">
            <div class="modal-body">
              <div class="form-group">
                <input type="text" class="form-control" name="name" placeholder="name">
              </div>
              <div class="form-group">
                <input type="text" class="form-control" name="price" placeholder="price">
              </div>
              <div class="form-group">
                <input type="text" class="form-control" name="stock" placeholder="stock">
              </div>
              <div class="form-group">
                <input type="file" class="form-control" name="pic" placeholder="picture">
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">Add Article</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <table class="table">
      <thead>
        <th>Picture</th>
        <th>Name</th>
      </thead>
      <tbody>
        <tr v-for="(item,index) in items" v-bind:key="index">
          <td><img class="image" v-bind:src="item.src"/></td>
          <td><h6>{{ item.name }}</h6></td>
          <td class="text-right">
            <button type="button" class="btn btn-sm btn-default" data-toggle="modal" data-target="#itemModal">
              See Detail
            </button>
            <div class="modal fade" id="itemModal" tabindex="-1" role="dialog" aria-labelledby="itemModal" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <form @submit.prevent="editData">
                    <div class="modal-body">
                      <div class="form-group">
                        <input type="hidden" class="form-control" name="id" v-model="item._id">
                      </div>
                      <div class="form-group">
                        <input type="text" class="form-control" name="name" v-model="item.name">
                      </div>
                      <div class="form-group">
                        <input type="text" class="form-control" name="stock" v-model="item.stock">
                      </div>
                      <div class="form-group">
                        <input type="text" class="form-control" name="price" v-model="item.price">
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="submit" class="btn btn-primary">Edit</button>
                      <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'admininput',
  data () {
    return {
      name: '',
      stock: '',
      price: '',
      link: ''
    }
  },
  computed: {
    items () {
      return this.$store.state.items
    }
  },
  methods: {
    editData (event) {
      console.log(event.target.elements.name.value)
    },
    addData (event) {
      this.name = event.target.elements.name.value
      this.price = event.target.elements.price.value
      this.stock = event.target.elements.stock.value
      this.link = event.target.elements.link.value
      let formData = new FormData()
      formData.append('name', this.name)
      formData.append('price', this.price)
      formData.append('stock', this.stock)
      formData.append('link', this.link)
      axios.post('http://localhost:3000/item/create', formData, {
        headers: {
          'Content-type': 'multipart/form-data',
          token: localStorage.getItem('token')
        }
      })
      .then((response) => {
        this.productslist.push(response.data.data)
        document.getElementById('close').click()
        alert('Data Entered successfully')
      })
      .catch((err => {
        console.log('masuk error ' + err);
      }))
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

<style lang="css">
.nav-link {
  color:white !important;
}

.container {
padding-top: 100px;
}
</style>
