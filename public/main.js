const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");
var imageSlides = document.getElementsByClassName('imageSlides');
var circles = document.getElementsByClassName('circle');
var leftArrow = document.getElementById('leftArrow');
var rightArrow = document.getElementById('rightArrow');
var counter = 0;

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  origin: "bottom",
  distance: "50px",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__content p", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".header__btns", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".feature__content .section__subheader", {
  ...scrollRevealOption,
});
ScrollReveal().reveal(".feature__content .section__header", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".feature__content p", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".feature__btn", {
  ...scrollRevealOption,
  delay: 1500,
});
ScrollReveal().reveal(".feature__card", {
  duration: 1000,
  interval: 500,
  delay: 2000,
});

ScrollReveal().reveal(".banner__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".imgap__card", {
  duration: 1000,
  interval: 500,
});

ScrollReveal().reveal(".feminismo__content img", {
  ...scrollRevealOption,
});
ScrollReveal().reveal(".feminismo__content p", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".feminismo__btn", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".feminismo__list li", {
  duration: 1000,
  interval: 500,
  delay: 1500,
});

//Esconder Imagenes
function hideImages() {
  for (var i = 0; i < imageSlides.length; i++) {
    imageSlides[i].classList.remove('visible');
  }
}

//Quitar puntos (dots)
function removeDots() {
  for (var i = 0; i < imageSlides.length; i++) {
    circles[i].classList.remove('dot');
  }
}

//Loop de Imagenes
function imageLoop() {
  var currentImage = imageSlides[counter];
  var currentDot = circles[counter];
  currentImage.classList.add('visible');
  removeDots();
  currentDot.classList.add('dot');
  counter++;
}

//Sliders izquierdos y derechos
function arrowClick(e) {
  var target = e.target;
  if (target == leftArrow) {
    clearInterval(imageSlideshowInterval);
    hideImages();
    removeDots();
    if (counter == 1) {
      counter = (imageSlides.length - 1);
      imageLoop();
      imageSlideshowInterval = setInterval(slideshow, 10000);
    } else {
      counter--;
      counter--;
      imageLoop();
      imageSlideshowInterval = setInterval(slideshow, 10000);
    }
  } 
  else if (target == rightArrow) {
    clearInterval(imageSlideshowInterval);
    hideImages();
    removeDots();
    if (counter == imageSlides.length) {
      counter = 0;
      imageLoop();
      imageSlideshowInterval = setInterval(slideshow, 10000);
    } else {
      imageLoop();
      imageSlideshowInterval = setInterval(slideshow, 10000);
    }
  }
}

leftArrow.addEventListener('click', arrowClick);
rightArrow.addEventListener('click', arrowClick);


//Slide de Imagenes
function slideshow() {
  if (counter < imageSlides.length) {
    imageLoop();
  } else {
    counter = 0;
    hideImages();
    imageLoop();
  }
}

//Mostrar imagen, esperar y pasar img
setTimeout(slideshow, 1000);
var imageSlideshowInterval = setInterval(slideshow, 10000);