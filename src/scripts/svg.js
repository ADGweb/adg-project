/* eslint no-magic-numbers: 0 */

const button = document.querySelector('.button');
const hand = document.querySelector('.hand');
const hat = document.querySelector('.hat');
const fake = document.querySelector('.fake');
const real = document.querySelector('.real');

button.addEventListener( 'click', startAnimation );

function startAnimation() {
    button.removeEventListener( 'click', startAnimation );

    hand.classList.add('first-animation');

    setTimeout(secondAnimation, 400);
    setTimeout(hatAnimation, 1000);
    setTimeout(returnSecondAnimation, 2600);
    setTimeout(returnFirstAnimation, 3200);
    setTimeout(reset, 3600);
}

function secondAnimation() {
    real.classList.add('second-animation')
}

function hatAnimation() {
    fake.style.display = "block";
    real.style.display = "none";

    hat.classList.add('hat-animation')
}

function returnSecondAnimation() {
    real.style.display = "block";
    fake.style.display = "none";

    real.style.animationName = 'return-second-animation';
}

function returnFirstAnimation() {
    hand.style.animationName = 'return-first-animation';
}

function reset() {
    fake.removeAttribute('style');
    real.removeAttribute('style');
    hand.removeAttribute('style');

    hand.classList.remove('first-animation');
    real.classList.remove('second-animation');
    hat.classList.remove('hat-animation');

    button.addEventListener( 'click', startAnimation );
}
