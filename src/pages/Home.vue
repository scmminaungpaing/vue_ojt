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
        <a href="#" class="btn btn-info ml-2" type="submit"
          ><i class="fas fa-plus"></i
        ></a>
      </div>
      <h3>Latest Post</h3>
      <div v-if="posts">
        <div class="card mb-4" v-for="post in posts.data" :key="post.id">
          <div class="card-header d-flex justify-content-between">
            <div>
              <a href="#">{{ post.title }}</a>
              <small class="text-muted small ml-1"> 10 min</small>
            </div>
            <div class="d-flex">
              <a href="#" class="btn btn-info btn-sm"
                ><i class="fas fa-pencil-alt"></i
              ></a>
              <button class="btn btn-danger btn-sm ml-2">
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
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
    };
  },
  methods: {
    getAllPost(page=1) {
      this.$store.dispatch("getAllPost", page);
    },
  },
  mounted() {
    this.getAllPost();
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