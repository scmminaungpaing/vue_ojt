import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts:{},
    user:{},
  },
  mutations: {
    SET_POSTS(state, posts){
      state.posts = posts
    },
    SET_USER(state, user){
      state.user = user
    }
  },
  actions: {
    getAllPost({commit},page){
      axios.get('http://127.0.0.1:8000/api/post?page=' + page)
        .then(response => {
            commit('SET_POSTS', response.data);
        }).catch(error => {
          console.log(error.data);
        });
    },
    getUser({commit}){
      axios.get('http://127.0.0.1:8000/api/user').then((response) => {
        commit('SET_USER', response.data);
      }).catch(error => {
        console.log(error.data);
      });
    }
  },
  getters: {
  }
})
