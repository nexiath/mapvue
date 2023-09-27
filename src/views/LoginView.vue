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
      username: 'admin',
      password: 'admin',
      error: null,
    };
    },
    methods: {
      async login() {
        try {
          await axios.post('http://localhost:3000/login', {
            username: this.username,
            password: this.password,
          });
          this.error = null;
          this.$router.push('/');
        } catch (error) {
          this.error = 'Invalid username or password';
        }
      },
    },
  };
  </script>
  