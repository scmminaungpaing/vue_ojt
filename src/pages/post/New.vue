<template>
  <div id="new" class="container mt-5">
    <div class="d-flex justify-content-between mb-4">
      <h3>Create New Post</h3>
      <router-link to="/" class="btn btn-secondary btn-sm py-2 px-3"
        ><i class="fas fa-caret-left"></i> Back</router-link
      >
    </div>
    <form @submit.prevent="createPost" @keydown="form.onKeydown($event)">
      <div class="form-group">
        <div class="row">
          <div class="col-sm-12">
            <div class="row">
              <div class="col-sm-2">
                <label for="title">Post Title :</label>
              </div>
              <div class="col-sm-8">
                <input
                  v-model="form.title"
                  type="text"
                  name="title"
                  placeholder="Enter Post title"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('title') }"
                />
                <has-error :form="form" field="title"></has-error>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="row">
          <div class="col-sm-12">
            <div class="row">
              <div class="col-sm-2">
                <label for="decription">Post Description :</label>
              </div>
              <div class="col-sm-8">
                <textarea
                  v-model="form.description"
                  name="description"
                  class="form-control"
                  placeholder="Enter post description" 
                  :class="{ 'is-invalid': form.errors.has('description') }"
                ></textarea>
                <has-error :form="form" field="description"></has-error>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group form-check">
        <input
          type="checkbox"
          v-model="form.publish"
          class="form-check-input"
          id="exampleCheck1"   
        />
        <label class="form-check-label" for="exampleCheck1">Publish</label>
      </div>
      <input type="hidden" :value="form.user_id" name="user_id" />
      <button :disabled="form.busy" type="submit" class="btn btn-primary">
        Create Post
      </button>
    </form>
  </div>
</template>

<script>
import Form from 'vform';
export default {
  data() {
    return {
      // Create a new form instance
      form: new Form({
        title: "",
        description: "",
        publish: true,
        user_id: "",
      }),
    };
  },
  methods:{
    createPost(){
      this.form.post('http://127.0.0.1:8000/api/post').then(() =>{
        this.$router.push('/');
     });
    }
  },
  mounted(){
    this.form.user_id = this.authUser.id;
  },
  computed:{
    authUser(){
      return this.$store.state.user;
    }
  }
};
</script>

<style>
</style>