<template>
  <div class="home">
    <div class="container mt-3">
      <div class="d-flex mb-2">
        <form action="#" class="d-flex w-100">
          <input
            class="form-control mr-sm-2"
            type="search"
            name="search"
            placeholder="Search Post Here..."
            aria-label="Search"
          />
          <button class="btn btn-success" type="submit">
            <i class="fas fa-search"></i>
          </button>
        </form>
        <button v-if="authUser.name != null" class="btn btn-info ml-2" type="submit" data-toggle="modal" data-target="#createModal"
          ><i class="fas fa-plus"></i
        ></button>
      </div>
      <h3>Latest Post</h3>
      <div v-if="posts">
        <div class="card mb-4" v-for="post in posts.data" :key="post.id">
          <div class="card-header d-flex justify-content-between">
            <div>
              <a href="#">{{ post.title }}</a>
              <small class="text-muted small ml-1"> 10 min</small>
            </div>
            <div class="d-flex" v-if="authUser.name == post.user.name">
              <router-link :to="{name: 'post-edit' , params: { id: post.id, post:post } }" class="btn btn-info btn-sm">
                <i class="fas fa-pencil-alt"></i>
              </router-link>
              <button @click="deletePost(post.id)" class="btn btn-danger btn-sm ml-2">
                <i class="fa fa-times"></i>
              </button>
            </div>
          </div>
          <div class="card-body">
            {{ post.description }}
          </div>
          <div class="card-footer">
            <span class="mr-1">Published</span>by :
            <a href="#">{{ post.user.name }}</a>
          </div>
        </div>
      </div>
      <pagination
        :data="posts"
        @pagination-change-page="getAllPost"
      ></pagination>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="createModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Create New Post!</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body pt-5 pb-4 px-4">
            <form @submit.prevent="createPost" @keydown="form.onKeydown($event)">
              <div class="form-group">
                <div class="row">
                  <div class="col-sm-12">
                    <div class="row">
                      <div class="col-sm-4">
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
                      <div class="col-sm-4">
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
              <button :disabled="form.busy" type="submit" class="btn btn-primary w-100">
                Create Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Form from 'vform';
import $ from 'jquery';
import Swal from 'sweetalert2';

export default {
  name: "Home",
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
  methods: {
    getAllPost(page=1) {
      this.$store.dispatch("getAllPost", page);
    },
    createPost(){
      this.form.post('http://127.0.0.1:8000/api/post').then(() =>{
        $('#createModal').modal('hide')
        this.getAllPost();
      })
      .catch(err => {
        console.log(err.data);
      });
    },
    editPost(post){
      this.form.fill(post);
    },
    deletePost(id){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        this.form.delete('http://127.0.0.1:8000/api/post/'+id).then(()=>{
          this.getAllPost();
          if (result.isConfirmed) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        }).catch(() => {
          Swal("Failed!","There was something wrongs.","warning");
        })
      })
    }
  },
  mounted() {
    this.getAllPost();
    this.form.user_id = this.authUser.id;
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    },
    authUser(){
      return this.$store.state.user;
    }
  },
};
</script>

<style scoped>
.card-footer {
  padding: 5px 20px;
  font-size: 12px;
}
</style>