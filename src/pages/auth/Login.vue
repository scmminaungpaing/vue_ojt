<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-sm-4 offset-4 p-5" style="box-shadow:0px 10px 20px rgba(0,0,0,.15);border-radius:10px;"> 
        <h2 class="mb-4">Login Here!</h2>
        <form @submit.prevent="login" @keydown="form.onKeydown($event)">
          <div class="form-group">
            <label>Email Address</label>
            <input
              v-model="form.email"
              type="email"
              name="email"
              class="form-control"
              :class="{ 'is-invalid': form.errors.has('email') }"
            />
            <has-error :form="form" field="email"></has-error>
          </div>

          <div class="form-group">
            <label>Password</label>
            <input
              v-model="form.password"
              type="password"
              name="password"
              class="form-control"
              :class="{ 'is-invalid': form.errors.has('password') }"
            />
            <has-error :form="form" field="password"></has-error>
          </div>

          <button :disabled="form.busy" type="submit" class="btn btn-primary w-100">
            Log In
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {Form} from 'vform';
export default {
  data() {
    return {
      // Create a new form instance
      form: new Form({
        email: "",
        password: "",
      }),
    };
  },

  methods: {
    login(){
      this.$root.$emit('login',true);
      this.form.post('http://127.0.0.1:8000/api/login').then((response)=>{
          localStorage.setItem("token",response.data);
          this.$router.push('/profile');
      }).catch((error)=>{
          console.log(error.data)
      })
    }
  },
};
</script>

<style></style>
