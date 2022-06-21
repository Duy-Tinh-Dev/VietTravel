const loading = document.querySelector(".loading");
const app = document.querySelector("#app");

let loadingWeb = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
    loading.style.animation = "fade-out ease-in-out 1s forwards";
  }, 2000);
});
loadingWeb.then(() => {
  setTimeout(() => {
    loading.style.display = "none";
    app.style.display = "block";
  }, 500);
});
