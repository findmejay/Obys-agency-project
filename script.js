function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#homepage"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#homepage" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#homepage", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#homepage").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

function cursorAnimation() {
  document.addEventListener("mousemove", function (dets) {
    gsap.to("#crsr", {
      left: dets.x,
      top: dets.y,
    });
  });
  Shery.makeMagnet(
    "#nav #nav-part1 svg, #menu-opener__square, #nav #nav-part3 h6"
  );
}

function videocursorAnimation() {
  const videoContainer = document.querySelector("#video-container");
  const videoCursor = document.querySelector("#video-cursor");
  const video = document.querySelector("#video-container video");
  let flag = 0;

  videoContainer.addEventListener("mouseenter", function () {
    gsap.to("#crsr", {
      opacity: 0,
    });
  });

  videoContainer.addEventListener("mouseleave", function () {
    gsap.to("#crsr", {
      opacity: 1,
    });
  });

  videoContainer.addEventListener("mousemove", function (e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // GSAP tween — adds trailing effect
    gsap.to(videoCursor, {
      left: x,
      top: y,
      duration: 0.8, // the longer the duration, the more it lags
      ease: "power3.out",
    });
  });

  videoContainer.addEventListener("click", function () {
    if (flag == 0) {
      video.play();
      video.style.opacity = 1;

      document.querySelector(
        "#video-cursor"
      ).innerHTML = `<i class="ri-pause-line"></i>`;
      gsap.to("#video-cursor", {
        scale: 0.5,
      });
      flag = 1;
    } else {
      video.pause();
      video.style.opacity = 1;

      document.querySelector(
        "#video-cursor"
      ).innerHTML = `<i class="ri-play-mini-fill"></i>`;
      gsap.to("#video-cursor", {
        scale: 1,
      });
      flag = 0;
    }
  });
}

function loadingAnimation() {
  let tl = gsap.timeline();

  tl.from(".line h1", {
    y: 150,
    stagger: 0.2,
    opacity: 0,
    duration: 0.7,
    delay: 0.5,
  });

  tl.from(
    ".line #line-num",
    {
      opacity: 0,
      duration: 1,
      onStart: function () {
        let h5 = document.querySelector(".line #line-num h5");
        let grow = 0;

        setInterval(function () {
          if (grow < 100) {
            h5.textContent = grow++;
          } else {
            h5.textContent = grow;
          }
        }, 25);
      },
    },
    "-=0.3"
  );

  tl.to(
    "#line-now",
    {
      opacity: 0,
      animationName: "anime",
    },
    "-=0.8"
  );

  tl.to(
    "#loader-page p",
    {
      opacity: 1,
    },
    "-=0.6"
  );

  tl.to("#loader-page", {
    opacity: 0,
    duration: 1, // 0.8
    delay: 1.6, // 1.6
  });

  tl.to(
    "#loader-page",
    {
      display: "none",
    },
  ); 

  tl.from("#page1", {
    opacity: 0,
    y: 1200,
    duration: 0.5, //0.5
  });

  tl.from("#nav", {
    opacity: 0,
    duration: 0.5, //0.5
    delay: 0.2, //0.3
  });

  tl.from("#video-container", {
    opacity: 0,
    duration: 1,
    delay: 0.9,
  });

  tl.from(".hero h1", {
    y: 150,
    stagger: 0.3,
  }, "-=1.5");
}

function sheryAnimation() {
  Shery.imageEffect("#page3 .image", {
    style: 5,
    gooey: true,
    debug: false,
    gooeyball: 70,
  });
}

cursorAnimation();
videocursorAnimation();
loadingAnimation();
locomotiveAnimation();
sheryAnimation();

gsap.set("#flag", { xPercent: -50, yPercent: -50 });

document.addEventListener("mousemove", function(dets){
    gsap.to("#flag",{
        x:dets.x,
        y:dets.y
    })
})

document.querySelector("#hero3").addEventListener("mouseenter", function(){
    gsap.to("#flag", {
        opacity: 1
    })
})

document.querySelector("#hero3").addEventListener("mouseleave", function(){
    gsap.to("#flag", {
        opacity: 0
    })
})
