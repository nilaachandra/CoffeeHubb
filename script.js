gsap.registerPlugin(ScrollTrigger);
//locomotive and scrollTrigger
const locomotiveAnimations = () => {


// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}
locomotiveAnimations()


//menu links
// Function to open the menu
function openMenu() {
  const menuOverlay = document.querySelector(".menu-overlay");

  // Show the menu immediately without waiting for the animation to complete
  menuOverlay.style.display = "block";
  menuOverlay.style.pointerEvents = "all";
  // Slide down animation when opening
  gsap.fromTo(
      menuOverlay,
      { y: "-100%", opacity: 0 }, // Initial state
      {
          duration: 1,
          y: "0%", // Slide down from the top
          opacity: 1,
          ease: "power2.out",
      }
  );
}

// Function to close the menu
function closeMenu() {
  const menuOverlay = document.querySelector(".menu-overlay");

  // Slide up animation when closing
  gsap.to(menuOverlay, {
      duration: 1,
      y: "-100%",
      ease: "power2.out",
      onComplete: function () {
          // Hide the menu after the animation completes
          menuOverlay.style.display = "none";
          menuOverlay.style.pointerEvents = "none";
      },
  });
}

// Event listener for the menu button
document.querySelector("#menuicon").addEventListener("click", openMenu);

// Event listener for the close button
document.querySelector(".menu-close-btn").addEventListener("click", closeMenu);


//nav bar animation
const navbarAnimation = () =>{
  gsap.to("#nav-left h1",{
    transform: "translatey(-100%)",
    scrollTrigger:{
      trigger:"#page1",
      scroller: "#main",
      start: "top 0",
      end: "top -6%",
      scrub: 3,
    }
  })
  gsap.to("#nav-mid #links a",{
    transform: "translatey(-100%)",
    opacity: 0,
    scrollTrigger:{
      trigger:"#page1",
      scroller: "#main",
      start: "top 0",
      end: "top -5%",
      scrub: 2,
    }
  })
}
navbarAnimation()

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
      left: e.x -40,
      top: e.y -40
    });
  });
};
mouseHover();
//swiper js
const swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    
  },
  grabCursor: true,
});
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
    delay: 0.8,
    duration: 0.8,
  });
  gsap.from("#page2 .elem img", {
    y: 100,
    opacity: 0,
    scale: 0.9,
    delay: 0.3,
    duration: 0.8,
    stagger: 0.2,
 scrollTrigger: {
    trigger: "#page2 .elem img",
    scroller: "#main",
    start: "top 80%", 
    end: "top 20%",  
    scrub: 4,
    once: true
  }  
  });
  gsap.from("#main-desc #left-desc,#main-desc #right-desc p",{
    y: 100,
    opacity: 0,
    scale: 0.9,
    delay: 0.3,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: {
        trigger: "#main-desc",
        scroller: "#main",
        start: "top 60%", 
        end: "top 40%",  
        scrub: 4,
        once: true
      }
  });
  gsap.from("#page3 .child",{
    y: 100,
    opacity: 0,
    scale: 0.9,
    delay: 0.2,
    duration: 0.7,
    stagger: 0.2,
    scrollTrigger: {
        trigger: "#page3",
        scroller: "#main",
        start: "top 60%", 
        end: "bottom 20%",  
        scrub: 4,
        once: true
      }
  });
  gsap.from(".swiper h1, .swiper h3", {
    y: 100,
    opacity: 0,
    delay: 0.5,
    duration: 0.9,
    scrollTrigger: {
      trigger: ".swiper",
      scroller: "#main",
      start: "top 60%", 
      end: "bottom 60%",  
      scrub: 4,
      once: true,
    }
  });
};
loadingAnimation();

//

