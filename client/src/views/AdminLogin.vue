<template>
  <div class="container-fluid">
    <div class="form-group">
      <h3>Admin Login</h3>
    </div>
    <div class="form-group">
      <label for="inputEmail3" class="col-sm-2 control-label">Username</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" id="inputEmail3" placeholder="Email" v-model="username">
      </div>
    </div>
    <div class="form-group">
      <label for="inputPassword3" class="col-sm-2 control-label">Password</label>
      <div class="col-sm-10">
        <input type="password" class="form-control" id="inputPassword3" placeholder="Password" v-model="password">
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <button type="submit" class="btn btn-default" @click="signin()">Sign in</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    signin () {
      axios.post('http://35.185.181.118/user/signin', {
        username: this.username,
        password: this.password
      }, {})
        .then(response => {
          console.log(response)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('status', 'connected')
          location.reload()
          this.$router.push('/admin/input')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.container-fluid {
  max-width: 500px;
  margin: 0 auto;
  align-items: middle;
  height: 75rem;
}
</style>
