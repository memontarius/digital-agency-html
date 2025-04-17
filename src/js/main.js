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
			$(this).addClass('visible'); 
		} else {
			$(this).removeClass('visible');
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
	let windowWidth = $(window).innerWidth();
	
	let contentWidth = $(marquee).find('.marquee__content').outerWidth();
	let numberOfCopies = Math.ceil(windowWidth / contentWidth) + 1;
	
	$(marquee).css('--contentWidth', contentWidth);
	let marqueCopiedRoot = $(marquee).find('.marquee__copies');
	marqueCopiedRoot.html("");

	let items = $(marquee).find('.marquee__item');

	for (var i = 0; i < numberOfCopies; i++) {
		items.clone().appendTo(marqueCopiedRoot);
	}
}

positionSliderHandler();