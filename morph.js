{
	class MorphingBG {
		constructor(el, rocketel = null) {
			this.DOM = {};
			this.DOM.el = el;
			this.DOM.rocketel = rocketel;
			this.DOM.el.style.opacity = 0;
			this.DOM.el.style.transition = 'transform 2s ease-out';
			this.DOM.pathEl = this.DOM.el.querySelector('path');
			this.paths = this.DOM.pathEl.getAttribute('pathdata:id').split(';')
			this.paths.splice(this.paths.length, 0, this.DOM.pathEl.getAttribute('d'));
			this.animate();
			this.initEvents();
		}
		animate() {
			anime.remove(this.DOM.pathEl);
			anime.remove(this.DOM.rocketel);
			// vibrating rocket
			anime({
				targets: this.DOM.rocketel,
				translateX: ['-.25rem', '.25rem'],
				translateY: ['.05rem', '-.05rem'],
				duration: 300,
				direction: 'alternate',
				loop: true,
				easing: 'linear',
			});
			// transition in
			anime({
				targets: this.DOM.el,
				duration: 500,
				easing: 'linear',
				opacity: [0, 1]
			});
			// morphing space clip path
			anime({
				targets: this.DOM.pathEl,
				duration: 7000,
				easing: [0.5, 0, 0.8, 1],
				d: this.paths,
				loop: true
			});
		}
		initEvents() {
			const onLoadFn = (ev) => {
				requestAnimationFrame(() => {
					if (!this.started) {
						this.started = true;
						anime({
							targets: this.DOM.el,
							duration: 1000,
							easing: 'linear',
							opacity: [0, 1]
						});
					}
				});
			};
			//TODO: Expand space on mouse hover 
			//document.addEventListener('mouseover', onLoadFn);
		}
	};

	new MorphingBG(document.querySelector('svg.scene'), document.querySelector('text.rocket'));
};