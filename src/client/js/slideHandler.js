function picSlide (elem, n) {
    let thisDiv = elem.parentNode.parentNode.id;
    let thisDivNum = thisDiv.slice(thisDiv.length -1);
    const slides = document.querySelector(`#${thisDiv}`).querySelectorAll('.slide-pic');
    let picPosition = picPositionArray[thisDivNum];
    if (n == 1) {
        if (picPosition < slides.length - 1) {
            slides[picPosition].style.display = 'none';
            slides[picPosition + 1].style.display = 'block';
            picPositionArray[thisDivNum] += 1;
        } else {
            slides[picPosition].style.display = 'none';
            slides[0].style.display = 'block';
            picPositionArray[thisDivNum] = 0;
        }
    }
    if (n == -1) {
        if (picPosition < 1) {
            slides[picPosition].style.display = 'none';
            slides[slides.length-1].style.display = 'block';
            picPositionArray[thisDivNum] = slides.length-1;
        } else {
            slides[picPosition].style.display = 'none';
            slides[picPosition - 1].style.display = 'block';
            picPositionArray[thisDivNum] -= 1;
        }
    }
}

export { picSlide }