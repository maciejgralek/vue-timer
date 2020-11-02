import { ui } from './ui.js'

export const mixin = {
  watch: {
    'state.settings.fontSize': {
      handler: function () {
        ui.setFontSize(this.$el, this.state.settings.fontSize);
        // ui.setFontSize(this.$refs.timer, this.state.settings.fontSize);
        ui.centerElementVertically(this.$el);
      }
    },
    'state.settings.fontColor': {
      handler: function () {
        ui.setForegroundColor(this.$refs.timer, this.state.settings.fontColor);
      }
    },
    'state.settings.backgroundColor': {
      handler: function () {
        document.body.style.backgroundImage = "";
        ui.setBackgroundColor(document.body, this.state.settings.backgroundColor);
      }
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
        return hours;
      }
      return value;
    }
  }
}
