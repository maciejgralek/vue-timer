export const sound = {
	sounds: [],
	currentSound: 0,

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
		// this.sounds[index].play();
		let counter = 1;
		this.sounds[index].addEventListener('ended', () => {
			this.sounds[index].currentTime = 0;
			if (counter < repeat) {
				this.sounds[index].play();
			}
			counter++;
		}, false);
		this.sounds[index].play();
		console.log(this.sounds);
	},

	pause(index) {
		this.sounds[index].pause();
	},

	playOnce(index) {
		let loop = this.sounds[index].loop;
		this.sounds[index].loop = false;
		console.log(loop, this.sounds[index].loop);
		this.play(index);
		this.sounds[index].loop = loop;
	}
}
