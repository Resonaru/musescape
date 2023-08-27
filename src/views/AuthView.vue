<template>
  <div>
    <auth-form></auth-form>
  </div>
</template>


<script>
import AuthForm from '../components/AuthForm.vue'
export default {
  data() {
    return {
      register: false,
      credentials: {
        email: '',
        password: ''
      }
    };
  },
  components:{
    AuthForm,
  },
  computed: {
    formTitle() {
      return this.register ? 'Register' : 'Login';
    }
  },
  methods: {
    onSubmit() {
      if (!this.credentials.email || !this.credentials.password) {
        alert('Please enter email and password');
        return;
      }
      if (this.register) {
        this.$store.dispatch('auth/registerUser', this.credentials);
      } else {
        this.$store.dispatch('auth/loginUser', this.credentials);
      }
    }
  }
};
</script>