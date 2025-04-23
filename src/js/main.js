import '../scss/style.scss';
import $ from 'jquery';
import EmblaCarousel from 'embla-carousel';
import { addDotBtnsAndClickHandlers } from './AddDotBtnsAndClickHandlers';
import positionSliderHandler from './PositionSliderHandler';
import { updateSelectedSnapDisplay } from './EmblaCarouselSelectedSnapDisplay';


$(window).ready(function () {
	$('.marquee').each(function (index) {
		setMarqueeContents(this);
	});
});

function createEmblaCarusel(node) {
	const dotsNode = node.querySelector('.embla__dots');
	const snapDisplayNode = node.querySelector('.embla__selected-snap-display')

	const embla = EmblaCarousel(node, {
		loop: false,
		align: 'start'
	});

	const links = node.querySelectorAll('a');
	embla.on('pointerDown', () => {
		node.classList.add('is-dragging');

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

	function toggleDotsVisibility() {
		const canScroll = embla.canScrollNext() || embla.canScrollPrev();
		dotsNode.style.display = canScroll ? 'flex' : 'none';
	}
	
	embla.on('select', toggleDotsVisibility);
	embla.on('init', toggleDotsVisibility);
	embla.on('resize', toggleDotsVisibility);

	updateSelectedSnapDisplay(embla, snapDisplayNode);

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

createEmblaCarusel(document.querySelector('.articles .embla'));

$(window).resize(function () {
	if (window.innerWidth < breakpointMobile && commonServiceEmblaCarousel != null) {
		commonServiceEmblaCarousel.destroy();
		commonServiceEmblaCarousel = null;
	}
	else if (window.innerWidth > breakpointMobile && commonServiceEmblaCarousel == null) {
		commonServiceEmblaCarousel = createEmblaCarusel(commonServiceEmblaCarouselNode)
	}
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