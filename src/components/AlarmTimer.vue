<template>
  <div class="TimerContainer">
    <div ref="timer" class="timer text-center" >
      {{ time.hours | formatTimer(state.settings.is24hours) | addZero }} : 
      {{ time.minutes | addZero }} : 
      {{ time.seconds | addZero }}
      <small v-if="!state.settings.is24hours"> 
        PM
      </small>
      <div style="font-size: 0.5em; font-weight: normal">
        <!-- <div class="timer&#45;alarm"> -->
        <!--  Alarm  -->
        <!-- </div> -->
        <span>
          ALARM 
          <transition name="fade" mode="out-in">
            <span key="alarm-on" v-if="state.alarmActive">ON</span>
            <span key="alarm-off" v-else>OFF</span>
          </transition>
          <span class="ml-5">
            {{ state.timeAlarm.hours | formatTimer(state.settings.is24hours) | addZero }} : 
            {{ state.timeAlarm.minutes | addZero }} : 
            {{ state.timeAlarm.seconds | addZero }}
          </span>
        </span>
        <small v-if="!state.settings.is24hours">
          PM
        </small>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <div class="btn-group" role="group" aria-label="Basic example">
        <button 
         type="button" 
         class="btn btn-secondary active mt-4 d-flex" 
         :class="{ 'btn-success': state.alarmActive }"
         @click.prevent="state.alarmActive = !state.alarmActive">
            <img src="../assets/power-off-solid.svg" alt="" width="20">
      </button>
      <button 
         type="button" 
         class="btn btn-secondary mt-4" 
         @click.prevent="state.showSettings = !state.showSettings">
        Settings
      </button>
      <!-- <button  -->
      <!--   type="button"  -->
      <!--   class="btn btn&#45;secondary mt&#45;4"  -->
      <!--   @click.prevent="alarm"> -->
      <!--  Settings -->
      <!-- </button> -->
      </div>
    </div>

    <alarm-modal 
         id="alarmModal" 
         @pause-sound="stopAlarm" />

  </div>
</template>

<script>
  import AlarmModal from './AlarmModal.vue'
  import { mixin } from '../mixin.js'
  import { store } from '../store.js'

  import tools from '../tools.js'
  import { ui } from '../ui.js'
  import { sound } from '../sound.js'
  import { timer } from '../timer.js'
  import $ from 'jquery';

  export default {
    mixins: [mixin],

    components: {
      AlarmModal
    },

    data() {
      return {
        time: {
          hours: 0,
          minutes: 0,
          seconds: 0,
          format: null
        },
        timeToRestart: {
          hours: 0,
          minutes: 0,
          seconds: 0,
        },
        
        interval: null,
        intervalRestart: null,
        state: store.state,
        snoozeCounter: 0
      }
    },

    methods: {
      alarm() {
        if (this.state.alarmActive) {
          sound.play(this.state.settings.soundIndex, this.state.settings.soundRepeat);
          $('#alarmModal').modal('show');
          if (this.state.settings.snooze && this.snoozeCounter) {
            setTimeout(() => {
              this.snoozeCounter -= 1;
              this.alarm();
            }, this.state.settings.snoozeMinutes * 60 * 1000)
          }
        }
      },
      
      stopAlarm() {
        sound.pause(this.state.settings.soundIndex);
        this.state.timeSet.enabled = false;
      },

      pauseSound() {
        sound.pause(this.state.settings.soundIndex);
      },

      addRecent() {
        for (let recentItem of this.state.recentAlarm) {
          if (recentItem.hours == this.state.timeSet.hours &&
            recentItem.minutes == this.state.timeSet.minutes &&
            recentItem.seconds == this.state.timeSet.seconds)
            return;
        }
        let index = this.state.recentAlarm.length;
        if (index > 2) {
          this.state.recentAlarm.shift();
          index = 2;
        }
        let time = {
          hours: this.$options.filters.addZero(this.state.timeSet.hours),
          minutes: this.$options.filters.addZero(this.state.timeSet.minutes),
          seconds: this.$options.filters.addZero(this.state.timeSet.seconds)
        } 
        this.$set(this.state.recent, index, time);
      }
    },

    watch: {
      'state.settings.snoozeRepeat':{
        handler: function () {
          this.snoozeCounter = this.state.settings.snoozeRepeat;
        }
      }
    },
    
    mounted: function() {
      ui.setForegroundColor(this.$refs.timer, this.state.settings.fontColor);
      ui.setBackgroundColor(document.body, this.state.settings.backgroundColor);
      ui.setFontSize(this.$refs.timer, this.state.settings.fontSize);
      ui.centerElementVertically(this.$el);
      sound.initSound();

      this.interval = timer.createClock(this.time, this.state.timeAlarm, this.alarm);
      this.state.timeSet.enabled = true;

      window.addEventListener('resize', () => ui.centerElementVertically(this.$el));
    }
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat');
@import url('https://fonts.googleapis.com/css?family=Aldrich');
@font-face { font-family: Digital; src: url('../assets/LiquidCrystal-Bold.otf'); } 
</style>
