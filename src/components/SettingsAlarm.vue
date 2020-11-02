<template>
  <div id="settings" class="shadow-lg">

    <!-- row time -->

    <div class="form-group row">
      <div class="col-sm-3">
        <label for="inputState" class="col-form-label">
          Alarm
        </label>
      </div>
      <div class="col-sm">
        <select 
           v-model="state.timeAlarm.hours" 
           id="inputState" 
           class="form-control">
          <option v-for="i in 24" :value="i - 1"> {{ i - 1 | formatTimer(state.settings.is24hours) }} </option>
        </select>
        <small>Hour</small>
      </div>
      <div class="col-sm">
        <select 
           v-model="state.timeAlarm.minutes" 
           id="inputState" 
           class="form-control">
          <option value="0">00</option>
          <option v-for="i in 59" :value="i"> {{ i | addZero }} </option>
        </select>
        <small>Minute</small>
      </div>
      <div class="col-sm-2">
        <div class="custom-control custom-checkbox col-form-label" style="vertical-align: middle">
          <input 
             class="custom-control-input"
             type="checkbox"
             id="checkbox2"
             value="restart2" 
             v-model="state.settings.is24hours">
          <label class="custom-control-label" for="checkbox2">
            24 hour
          </label>
        </div>
      </div>

    </div>

    <hr>

    <!-- row sound -->

    <div class="form-group row">
      <div class="col-sm-3">
        <label for="inputState" class="col-form-label">
          Sound
        </label>
      </div>
      <div class="col-sm-4">
        <select 
           id="inputState" 
           class="form-control" 
           v-model="state.settings.soundIndex">
          <option v-for="(sound, index) in sounds" :value="index"> {{ sound }} </option>
        </select>
        <small>Sound</small>
      </div>
      <div class="col-sm">
        <select class="form-control" v-model="state.settings.soundRepeat">
          <option value="1"> Play once </option>
          <option value="3"> Repeat 3 </option>
          <option value="5"> Repeat 5 </option>
          <option value="0"> Loop </option>
        </select>
        <small>Repeat</small>
      </div>
      <div class="col-sm ">
        <button class="btn btn-primary" @click="playSound">&#9654; Play</button>
      </div>
    </div>

    <!-- snooze -->

    <div class="form-group row">
      <div class="col-sm-3">
        <label for="inputState" class="col-form-label pt-0">
          Snooze
        </label>
      </div>
      <div class="col-sm-9">
        <div class="custom-control custom-checkbox">
          <input 
             class="custom-control-input" 
             type="checkbox" 
             id="radio1" 
             value="0" 
             v-model="state.settings.snooze">
          <label class="custom-control-label" for="radio1">
          </label>
        </div>

        <!-- snooze -->

        <transition name="fade">
        <div class="row mt-3" v-if="state.settings.snooze">
          <div class="col-sm-6">
            <select 
               v-model="state.settings.snoozeMinutes" 
               id="inputState" 
               class="form-control">
              <!-- <option value="0" selected>00</option> -->
              <!-- <option v&#45;for="i in 59" :value="i"> {{ i | addZero }} </option> -->
              <option value="3" selected>3 minutes</option>
              <option value="5" selected>5 minutes</option>
              <option value="10" selected>10 minutes</option>
              <option value="15" selected>15 minutes</option>
              <option value="20" selected>15 minutes</option>
              <option value="25" selected>15 minutes</option>
              <option value="30" selected>30 minutes</option>
            </select>
            <small>Minutes</small>
          </div>
          <div class="col-sm-6">
            <select 
               v-model="state.settings.snoozeRepeat" 
               id="inputState" 
               class="form-control">
              <option value="1" selected>1 time</option>
              <option value="2" selected>2 times</option>
              <option value="3" selected>3 times</option>
              <option value="4" selected>4 times</option>
              <option value="5" selected>5 times</option>
            </select>
            <small>Repeat</small>
          </div>
        </div>
        </transition>
      </div>
    </div>

    <!-- restart after -->

    <div class="form-group row">
      <div class="col-sm-3">
        <label>
          Recently used
        </label>
      </div>
      <div class="col-sm-9">
        <ul class="recent">
          <li><a href="">30 : 00</a></li>
          <li><a href="">45 : 00</a></li>
          <li><a href="">10 : 00</a></li>
        </ul>
      </div>
    </div>

    <!-- <div class="row"> -->
    <!--  <div class="col&#45;12 d&#45;flex justify&#45;content&#45;end"> -->
    <!--    <button class="btn btn&#45;primary" @click="">Test</button> -->
    <!--  </div> -->
    <!-- </div> -->

  </div>
</template>

<script>
  import { store } from '../store'
  import { mixin } from '../mixin.js';
  import { sound } from '../sound.js';
  import { cookie } from '../cookie.js';

  export default {
    components: {

    },

    data() {
      return {
        state: store.state,
        sounds: [],
        showAdvanced: false
      }
    },

    filters: {
      addZero(value) {
        let str = value.toString();
        if (str.length == 1) {
          return "0" + str;
        }

        return str;
      },
      formatTimer(value, format) {
        if (!format) {
          let hours = value % 12;
          hours = hours ? hours : 12;
          hours = value >= 12 ? hours + " PM" : hours + " AM";
          return hours;
        }
        return value;
      }
    },

    computed: {

    },

    updated: function() {
      cookie.setCookie(this.state);
    },

    methods: {
      setBackgroundColor(e) {
        let color = e.target.dataset.color;
        this.state.settings.backgroundColor = color;
      },

      setFontColor(e) {
        let color = e.target.dataset.color;
        this.state.settings.fontColor = color;
      },

      setFontSize(e) {
        this.state.settingsFontSize = e.target.value;

      },

      setSize(value) {
        this.state.settings.fontSize += value;
      },

      setBackgroundImage(e) {
        let imageName = e.target.dataset.imageName;
        document.body.style.backgroundSize = "100% 100%";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundImage = 
          "url(" + require("../assets/" + imageName) +")"
      },

      playSound() {
        sound.play(this.state.settings.soundIndex, this.state.settings.soundRepeat);
      }
    },

    mounted: function() {
      store.config.sounds.forEach((item, index) => {
        this.$set(this.sounds, index, item);
      })
    }
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat');
@import url('https://fonts.googleapis.com/css?family=Aldrich');

.dot {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: inline-block;
  box-shadow: 2px 2px 8px 0px rgba(0,0,0,0.3);
}
.dot:hover {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: inline-block;
  cursor: pointer;
}
.recent {
  list-style: none;
  padding-left: 0;
}
.dot-gold {
  background-color: gold;
}
.dot-lightgreen {
  background-color: lightgreen;
}
.dot-lightblue {
  background-color: lightblue;
}
.dot-light {
  background-color: white;
}
.dot-dark {
  background-color: black;
}
.dot-gray {
  background-color: gray;
}
.transparent {
  opacity: 0.5;
}
#settings {
  background-color: rgba(255,255,255,0.9);
  padding-right: 2em;
  padding-left: 2em;
  padding-bottom: 1em;
  padding-top: 2em;
  border-radius: 5px;
}
.bg-red {
  background-color: red;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .20s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
