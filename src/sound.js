export const sound = {
  sounds: [],

  initSound() {
    this.sounds.push(new Audio(require('./assets/ring.wav')));
    this.sounds.push(new Audio(require('./assets/notification uprising.wav')));
  },

  setRepeat(repeat) {
    for (let sound of this.sounds) {
      sound.loop = repeat;
    }
  },

  play(index, repeat) {
    let counter = 1;
    this.sounds[index].addEventListener('ended', () => {
      this.sounds[index].currentTime = 0;
      if (counter < repeat) {
        this.sounds[index].play();
      }
      counter++;
    }, false);
    this.sounds[index].play();
  },

  pause(index) {
    this.sounds[index].pause();
  }
}
