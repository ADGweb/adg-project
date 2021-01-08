const buttonAttribute = document.querySelector('.observers__button_type_attribute');
const buttonElement = document.querySelector('.observers__button_type_element');
const buttonText = document.querySelector('.observers__button_type_text');
const buttonReturn = document.querySelector('.observers__button_type_return');
const testBox = document.querySelector('.observers__test-box');
const information = document.querySelector('.observers__information');
const animationBox = document.querySelector('.observers__animation');
const animationItem = document.querySelector('.observers__animation-item');
const images = document.querySelectorAll('.observers__image');
const firstEl = 0;

let textElements = testBox.childNodes[firstEl];

buttonAttribute.addEventListener('click', () => {
    deleteInformation();

    if (testBox.hasAttribute('style')) {
        testBox.removeAttribute('style');

        return;
    }

    testBox.style.backgroundColor = '#f8f4a0';
})

buttonElement.addEventListener('click', () => {
    const div = document.createElement('div');

    deleteInformation();
    testBox.append(div);
})

buttonText.addEventListener('click', () => {
    deleteInformation();
    testBox.focus();
})

buttonReturn.addEventListener('click', () => {
    deleteInformation();
    mutationObserver.disconnect();
    returnTestBox();
    mutationObserver.observe(testBox, config);
    mutationObserver.observe(textElements, config);
})

let deleteInformation = () => {
    information.innerHTML = '';
}

let returnTestBox = () => {
    testBox.removeAttribute('style');
    [...testBox.querySelectorAll('div')].forEach(div => {
        div.remove();
    })
    testBox.textContent = 'Измени текст';
    textElements = testBox.childNodes[firstEl];
}

// MutationObserver (Наблюдатель за изменениями в DOM)

let addText = (recordqueue) => {
    recordqueue.forEach(mutationRecord => {
        information.textContent = `Tип изменения: ${mutationRecord.type}`
    });
}

let mutationObserver = new MutationObserver(addText);

let config = {
    attributes: true,
    childList: true,
    characterData: true,
}

mutationObserver.observe(testBox, config);
mutationObserver.observe(textElements, config);

// Intersection Observer

// Animation

let addAnimation = (entries, self) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            animationItem.classList.add('observers__animation-start');
            self.disconnect(entry.target);
        }
        console.log(entry.rootBounds);
        console.log(entry.boundingClientRect);
        console.log(entry.intersectionRect);
        console.log(entry.isIntersecting);
        console.log(entry.intersectionRatio);
        console.log(entry.target);
    })
}

const options = {
    root: null, // значение  по дефолту, можно не писать
    rootMargin: '0px 0px -120px 0px',
    threshold: 1
};

let intersictionObserverAnimation = new IntersectionObserver(addAnimation, options);

intersictionObserverAnimation.observe(animationBox);

// Img

let downloadImg = (entries, self) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.src = entry.target.dataset.src
            self.unobserve(entry.target);
        }
    })
}

const downloadImgOptions = {
    rootMargin: '0px 0px -120px 0px',
    threshold: 0
};

let intersictionObserverDownloadImg = new IntersectionObserver(downloadImg, downloadImgOptions);

images.forEach(image => {
    intersictionObserverDownloadImg.observe(image);
});
