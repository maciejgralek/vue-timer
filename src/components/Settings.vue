<template>
  <div id="settings" class="shadow-lg">

    <!-- row time -->

    <div class="form-group row">
      <div class="col-sm-3">
        <label for="inputState" class="col-form-label">
          Timer
        </label>
      </div>
      <div class="col-sm">
        <select 
           v-model="state.timeSet.hours" 
           id="inputState" 
           class="form-control">
          <option value="0" selected>00</option>
          <option v-for="i in 12" :value="i"> {{ i | addZero }} </option>
        </select>
        <small>Hours</small>
      </div>
      <div class="col-sm">
        <select 
           v-model="state.timeSet.minutes" 
           id="inputState" 
           class="form-control">
          <option value="0">00</option>
          <option v-for="i in 59" :value="i"> {{ i | addZero }} </option>
        </select>
        <small>Minutes</small>
      </div>
      <div class="col-sm">
        <select 
           v-model="state.timeSet.seconds" 
           id="inputState" 
           class="form-control">
          <option value="0" selected>00</option>
          <option v-for="i in 59" :value="i"> {{ i | addZero }} </option>
        </select>
        <small>Seconds</small>
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
      </div>
      <div class="col-sm">
        <select class="form-control" v-model="state.settings.soundRepeat">
          <option value="1"> Play once </option>
          <option value="3"> Repeat 3 </option>
          <option value="5"> Repeat 5 </option>
          <option value="0"> Loop </option>
        </select>
      </div>
      <div class="col-sm d-flex justify-content-center">
        <button class="btn btn-primary" @click="playSound">&#9654; Play</button>
      </div>
    </div>

    <!-- row on zero -->

    <div class="form-group row">
      <div class="col-sm-3">
        <label for="inputState" class="col-form-label pt-0">
          On zero
        </label>
      </div>
      <div class="col-sm-9">
        <div class="custom-control custom-radio">
          <input 
             class="custom-control-input" 
             type="radio" 
             id="radio1" 
             value="0" 
             v-model="state.settings.onZeroAction">
          <label class="custom-control-label" for="radio1">
            Do nothing
          </label>
        </div>
        <div class="custom-control custom-radio">
          <input 
             class="custom-control-input"
             type="radio"
             id="radio2"
             value="restart"
             v-model="state.settings.onZeroAction">
          <label class="custom-control-label" for="radio2">
            Restart
          </label>
        </div>
        <div class="custom-control custom-radio">
          <input 
             class="custom-control-input"
             type="radio"
             id="radio3"
             value="restart2" 
             v-model="state.settings.onZeroAction">
          <label class="custom-control-label" for="radio3">
            Restart after...
          </label>
        </div>

        <!-- restart after -->

        <transition name="fade">
        <div class="row mt-3" v-if="state.settings.onZeroAction == 'restart2'">
          <div class="col-sm">
            <select 
               v-model="state.timeRestartAfter.hours" 
               id="inputState" 
               class="form-control">
              <option value="0" selected>00</option>
              <option v-for="i in 12" :value="i"> {{ i | addZero }} </option>
            </select>
            <small>Hours</small>
          </div>
          <div class="col-sm">
            <select 
               v-model="state.timeRestartAfter.minutes" 
               id="inputState" 
               class="form-control">
              <option value="0">00</option>
              <option v-for="i in 59" :value="i"> {{ i | addZero }} </option>
            </select>
            <small>Minutes</small>
          </div>
          <div class="col-sm">
            <select 
               v-model="state.timeRestartAfter.seconds" 
               id="inputState" 
               class="form-control">
              <option value="0" selected>00</option>
              <option v-for="i in 59" :value="i"> {{ i | addZero }} </option>
            </select>
            <small>Seconds</small>
          </div>
        </div>
        </transition>
      </div>
    </div>

    <!-- recent -->

    <div class="form-group row">
      <div class="col-sm-3">
        <label>
          Recently used
        </label>
      </div>
      <div class="col-sm-9">
        <ul class="recent">
          <li v-for="(time, index) in state.recent">
            <a href="" @click.prevent="selectRecent(index)"> 
              {{ time.hours }} : {{ time.minutes }} : {{ time.seconds }} 
            </a>
          </li>
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
  import { sound } from '../sound.js'
  import { cookie } from '../cookie.js'
  import tools from '../tools.js'

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
      }
    },

    computed: {

    },

    updated: function() {
      cookie.setCookie(this.state);
      // let settings = JSON.stringify(this.state);
      // localStorage.setItem('state', settings);
      // console.log(localStorage.getItem('state'));
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
      },

      selectRecent(index) {
        tools.copyObjectProperties(this.state.recent[index], this.state.timeSet);
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
.dot-image {
  background: url("../assets/mountains-thumbnail.jpg");
  background-repeat: no-repeat;
  background-size: cover;
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
