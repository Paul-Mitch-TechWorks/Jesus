(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasFinePointer = window.matchMedia("(pointer: fine)").matches;
  var photo = document.querySelector(".hero__photo");

  if (!photo || reduceMotion || !hasFinePointer) return;

  var hero = document.querySelector(".hero");
  var raf = null;

  function onMove(event) {
    var rect = hero.getBoundingClientRect();
    var relX = (event.clientX - rect.left) / rect.width - 0.5;
    var relY = (event.clientY - rect.top) / rect.height - 0.5;

    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(function () {
      photo.style.setProperty("--tilt-x", (relX * -10).toFixed(2) + "px");
      photo.style.setProperty("--tilt-y", (relY * -8).toFixed(2) + "px");
    });
  }

  function onLeave() {
    photo.style.setProperty("--tilt-x", "0px");
    photo.style.setProperty("--tilt-y", "0px");
  }

  hero.addEventListener("pointermove", onMove);
  hero.addEventListener("pointerleave", onLeave);
})();
