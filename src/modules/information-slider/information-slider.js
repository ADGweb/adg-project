const informationSlider = document.getElementById('information-slider');
const slidesWrapper = document.querySelector('.information-slider__wrapper');
const buttonNext = document.querySelector('.information-slider__button_type_next');
const slides = [...informationSlider.querySelectorAll('.information-slider__slide')];
const buttons = [...document.querySelectorAll('.information-slider__button')];

let styleElem = document.head.appendChild(document.createElement("style"));

const calculateSliderHeight = () => {
    let maxHeight = 0;

    slides.forEach(slide => {
        slide.removeAttribute('style');
        maxHeight = slide.offsetHeight > maxHeight ? slide.offsetHeight : maxHeight;
    })

    slidesWrapper.style.height=`${maxHeight}px`
    styleElem.innerHTML = `.information-slider:before, .information-slider:after{height: ${maxHeight}px}`;
}

document.addEventListener('DOMContentLoaded', calculateSliderHeight);
window.addEventListener( 'resize', calculateSliderHeight);

buttons.forEach(button => {
    button.addEventListener('click', event => {
        controlAnimation();
        changeActiveSlide(event.target);
    })
})

const controlAnimation = () => {
    informationSlider.classList.remove('information-slider_type_with-curtains');
    void informationSlider.offsetWidth;
    informationSlider.classList.add('information-slider_type_with-curtains');
}

const changeActiveSlide = (e) => {
    const activeSlide = slidesWrapper.querySelector('.information-slider__slide_type_active');

    activeSlide.classList.remove('information-slider__slide_type_active');

    if (e === buttonNext) {
        if ( activeSlide === slidesWrapper.lastElementChild ) {
            slidesWrapper.firstElementChild.classList.add('information-slider__slide_type_active');
        } else {
            activeSlide.nextElementSibling.classList.add('information-slider__slide_type_active');
        }
    }
    else {
        if ( activeSlide === slidesWrapper.firstElementChild ) {
            slidesWrapper.lastElementChild.classList.add('information-slider__slide_type_active');
        } else {
            activeSlide.previousElementSibling.classList.add('information-slider__slide_type_active');
        }
    }

    changeActiveLink(informationSlider.querySelector('.information-slider__slide_type_active'));
}

const changeActiveLink = (activeSlide) => {
    const links = [...informationSlider.querySelectorAll('.information-slider__link')]
    const activeLinks = [...activeSlide.querySelectorAll('.information-slider__link')]

    links.forEach(link => {
        link.classList.remove('information-slider__link_type_active');
    })

    activeLinks.forEach(link => {
        link.classList.add('information-slider__link_type_active');
    })
}
