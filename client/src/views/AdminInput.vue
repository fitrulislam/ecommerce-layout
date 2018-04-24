<template>
<div class="content">
  <nav class="navbar navbar-expand-lg justify-content-between navbar-dark bg-dark fixed-top">
    <a class="navbar-brand" href="#">Foot Crown Admin Page</a>
    <a class="nav-link" @click="signout">Sign Out</a>
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
          <div class="modal-body">
            <div class="form-group">
              <input type="text" class="form-control" name="name" placeholder="name" v-model="name">
            </div>
            <div class="form-group">
              <input type="text" class="form-control" name="price" placeholder="price" v-model="price">
            </div>
            <div class="form-group">
              <input type="text" class="form-control" name="stock" placeholder="stock" v-model="stock">
            </div>
            <div class="form-group">
              <input type="file" class="form-control" name="image" placeholder="picture" @change="fileName">
            </div>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary" @click="addData()" data-dismiss="modal">Add Item</button>
          </div>
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
          <td><img class="image" v-bind:src="item.image" /></td>
          <td>
            <h6>{{ item.name }}</h6></td>
          <td class="text-right">
            <button type="button" class="btn btn-sm btn-default" data-toggle="modal" data-target="#itemModal">
              See Detail
            </button>
            <button type="button" class="btn btn-sm btn-danger" @click="deleteData(item._id)">
              Delete
            </button>
            <div class="modal fade" id="itemModal" tabindex="-1" role="dialog" aria-labelledby="itemModal" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-body">
                    <div class="form-group">
                      <input type="hidden" class="form-control" name="id" v-model="item._id">
                    </div>
                    <div class="text-left">
                      <img class="image" v-bind:src="item.image" />
                    </div><br>
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
                    <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                  </div>
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
import swal from 'sweetalert2'

export default {
  name: 'admininput',
  data () {
    return {
      name: '',
      stock: '',
      price: '',
      image: null
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
    fileName (event) {
      this.image = event.target.files[0]
    },
    addData () {
      swal({
        title: 'Adding Your Data',
        text: 'Please wait for 10 seconds',
        timer: 10000,
        onOpen: () => {
          swal.showLoading()
        }
      }).then((result) => {
        if (
          result.dismiss === swal.DismissReason.timer
        ) {
          location.reload()
        }
      })
      let formData = new FormData()
      formData.append('name', this.name)
      formData.append('price', this.price)
      formData.append('stock', this.stock)
      formData.append('image', this.image)
      this.$store.dispatch('addData', formData)
    },
    deleteData (id) {
      this.$store.dispatch('deleteData', id)
    },
    signout () {
      localStorage.clear()
      this.$router.push('/')
    }
  },
  created: function () {
    axios.get('http://35.185.181.118/item/read')
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
.nav-link {
  color: white !important;
}

.container {
  padding-top: 100px;
}

img {
  max-width: 100px;
}
</style>
