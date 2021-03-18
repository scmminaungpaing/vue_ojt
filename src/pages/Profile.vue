<template>
  <div id="about">
    <div class="container">
      <div class="alert alert-success">This is a sweet success message</div>
      <h1>This is profile page</h1>
      <h2>Name: {{user.name}}</h2>
      <h2>Name: {{user.email}}</h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: true,
    }
  },
  methods:{
    getUser(){
      this.$store.dispatch("getUser");
    }
  },
  mounted(){
   this.getUser()
  },
  computed:{
    user(){
      return this.$store.state.user;
    }
  }
}
</script>

<style>

</style>