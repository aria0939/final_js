'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const navLinks = document.querySelectorAll('nav a');


const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.slider__btn--left');
const nextBtn = document.querySelector('.slider__btn--right');
const dots = document.querySelector('.dots');

///////////////////////////////////////
// Modal window

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////////////////////////
// Button Scrolling

btnScroll.addEventListener('click', function(e){
  e.preventDefault();

  section1.scrollIntoView(
    {
      behavior: 'smooth'
});
});


//////////////////////////////////////////////
// Page Navigation (Smooth scroll to sections)

navLinks.forEach(navLink => {
  navLink.addEventListener('click', function(e){
    e.preventDefault();

    const targetId = this.getAttribute('href'); 
    const target = document.querySelector(targetId);

    // smoothly scroll code
    target.scrollIntoView({
      behavior: 'smooth'
    });
  });
});

//////////////////////////////////////////////
// Tabbed Component

tabs.forEach(function(tab, index){
  tab.addEventListener('click', function(){
    // تمام تب های دیگر را غیرفعال می کند
    tabs.forEach(function(tab){
      tab.classList.remove('operations__tab--active');
    })

    tabsContent.forEach(function(content) {
      content.classList.remove('operations__content--active')}
    );

    // تب فعلی را فعال می کند
    tabsContent[index].classList.add('operations__content--active');
    tab.classList.add('operations__tab--active');
  });
});



//////////////////////////////////////////////
// Navigation link fadeout animation (opacity)

navLinks.forEach(function(item){
  item.addEventListener('mouseover', function(){
    navLinks.forEach(function(otherItem){
      if (otherItem !== item) {
        otherItem.style.opacity = '0.5';
      }
    });
  });

  item.addEventListener('mouseout', () => {
    navLinks.forEach(otherItem => {
      otherItem.style.opacity = '1';
    });
  });
});


//////////////////////////////////////////////
// Sticky Navigation

const sectionOne = document.querySelector('#section--1');

window.addEventListener('scroll', function(){
 
  if (window.scrollY >= sectionOne.offsetTop) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});


//////////////////////////////////////////
// Reveal Sections

const sections = document.querySelectorAll('.section');

function revealSections() {
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;
    
    if (scrollY > sectionTop - windowHeight + sectionHeight / 4) {
      section.classList.remove('section--hidden');
    } else {
      section.classList.add('section--hidden');
    }
  });
}

window.addEventListener('scroll', revealSections);


//////////////////////////////////////////
// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');

  const lazyLoad = function(target){
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src');

          img.setAttribute('src', src);
          img.classList.remove('lazy-img');

          observer.disconnect();
        }
      });
    });

    io.observe(target);
  };

  imgTargets.forEach(lazyLoad);

//////////////////////////////////////////
// Slider

let currentSlide = 0;

function initSlider() {
  slides.forEach((slide, index) => {
    if (index !== currentSlide) {
      slide.style.display = 'none';
    }
  });

 
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);


  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('button');
    dot.classList.add('dots__dot');
    dot.dataset.index = i;
    dot.addEventListener('click', goToSlide);
    dots.appendChild(dot);
  }


  const currentDot = dots.querySelector(`[data-index="${currentSlide}"]`);
  currentDot.classList.add('dots__dot--active');
}


function nextSlide() {
  currentSlide++;
  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }
  changeSlide();
}


function prevSlide() {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }
  changeSlide();
}

function goToSlide(event) {
  currentSlide = Number(event.target.dataset.index);
  changeSlide();
}


function changeSlide() {

  slides.forEach((slide, index) => {
    if (index === currentSlide) {
      slide.style.display = 'flex';
    } else {
      slide.style.display = 'none';
    }
  });

  
  const activeDot = dots.querySelector('.dots__dot--active');
  activeDot.classList.remove('dots__dot--active');
  const currentDot = dots.querySelector(`[data-index="${currentSlide}"]`);
  currentDot.classList.add('dots__dot--active');
}

initSlider();
