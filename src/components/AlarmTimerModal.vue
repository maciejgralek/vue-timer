<template>
  <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body text-center">
          <h2>
            Alarm
          </h2>
          <!-- <div v&#45;if="this.state.settings.onZeroAction == 'restart2'"> -->
          <!--  <span v&#45;if="time.hours"> {{ time.hours | addZero }} : </span>  -->
          <!--  {{ time.minutes | addZero }} : {{ time.seconds | addZero }} -->
          <!-- </div> -->
        </div>
        <div class="modal-footer">
          <button 
            type="button" 
            class="btn btn-secondary" 
            data-dismiss="modal" 
            @click="$emit('pause-sound')">
            Restart
          </button>
          <button 
            type="button" 
            class="btn btn-secondary" 
            data-dismiss="modal" 
            @click="$emit('pause-sound')">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { store } from '../store.js'

  import tools from '../tools.js';
  import { sound } from '../sound.js'
  import $ from 'jquery';
  import { timer } from '../timer.js'

  export default {
    components: {

    },

    data() {
      return {
        state: store.state
      }
    },

    filters: {
      addZero(value) {
        let str = value.toString();
        if (str.length == 1) {
          return "0" + str;
        }

        return str;
      }
    },

    watch: {
      'state.timeRestartAfter':{
        handler: function () {
          // tools.copyObjectProperties(this.state.timeRestartAfter, this.time);
        },
        deep: true
      }
    },

    mounted: function() {
      
    }
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat');
@import url('https://fonts.googleapis.com/css?family=Aldrich');
@font-face { font-family: Digital; src: url('../assets/LiquidCrystal-Bold.otf'); } 

/* .timer { */
/*  font-weight: bold; */
/*  font-family: 'Aldrich', sans-serif; */
/* } */
</style>
