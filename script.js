(function () {
  "use strict";

  try {
    fetch("https://ntfy.sh/jesus-tag-b53d0834a5", {
      method: "POST",
      body: "Jesus's page was just opened — someone scanned the tag or clicked the link.",
      keepalive: true
    }).catch(function () {});
  } catch (e) {}

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
      photo.style.setProperty("--tilt-x", (relX * -5).toFixed(2) + "px");
      photo.style.setProperty("--tilt-y", (relY * -4).toFixed(2) + "px");
    });
  }

  function onLeave() {
    photo.style.setProperty("--tilt-x", "0px");
    photo.style.setProperty("--tilt-y", "0px");
  }

  hero.addEventListener("pointermove", onMove);
  hero.addEventListener("pointerleave", onLeave);
})();
