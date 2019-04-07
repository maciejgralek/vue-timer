export const timer = {

	createTimer(timer, callback) {
		let timeStart = Math.trunc(new Date().getTime() / 1000);
		let delta = (timer.hours * 60 * 60) +
			(timer.minutes * 60) + timer.seconds;
		return setInterval(function() {
			let time = Math.trunc(new Date().getTime() / 1000);
			timer.hours = Math.trunc((delta-(time - timeStart)) / 60 / 60) % 60;
			timer.minutes = Math.trunc((delta-(time - timeStart)) / 60) % 60;
			timer.seconds = ((delta-(time - timeStart)) % 60);

			if (!timer.hours && !timer.minutes && !timer.seconds) {
				callback();
			}
		}, 1000)
	},

	createTimerPromise(timer) {
		let timeStart = Math.trunc(new Date().getTime() / 1000);
		let delta = (timer.hours * 60 * 60) +
			(timer.minutes * 60) + timer.seconds;
		return new Promise ((resolve, reject) => { 
			setInterval(function() {
				let time = Math.trunc(new Date().getTime() / 1000);
				timer.hours = Math.trunc((delta-(time - timeStart)) / 60 / 60) % 60;
				timer.minutes = Math.trunc((delta-(time - timeStart)) / 60) % 60;
				timer.seconds = ((delta-(time - timeStart)) % 60);

				if (!timer.hours && !timer.minutes && !timer.seconds) {
					resolve();
				}
			}, 1000)
		})
	},

	stopTimer(id) {
		clearInterval(id);
	}
}
