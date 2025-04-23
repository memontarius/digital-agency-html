export const updateSelectedSnapDisplay = (emblaApi, snapDisplay) => {
  if (snapDisplay === null || snapDisplay === undefined) {
		return;
	}
	
	const updateSnapDisplay = (emblaApi) => {
    const selectedSnap = emblaApi.selectedScrollSnap()
    const snapCount = emblaApi.scrollSnapList().length
    snapDisplay.innerHTML = `<span class="snap-current">${selectedSnap + 1} /</span> ${snapCount}`
  }

  emblaApi.on('select', updateSnapDisplay).on('reInit', updateSnapDisplay)

  updateSnapDisplay(emblaApi)
}
