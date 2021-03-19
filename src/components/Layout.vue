<template>
  <div id="layout">
    <nav class="navbar navbar-expand-lg navbar-light bg-light" style="box-shadow: 5px 10px 30px rgba(0, 0, 0, 0.1)">
      <div class="container">
        <h5 class="pt-2" style="font-weight:bold;">
        <router-link class="nav-link text-dark" to="/"><i class="fa fa-home"></i> Home</router-link> 
        </h5>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto" v-if="!isLoggedIn">
            <li class="nav-item my-1">
              <router-link to="/login" class="nav-link btn btn-primary btn-sm text-white"><i class="fas fa-user mr-1"></i> Login</router-link>
            </li>
            <li class="nav-item my-1">
              <router-link to="/register" class="nav-link btn btn-primary btn-sm ml-3 text-white"><i class="fas fa-file-signature mr-1"></i> Register</router-link>
            </li>
          </ul>
          <ul class="navbar-nav ml-auto" v-else>
            <li class="nav-item my-1">
              <router-link to="/profile" class="nav-link"><i class="fas fa-user mr-1"></i> <b>User</b> |</router-link>
            </li>
            <li class="nav-item my-1">
              <a @click="logout" class="nav-link btn btn-primary btn-sm ml-2 text-white"><i class="fas fa-power-off mr-1"></i> Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name:'Layout',
  data(){
    return {
      isLoggedIn: false
    }
  },
  methods:{
    logout(){
      this.isLoggedIn = false;
      axios.post('http://127.0.0.1:8000/api/logout').then(() => {           
        localStorage.removeItem('token');    
        this.$store.dispatch('emptyUser',{});
        this.$router.push('Login');
      })
    },
  },
  mounted(){
    this.$root.$on('login',()=>{
      this.isLoggedIn = true;
    })
    this.isLoggedIn = !!localStorage.getItem('token');
  },

}
</script>

<style>

</style>