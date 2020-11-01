export const store = {
	debug: false,
	config: {
		fontSizeMin: 80,
		fontSizeMax: 200,
		sounds: ["Ring", "Notification uprising"]
	},
	state: {
		showSettings: false,
		settings: {
			onZeroAction: 0,
			soundIndex: 0,
			soundRepeat: true,
			is24hours: false,
			snooze: false,
			snoozeMinutes: 5,
			snoozeRepeat: 2,
			fontSize: 120,
			fontColor: "black",
			backgroundColor: "light",
			backgroundImage: "mountains.jpg"
		},
		alarmActive: false,
		recent: [],
		recentAlarm: [],
		timeSet: {
			hours: 0,
			minutes: 30,
			seconds: 0
		},
		timeAlarm: {
			hours: 2,
			minutes: 30,
			seconds: 0,
		},
		timeRestartAfter: {
			hours: 0,
			minutes: 0,
			seconds: 2
		}
	}
};
