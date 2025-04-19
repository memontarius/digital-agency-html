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

function createEmblaCarusel(node) {
	const dotsNode = node.querySelector('.embla__dots');

	const embla = EmblaCarousel(node, {
		loop: false,
		align: 'start'
	});

	const links = node.querySelectorAll('a');
	embla.on('pointerDown', () => {
		node.classList.add('is-dragging');
	
		// Отключим кликабельность ссылок при перетаскивании
		links.forEach(link => {
			link.style.pointerEvents = 'none';
		});
	});
	
	embla.on('pointerUp', () => {
		node.classList.remove('is-dragging');
	
		links.forEach(link => {
			link.style.pointerEvents = '';
		});
	});

	const removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(
		embla,
		dotsNode
	);

	embla.on('destroy', removeDotBtnsAndClickHandlers);
	return embla;
}

document.querySelectorAll('.service-card .embla').forEach(createEmblaCarusel);


let commonServiceEmblaCarouselNode = document.querySelector('.common-services .embla');
let commonServiceEmblaCarousel = null;

const rootStyles = getComputedStyle(document.documentElement);
const breakpointTable = parseFloat(rootStyles.getPropertyValue('--table-breakpoint').trim());
const breakpointMobile = parseFloat(rootStyles.getPropertyValue('--mobile-breakpoint').trim());

if (window.innerWidth > breakpointMobile) {
	commonServiceEmblaCarousel = createEmblaCarusel(commonServiceEmblaCarouselNode);
}

$(window).resize(function () {
	if (window.innerWidth < breakpointMobile && commonServiceEmblaCarousel != null) {
		commonServiceEmblaCarousel.destroy();
		commonServiceEmblaCarousel = null;
	}
	else if (window.innerWidth > breakpointMobile && commonServiceEmblaCarousel == null) {
		commonServiceEmblaCarousel = createEmblaCarusel(commonServiceEmblaCarouselNode)
	}
});

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