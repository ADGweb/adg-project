/* eslint no-magic-numbers: 0 */

const button = document.querySelector('.main__button-view');
const blockSlider = document.querySelector('.main__section_type_information-slider');
const svg = document.querySelector('.main__welcome-svg');
const hand = document.querySelector('.main__svg-hand');
const hat = document.querySelector('.main__svg-hat');
const fake = document.querySelector('.main__svg-fake');
const real = document.querySelector('.main__svg-real');

const scrollToSlider = () => {
    blockSlider.scrollIntoView({block: 'start', behavior: 'smooth'});
}

const startAnimation = (entries, self) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            hand.classList.add('main__svg-hand_type_first-animation');
            setTimeout(secondAnimation, 400);
            setTimeout(hatAnimation, 1000);
            setTimeout(returnSecondAnimation, 2600);
            setTimeout(returnFirstAnimation, 3200);
            self.disconnect(entry.target);
        }
    })
}

const secondAnimation = () => {
    real.classList.add('main__svg-hand_type_second-animation')
}

const hatAnimation = () => {
    fake.style.display = "block";
    real.style.display = "none";

    hat.classList.add('main__svg-hat_type_animation')
}

const returnSecondAnimation = () => {
    real.style.display = "block";
    fake.style.display = "none";

    real.style.animationName = 'return-second-animation';
}

const returnFirstAnimation = () => {
    hand.style.animationName = 'return-first-animation';
}

const options = {
    rootMargin: '0px 0px -60px 0px',
    threshold: 1
};

const intersictionObserver = new IntersectionObserver(startAnimation, options);

intersictionObserver.observe(svg);

button.addEventListener('click', scrollToSlider);
