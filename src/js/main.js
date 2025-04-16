import '../scss/style.scss';
import $ from 'jquery';
import EmblaCarousel from 'embla-carousel';
import { addDotBtnsAndClickHandlers } from './addDotBtnsAndClickHandlers';
import positionSliderHandler from './positionSliderHandler';

$(window).ready(function () {
	$('.marquee').each(function (index) {
		setMarqueeContents(this);
	});
});

$(window).resize(function () {
	/*
	$('.marquee').each(function (index) {
		if ($(this).hasClass('visible')) {
			setMarqueeContents(this);
		}
	});*/
});

const emblaNodes = document.querySelectorAll('.embla')

if (emblaNodes) {
	const options = { loop: false }

	emblaNodes.forEach((node) => {
		const dotsNode = node.querySelector('.embla__dots')
		const emblaApi = EmblaCarousel(node, options);
		
		const removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(
			emblaApi,
			dotsNode
		);

		emblaApi.on('destroy', removeDotBtnsAndClickHandlers);
	});
}

$(window).on('scroll', function () {
	$('.marquee').each(function () {
		if (isElementInViewport(this)) {
			if (!$(this).hasClass('visible')) {
				setMarqueeContents(this);
			}
			$(this).addClass('visible');  // Можно добавить класс для стилизации
		} else {
			$(this).removeClass('visible');  // Убираем класс, если элемент скрыт
		}
	});
});


function isElementInViewport(el) {
	const rect = el.getBoundingClientRect();
	return (
		rect.top < window.innerHeight &&
		rect.left < window.innerWidth &&
		rect.bottom > 0 &&
		rect.right > 0
	);
}

function setMarqueeContents(marquee) {
	let windowWidth = $(window).innerWidth(); // Width of the window
	let textWidth = $(marquee).find('.marquee__content > .marquee__item').outerWidth(); // Width of the text
	let numberOfCopies = Math.ceil(windowWidth / textWidth) + 1; // enough copies to fill the window plus one
	
	$(marquee).css('--textWidth', textWidth); // Assign the text width as a CSS variable to compute the animation
	let marqueCopiedRoot = $(marquee).find('.marquee__copies');
	marqueCopiedRoot.html(""); // Clear the marquee copies container

	for (var i = 0; i < numberOfCopies; i++) { // Fill the copies container with extra copies of the text
		$(marquee).find('.marquee__content > .marquee__item').clone().appendTo(marqueCopiedRoot);
	}
}

positionSliderHandler();