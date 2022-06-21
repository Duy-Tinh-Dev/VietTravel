const loading = document.querySelector(".loading");
const app = document.querySelector("#app");

let loadingWeb = new Promise((resolve) => {
  setTimeout(() => {
    resolve();
    loading.style.animation = "fade-out ease-in-out 1s forwards";
  }, 2000);
});
loadingWeb
  .then(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        loading.style.display = "none";
        app.style.display = "block";
      }, 500);
    });
  })
  .then(() => {
    const nav = document.querySelector(".nav");
    const body = document.querySelector("body");
    const videos = document.querySelector(".header__videos");
    const video = document.querySelector(".header__videos--item");
    const btnSliders = document.querySelectorAll(".header__slider--btn");
    const counterTravel = document.querySelector(".visited__quantity--travel");
    const counterMessage = document.querySelector(
      ".visited__quantity--message"
    );
    const counterOffice = document.querySelector(".visited__quantity--office");
    const btnScrollTop = document.querySelector(".arrow-to-top");
    const elementScrolls = document.querySelectorAll(".show-on-scroll");
    const handleScroll = (e) => {
      const prevScroll = Math.floor((window.scrollY / body.clientHeight) * 100);
      if (prevScroll >= 20) {
        btnScrollTop.classList.remove("hide");
      } else {
        btnScrollTop.classList.add("hide");
      }
      // if (prevScroll >= 10) {
      //   nav.classList.add("change-bg");

      //   nav.style.boxShadow = "0 2px 4px 0 rgba(0, 0, 0, 0.2)";
      // } else {
      //   nav.classList.remove("change-bg");
      // }
    };
    window.addEventListener("scroll", () => {
      handleScroll();
      handlerLoopEl();
    });
    // handler slider
    function handlerSlider(manual) {
      btnSliders.forEach((btn) => {
        btn.classList.remove("active");
      });
      btnSliders[manual].classList.add("active");
      videos.innerHTML = `<video
          autoplay
          loop
          muted
          src="./assets/video/${manual + 1}.mp4"
          class="header__video--item"
        ></video>`;
    }
    if (!video) {
      videos.innerHTML = `<video
          autoplay
          loop
          muted
          src="./assets/video/1.mp4"
          class="header__video--item"
        ></video>`;
    }
    btnSliders.forEach((el, index) => {
      el.addEventListener("click", () => handlerSlider(index));
    });
    // handler animation scroll
    const screenWindow =
      window.innerHeight || document.documentElement.clientHeight;
    function isElInViewPort(el, screenWindow) {
      const topElement = el.getBoundingClientRect().top;
      const bottomElement = el.getBoundingClientRect().bottom;
      return !(topElement > screenWindow || bottomElement < 0);
    }
    function handlerLoopEl() {
      elementScrolls.forEach((el) => {
        checkViewVisited(el);

        if (isElInViewPort(el, screenWindow)) {
          el.classList.add("start");
        } else {
          el.classList.remove("start");
        }
      });
    }
    // handler counter visited
    let IsRunSupport = true;
    function checkViewVisited(el) {
      if (el.id == "visited") {
        if (isElInViewPort(el, screenWindow) && IsRunSupport) {
          IsRunSupport = false;
          function counter(el, to) {
            let from = 0;
            const speed = 500;
            const step = to / speed;
            let counter = setInterval(() => {
              if (from > to) {
                el.innerText = to;
                clearInterval(counter);
              } else {
                from = from + step;
                el.innerText = Math.round(from);
              }
            }, 1);
          }
          counter(counterTravel, 5872);
          counter(counterMessage, 20000);
          counter(counterOffice, 25);
        }
      }
    }
    // slider
    const slide = document.querySelector(".selling__list");
    const nextBtnSlider = document.querySelector(".selling__btn--next");
    const preBtnSlider = document.querySelector(".selling__btn--pre");
    let slides = document.querySelectorAll(".selling__item");
    let index = 0;
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);
    let slideId;
    firstClone.id = "firstClone";
    lastClone.id = "lastClone";
    slide.append(firstClone);
    slide.prepend(lastClone);
    let slideWidth;
    slideWidth = slides[index].clientWidth + 60;
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
    // const startSlider = () => {
    //   slideId = setInterval(() => {
    //     moveToPreSlide();
    //   }, 5000);
    // };
    const getSlide = () => document.querySelectorAll(".selling__item");
    const moveToNextSlide = () => {
      slides = getSlide();
      if (index >= slides.length - 1) return;
      index++;
      slide.style.transform = `translateX(${-slideWidth * index}px)`;
      slide.style.transition = `0.7s`;
    };
    const moveToPreSlide = () => {
      if (index <= 0) return;
      index--;
      slide.style.transform = `translateX(${-slideWidth * index}px)`;
      slide.style.transition = `0.7s`;
    };
    slide.addEventListener("transitionend", () => {
      slides = getSlide();
      if (slides[index].id === firstClone.id) {
        slide.style.transition = `2s`;
        index = 1;
        slide.style.transform = `translateX(${-slideWidth * index}px)`;
      }
      if (slides[index].id === lastClone.id) {
        slide.style.transition = `2s`;
        index = slides.length - 3;
        slide.style.transform = `translateX(${-slideWidth * index}px)`;
      }
    });
    slide.addEventListener("mouseenter", () => {
      clearInterval(slideId);
    });
    nextBtnSlider.addEventListener("click", moveToNextSlide);
    preBtnSlider.addEventListener("click", moveToPreSlide);
  });
