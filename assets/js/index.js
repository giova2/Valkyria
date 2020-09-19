function loading() {
  const $loading = document.querySelector("#loading");
  $loading.classList.add("animated");
  $loading.classList.add("evaOutRight");
  $loading.addEventListener(
    "animationend",
    function() {
      document.querySelector("#cont-app").classList.remove("none");
      $loading.classList.remove("animated");
      $loading.classList.remove("evaOutRight");
      $loading.classList.add("none");
    },
    false
  );
}

document.addEventListener("DOMContentLoaded", function() {
  loading();
});
