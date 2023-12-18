
//locomotive and scrollTrigger
const locomotiveAnimations = () => {
  gsap.registerPlugin(ScrollTrigger);

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
const topNav = () => {
  gsap.to("#nav-top",{
    x: -425,
    duration: 0.8
  })
}

const menuIcon = document.getElementById('menuicon');
const myMenu = document.getElementById('nav-top')
menuIcon.addEventListener('click',function() {
  myMenu.classList.add('reveal');
  topNav();
})
const closeIcon = document.getElementById('closeIcon');
closeIcon.addEventListener('click', function(){
  gsap.to("#nav-top",{
    x: 0,
    duration: 0.8,
  })
})
//nav bar animation
const navbarAnimation = () =>{
  gsap.to("#nav-left h1",{
    transform: "translatey(-100%)",
    scrollTrigger:{
      trigger:"#page1",
      scroller: "#main",
      start: "top 0",
      end: "top -5%",
      scrub: 2,
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
  //   // scrollTrigger: {
  //   //   trigger: "#page2 .elem img",
  //   //   scroller: "body",
  //   //   start: "top 80%", 
  //   //   end: "top 20%",  
  //   //   scrub: 4,
  //   //   once: true
  // }  
  });
};
loadingAnimation();

//

