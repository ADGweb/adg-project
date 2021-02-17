const button = document.querySelector('.button');
const link = document.querySelector('.link');

function scroll() {
    link.scrollIntoView({block: 'start', behavior: 'smooth'});
}

button.addEventListener('click', scroll);