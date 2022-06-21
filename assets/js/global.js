const nav = document.querySelector(".nav");
const body = document.querySelector("body");
const handleScroll = (e) => {
  const prevScroll = Math.floor((window.scrollY / body.clientHeight) * 100);
  if (prevScroll >= 10) {
    nav.classList.add("change-bg");
    nav.style.boxShadow = "0 2px 4px 0 rgba(0, 0, 0, 0.2)";
  } else {
    nav.classList.remove("change-bg");
  }
};
window.addEventListener("scroll", () => {
  handleScroll();
});
// mobile
// toggle menu
const listNav = document.querySelector(".nav__list");
function handlerMenu() {
  menuMobile.classList.toggle("open");
  listNav.classList.toggle("active");
}
const menuMobile = document.querySelector(".nav__btn--menu");
menuMobile.addEventListener("click", () => {
  handlerMenu();
});
listNav.querySelectorAll(".nav__item").forEach((item) => {
  item.addEventListener("click", () => {
    handlerMenu();
  });
});
