export default function () {

	class PositionSlider {
		constructor(slider, list, runner) {
			this.slider = slider;
			this.list = list;
			this.runner = runner;
			this.positionIndex = 0;
			this.initialUpdatePosition();
		}

		initialUpdatePosition() {
			this.positionIndex == 0;
			const viewportCenterY = window.innerHeight / 2;
			while (this.checkAndUpdateNextElement(viewportCenterY)) {
			}
			this.updateElement();
		}

		updatePosition() {
			const viewportCenterY = window.innerHeight / 2;

			if (this.positionIndex > 0) {
				let prevItem = this.list.children[this.positionIndex - 1];
				let prevItemBottom = prevItem.getBoundingClientRect().bottom;

				if (prevItemBottom > viewportCenterY) {
					this.positionIndex -= 1;
					this.updateElement();
				}
			}

			this.checkAndUpdateNextElement(viewportCenterY);
		}

		checkAndUpdateNextElement(viewportCenterY) {
			if (this.positionIndex < this.list.children.length - 1) {
				let nextItem = this.list.children[this.positionIndex + 1];
				let nextItemTop = nextItem.getBoundingClientRect().top;

				if (nextItemTop < viewportCenterY) {
					this.positionIndex += 1;
					this.updateElement();

					return true;
				}
			}

			return false;
		}

		updateElement() {
			let top = this.list.children[this.positionIndex].offsetTop;
			let height = this.list.children[this.positionIndex].offsetHeight;

			this.runner.style.top = `${top}px`;
			this.runner.style.height = `${height}px`;
		}
	}


	let sliderNodes = document.querySelectorAll('.position-slider');

	if (sliderNodes.length > 0) {
		const slders = [];

		sliderNodes.forEach((node) =>{
			let sliderList = node.querySelector('.position-slider__list');
			let sliderRunner = node.querySelector('.position-slider__runner');

			let slider = new PositionSlider(node, sliderList, sliderRunner);
			slders.push(slider);
		});

		document.addEventListener("scroll", (event) => {
			slders.forEach((slider) => slider.updatePosition());
		});

		window.addEventListener("resize", (event) => {
			slders.forEach((slider) => slider.initialUpdatePosition());
		});
	}
}