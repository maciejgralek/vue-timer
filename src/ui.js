export const ui = {
	setForegroundColor(el, color) {
		el.style.color = color;
	},

	setBackgroundColor(el, color) {
		el.style.backgroundColor = color;
	},

	setFontSize(el, size) {
			el.style.fontSize = size+"px";
	},

	centerElementVertically(el) {
				el.style.marginTop = (document.documentElement.clientHeight/2 - 
					el.clientHeight/2)+"px"
	}
}
