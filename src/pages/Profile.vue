<template>
  <div id="about">
    <div class="container mt-4">
      <h2 v-if="user.email === 'admin@example.com'">Fuck Admin</h2>

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
            <a href="#" class="btn btn-primary"><i class="fas fa-pencil-alt"></i> Edit Profile</a>
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: true,
    };
  },
  methods: {
    getUser() {
      this.$store.dispatch("getUser");
    },
  },
  mounted() {
    this.getUser();
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