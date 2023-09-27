<template>
  <div>
    <h1>Login</h1>
    <input v-model="username" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="login">Login</button>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      error: null,
    };
  },
  methods: {
      async login() {
          try {
              const response = await axios.post('http://localhost:3000/login', {
                  username: this.username,
                  password: this.password,
              });

              if (response.data.message) {
                  this.$router.push('/');
              } else {
                  this.error = 'Unexpected Error!';
              }

          } catch (error) {
              if (error.response && error.response.data && error.response.data.message) {
                  this.error = error.response.data.message;
              } else {
                  this.error = 'Unexpected Error!';
              }
          }
      },
  },
};
</script>
