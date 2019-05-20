import ClipPath from './clip-path.polyfill';
import isChrome from './browser-validation';

const sliderControlsContainer = document.querySelector('.hero__slider-controls');
const sliderControls = document.querySelectorAll('.hero__slider-button');
const slides = document.querySelectorAll('.hero__slide');
const hero = document.querySelector('.hero');

if (!isChrome()) {
  console.log('not chrome', ClipPath && true);
  
  ClipPath('.hero__slide-img');
}

sliderControlsContainer.addEventListener('click', event => {
  const element = event.target; 
  if (element.matches('.hero__slider-button') && !element.matches('.js-active')) {
    removeSliderControlsActiveState();
    setActiveSlide();
    element.classList.add('js-active');
  }
});

const removeSliderControlsActiveState = () => {
  sliderControls.forEach((sliderControl) => {
    sliderControl.classList.remove('js-active');
  });
}

const setActiveSlide = () => {
  slides.forEach(slide => {
    slide.matches('.js-active')
      ? slide.classList.remove('js-active')
      : slide.classList.add('js-active');
  });

  hero.classList.contains('hero--alternate')
      ? hero.classList.remove('hero--alternate')
      : hero.classList.add('hero--alternate');
}

const updateShareCount = (network, value) => {
  const box = document.querySelector(`.shared-count__box--${network}`);
  const count = box.querySelector('.shared-count__box-count');

  count.innerHTML = value;
}

fetch('https://api.sharedcount.com/v1.0/?url=https://makingsense.com&apikey=ec99452c1504d1492a830532ae403f4c6e65ef51')
  .then(function(response) {
    return response.json();
  })
  .then(function(networks) {
    updateShareCount('facebook', networks.Facebook.total_count);
    /* Intentionally using facebook data because other networks were not availabe */
    updateShareCount('instagram', networks.Facebook.reaction_count);
    updateShareCount('twitter', networks.Facebook.share_count);
    updateShareCount('linkedin', networks.Facebook.comment_count);
  });