const imgContainer = document.querySelector("#img-container");
const playBtn = document.querySelector("#visit");

//for the element that follows the cursor on mouse hover
const mouseHover = () => {
  imgContainer.addEventListener("mouseenter", function () {
    gsap.to(playBtn, {
      scale: 1,
      opacity: 1,
    });
  });
  imgContainer.addEventListener("mouseleave", function () {
    gsap.to(playBtn, {
      scale: 0,
      opacity: 0,
    });
  });
  imgContainer.addEventListener("mousemove", function (e) {
    gsap.to(playBtn, {
      left: e.x - 80,
      top: e.y - 80,
    });
  });
};
mouseHover();

//loading animation
const loadingAnimation = () => {
  gsap.from("#page1 h1", {
    y: 100,
    opacity: 0,
    delay: 0.5,
    duration: 0.9,
    stagger: 0.2,
  });

  gsap.from("#page1 #img-container", {
    y: 100,
    opacity: 0,
    scale: 0.9,
    delay: 1,
    duration: 0.9,
  });
};
loadingAnimation();
