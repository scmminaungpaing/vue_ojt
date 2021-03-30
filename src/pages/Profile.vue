<template>
  <div id="about">
    <div class="container mt-4">
      <h2 v-if="user.email === 'admin@example.com'">Hello Admin</h2>

      <div class="row">
        <div class="col-sm-2">
          <img
            src="img/user.png"
            alt="user"
            width="100%"
          />
        </div>
        <div class="col-sm-10 d-flex justify-content-between">
          <div class="px-3 pt-5">
            <h1 class="pb-3">
              <i class="fas fa-user mr-1"></i> Name : {{ user.name}}           
            </h1>
            <h5>
              <i class="fas fa-envelope mr-2"></i>E-mail : {{ user.email}}            
            </h5>
          </div>
          <div>
            <button class="btn btn-danger mr-2">
                <i class="fas fa-ban"></i> Delete Acc!
            </button>
            <button class="btn btn-primary" data-toggle="modal" data-target="#editModal"><i class="fas fa-pencil-alt"></i> Edit Profile</button>
          </div>
        </div>
      </div>
      <div class="pt-5">
        <h5 class="pb-3">
          <i class="fas fa-house-user mr-1"></i>Address : <span v-if="user.address">{{ user.address }}</span> <span v-else>Nothing to Show!</span>
        </h5>
        <h5 class="pb-3">
          <i class="fas fa-phone-square-alt mr-2"></i>Phone : <span v-if="user.phone">{{ user.phone }}</span> <span v-else>00 000-000-0000</span>
        </h5>
        <h5 class="pb-3">
          <i class="fas fa-calendar-alt mr-2"></i>Date of birth : <span v-if="user.dob">{{ user.dob }}</span> <span v-else>00-00-0000</span>
        </h5>
      </div>

      <hr>
      <h3>My Posts</h3>

      <div class="card mb-4" v-for="post in postByUser" :key="post.id">
        <div class="card-header d-flex justify-content-between">
        <div>
          <a href="#">{{ post.title}}</a>
          <small class="text-muted small ml-1">{{ post.created_at }}</small>
        </div>
          <div class="d-flex">
            <a href="#" class="btn btn-secondary btn-sm mr-2" v-if="!post.publish"><i class="fas fa-hourglass-start"></i></a>
            <router-link :to="{name: 'post-edit' , params: { id: post.id, post:post } }" class="btn btn-info btn-sm">
              <i class="fas fa-pencil-alt"></i>
            </router-link>
            <button class="btn btn-danger btn-sm ml-2"><i class="fa fa-times"></i></button>
          </div>
        </div>
        <div class="card-body">
            {{post.description}}
        </div>
      </div>

      <!-- Modal -->
    <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel"><i class="fas fa-user"></i> <b>Edit Profile!</b></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body pt-5 pb-4 px-4">
            <form @submit.prevent="updateProfile(user.id)" @keydown="form.onKeydown($event)">
              <div class="form-group">
                <div class="row">
                  <div class="col-sm-12">
                    <div class="row">
                      <div class="col-sm-3 text-right">
                        <label for="title"><b>Username :</b></label>
                      </div>
                      <div class="col-sm-8">
                        <input
                          v-model="form.name"
                          type="text"
                          name="name"
                          placeholder="Enter username"
                          class="form-control"
                          :class="{ 'is-invalid': form.errors.has('name') }"
                        />
                        <has-error :form="form" field="name"></has-error>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="row">
                  <div class="col-sm-12">
                    <div class="row">
                      <div class="col-sm-3 text-right">
                        <label for="title"><b>E-mail :</b></label>
                      </div>
                      <div class="col-sm-8">
                        <input
                          v-model="form.email"
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                          class="form-control"
                          :class="{ 'is-invalid': form.errors.has('email') }"
                        />
                        <has-error :form="form" field="email"></has-error>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="row">
                  <div class="col-sm-12">
                    <div class="row">
                      <div class="col-sm-3 text-right">
                        <label for="phone"><b>Phone :</b></label>
                      </div>
                      <div class="col-sm-8">
                        <input
                          v-model="form.phone"
                          type="text"
                          name="phone"
                          placeholder="Enter Phone number"
                          class="form-control"
                          :class="{ 'is-invalid': form.errors.has('phone') }"
                        />
                        <has-error :form="form" field="phone"></has-error>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="row">
                  <div class="col-sm-12">
                    <div class="row">
                      <div class="col-sm-3 text-right">
                        <label for="dob"><b>Date of Birth :</b></label>
                      </div>
                      <div class="col-sm-8">
                        <input
                          v-model="form.dob"
                          type="date"
                          name="dob"
                          class="form-control"
                          :class="{ 'is-invalid': form.errors.has('dob') }"
                        />
                        <has-error :form="form" field="dob"></has-error>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="row">
                  <div class="col-sm-12">
                    <div class="row">
                      <div class="col-sm-3 text-right">
                        <label for="address"><b>Address :</b></label>
                      </div>
                      <div class="col-sm-8">
                        <input
                          v-model="form.address"
                          type="text"
                          name="address"
                          placeholder="Enter Address"
                          class="form-control"
                          :class="{ 'is-invalid': form.errors.has('address') }"
                        />
                        <has-error :form="form" field="address"></has-error>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <button :disabled="form.busy" type="submit" class="btn btn-primary w-100 mt-3">
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import {Form} from 'vform';
import $ from 'jquery';
import axios from 'axios';
export default {
  data() {
    return {
      user_id:null,
      isLoggedIn: true,
      address: '',
      postByUser: {},
       // Create a new form instance
      form: new Form({
        name: "",
        email: "",
        porfile: "",
        phone: "",
        dob: "",
        address: "",
      }),
    }
  },
  methods: {
    getUser() {
      this.$store.dispatch("getUser");
    },
    updateProfile(id){
      this.form.put('http://127.0.0.1:8000/api/users/'+id).then( () => {
        $('#editModal').modal('hide');
        this.getUser();
      })
      .catch(errs => {
        console.log(errs);
      })
    },
    getPostUser(id = this.user_id){
      axios.get('http://127.0.0.1:8000/api/userpost/'+ id) . then ( (response) => {
        this.postByUser = response.data;
      })
    }
  },
  mounted() {
    this.getUser();
    this.form.fill(this.user);
    this.user_id = this.user.id;
    this.getPostUser();
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style>
</style>