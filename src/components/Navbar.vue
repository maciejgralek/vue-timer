<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
      <span class="navbar-toggler-icon"></span>
    </button>
<router-link to="/timer" class="ml-2">
  Timer
</router-link>
<router-link to="/alarm" class="ml-2">
  Alarm clock
</router-link>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
    </div>
  </nav>
</template>

<script>
  import { store } from '../store.js'

  export default {
    data: function() {
      return {
        user: {
          email: "fasd@fds.fadsf",
          password: "",
          state: store.state
        }
      };
    },

    computed: {
    },

    methods:{
      submitLogin() {
        this.$emit("login-submit", this.user);
      },

      setFontSize(size) {
        let fontSize = this.state.settings.fontSize + 20 * size;
        if (fontSize > store.config.fontSizeMax) {
          fontSize = store.config.fontSizeMax;
        }
        if (fontSize < store.config.fontSizeMin) {
          fontSize = store.config.fontSizeMin;
        }

        this.state.settings.fontSize = fontSize;
      }
    },

    mounted: function() {
    }
  }
</script>

<style>
.dropdown {
  margin-left: auto;
}
.icon {
  font-weight: bold;
  /* font-size: 1.2em; */
}
.icon:hover {
  text-decoration: none;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .20s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
        
</style>
