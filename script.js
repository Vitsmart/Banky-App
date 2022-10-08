'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const nav = document.querySelector('.nav');






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

const header = document.querySelector('.header');

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = 'we use cookies for improved functionality and analytics, <button class= "btn btn--close-cookie">Got it!</button>';

//header.prepend(message);
header.append(message);
//header.before(message);
//header.after(message);


// delete elements
document
.querySelector('.btn--close-cookie')
.addEventListener('click', function () {
 message.remove();
});
//Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(getComputedStyle(message).height);
message.style.height = 
Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';


document.documentElement.style.setProperty ('--color-primary', 'orangered');

const btnscrollto = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnscrollto.addEventListener('click', function () {

  section1.scrollIntoView({ behavior: 'smooth'});
});

const h1 = document.querySelector('h1');
const alertHi = function () {
  alert('Hello, have a nice experience here !');
};
h1.addEventListener('mouseenter', alertHi);
setTimeout(() => h1.removeEventListener('mouseenter', alertHi), 3000);


//Event BUbbling- testing using random color rgb(255,255,255)
const randomint = (min, max) => 
Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () => `rgb(${randomint(100, 255)},${randomint(100, 255)},${randomint(50, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor();

// });
  
// document.querySelector('.nav__links').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor();
//   console.log('container', e.target);
// });
  
document.querySelector('.nav').addEventListener('click', function(e) {
  this.style.backgroundColor = randomColor();

});


// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//   })
// })

document.querySelector('.nav__links').addEventListener('click', function(e) {
  e.preventDefault();

// Matching Strategy
if (e.target.classList.contains('nav__link')) {
  const id = e.target.getAttribute('href');
  document.querySelector(id).scrollIntoView({ behavior: 'smooth'});
}

});

// const hstyle = document.querySelector('h1');
// hstyle.firstElementChild.style.color = 'orangered';
// //hstyle.lastElementchild

// //going to parents
// hstyle.closest('h1').style.background = 'white';
// hstyle.closest('.header').style.backgroundColor = 'yellow';

// // console.log(hstyle.parentElement.children);
//  [...hstyle.parentElement.children].forEach(function(el) {
//    if (el !== hstyle) el.style.transform = 'scale(0.5)';

// });



const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// Event delegation to the container body than forEach tab
tabsContainer.addEventListener('click', function(e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  //if (clicked) { }
  if (!clicked) return;


  // remove each active classes
  tabs.forEach(t => t.classList. remove
    ('operations__tab--active'));

tabsContent.forEach(c => c.classList.remove
  ('operations__content--active'));


// Activate tab for the clicked
clicked.classList.add('operations__tab--active');
// Activate content area
document
.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');


});


// menu Fade animation
// create a function and select all elements around it both parents and siblings.
// nav.addEventListener('mouseover', function(e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelector('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = 0.5;
//     });
//     logo.style.opacity = 0.5;
//   }
// });


// nav.addEventListener('mouseout', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelector('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = 0.5;
//     });
//     logo.style.opacity = 0.5;
//   }
// });

// lets refactor the code

const handleHover = function(e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      //if (el !== link) el.style.opacity = opacity;
      if (el !== link) el.style.opacity = this;
    });
    //logo.style.opacity = opacity;
    logo.style.opacity = this;
  }
};

// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });
// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });

// we can use bind to connect the functions with different argument
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));


// applying a sticky menu while scrolling
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add ('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver (stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// // Reveal sections
// const allsections = document.querySelectorAll('.section');
// const revealSection = function (entries, observer) {
//   const [entry] = entries;
//   //if (!entry.isIntersecting) return;
//   if (entry.isIntersecting)
//   entry.target.classList.remove('section--hidden'); 
//  // observer.unobserve(entry.target);
// };

// const sectionObserver = new IntersectionObserver
// (revealSection, {
//   root: null,
//   threshold: 0.1,
// });

// allsections.forEach(function (section) {
//   sectionObserver.observe(section);
//   section.classList.add('section--hidden');
// });


// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;


if (!entry.isIntersecting) return;
// Replace src with data-src
entry.target.src = entry.target.dataset.src;
//entry.target.classList.remove('lazy-img');

// using an event listener load, so after loading, remove filter immediately than loading and removing filter simultaneously.
entry.target.addEventListener('load', function () {
  entry.target.classList.remove('lazy-img');
});

observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTargets.forEach(img => imgObserver.observe(img));


// slider
const btnleft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const slides = document.querySelectorAll('.slide');
const dotContainer = document.querySelector('.dots');
// const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.4) translateX(-800px)';
// slider.style.overflow = 'visible';

let currSlide = 0;
const maxSlide = slides.length;

const createDots = function () {
  slides.forEach(function(_, i) {
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
  })
};
createDots();

// to give active class to the selected, first, remove all active classes and add active class to the selected then match it with the slide.
const activeDot = function (slide) {
  document
  .querySelectorAll('.dots__dot')
  .forEach(dot => dot.classList.remove ('dots__dot--active'));

  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
  
};

const activeD = document.querySelector('.dots__dot--active');
activeDot(0);
const goToSlide = function(slide) {
  slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i-slide)}%)`));
};

goToSlide(0);


// Next slide

const nextSlide = function () {
  if (currSlide === maxSlide - 1) {
    currSlide = 0;
  } else {
    currSlide++
  }
  goToSlide(currSlide);
  activeDot(currSlide);
}
const prevSlide = function () {
  if (currSlide === 0) {
    currSlide = maxSlide - 1;
  } else {
  currSlide--;
  }
  goToSlide(currSlide);
  activeDot(currSlide);
};

btnRight.addEventListener('click', nextSlide);
btnleft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});

dotContainer.addEventListener('click', function (e){
  if (e.target.classList.contains('dots__dot')) {
    //const slide = e.target.dataset.slide;
    const {slide} = e.target.dataset;
    goToSlide(slide);
    activeDot(slide);
   // activeD.style.backgroundColor = randomColor();
  }
});
