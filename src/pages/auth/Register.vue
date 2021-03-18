<template>
  <div class="container my-5">
    <div class="row">
      <div
        class="col-sm-4 offset-4 p-5"
        style="
          box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
          border-radius: 10px;
        "
      >
        <h2 class="mb-4">Register Here!</h2>
        <form @submit.prevent="login" @keydown="form.onKeydown($event)">
          <div class="form-group">
            <label>Username</label>
            <input
              v-model="form.username"
              type="text"
              name="username"
              class="form-control"
              :class="{ 'is-invalid': form.errors.has('username') }"
            />
            <has-error :form="form" field="username"></has-error>
          </div>

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

          <div class="form-group">
            <label>Confirm Password</label>
            <input
              v-model="form.password_confirmation"
              type="password"
              name="password_confirmation"
              class="form-control"
              :class="{'is-invalid': form.errors.has('password_confirmation')}"
            />
            <has-error :form="form" field="password_confirmation"></has-error>
          </div>

          <button
            :disabled="form.busy"
            type="submit"
            class="btn btn-primary w-100 mt-2"
          >
            Sign Up
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
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
      }),
    };
  },

  methods: {
    login() {
      // Submit the form via a POST request
      this.form.post("http://127.0.0.1:8000/api/register").then(({ data }) => {
        console.log(data);
      });
    },
  },
};
</script>

<style></style>
