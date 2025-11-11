import gsap from "gsap";

export function initLoadingScreen() {
  const loadingScreen = document.getElementById("loadingScreen");
  const loadingBg = document.querySelector(".loading-screen__bg");
  const loadingLogo = document.querySelector(".loading-screen__logo");
  const body = document.body;

  // MainHero elements
  const heroBgWrapper = document.querySelector(".hero__bg-wrapper");
  const heroBg = document.querySelector(".hero__bg");
  const heroContent = document.querySelector(".hero__content");

  if (!loadingScreen || !loadingBg || !loadingLogo) return;

  // Set initial states for MainHero elements
  if (heroBgWrapper) {
    gsap.set(heroBgWrapper, {
      clipPath: "inset(0% 0% 100% 0%)", // Start fully clipped from bottom
    });
  }
  if (heroBg) {
    gsap.set(heroBg, { scale: 1.2 });
  }
  if (heroContent) {
    // Animate the entire content container as one unit
    gsap.set(heroContent, { y: 30, opacity: 0 });
  }

  // Get the final opacity from CSS
  const heroBgFinalOpacity = heroBg ? parseFloat(getComputedStyle(heroBg).opacity) : 0.5;

  // Create timeline for entrance animations
  const entranceTl = gsap.timeline({
    defaults: { ease: "power2.out" },
  });

  // Set initial states
  gsap.set(loadingBg, { scale: 1.1, opacity: 0 });
  gsap.set(loadingLogo, { y: 30, opacity: 0 });

  // Entrance animations
  entranceTl
    .to(loadingBg, {
      scale: 1,
      opacity: 1,
      duration: 1.5,
    })
    .to(
      loadingLogo,
      {
        y: 0,
        opacity: 1,
        duration: 1,
      },
      "-=1"
    );

  // Continuous pulse animation for logo
  gsap.to(loadingLogo, {
    opacity: 0.7,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  // Wait for minimum display time and page load
  const minDisplayTime = 3500; // 3.5 seconds minimum
  const startTime = Date.now();

  const hideLoadingScreen = () => {
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

    setTimeout(() => {
      // Create exit timeline with MainHero animations
      const exitTl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
      });

      exitTl
        .to(loadingScreen, {
          opacity: 0,
          duration: 1.2,
          ease: "power2.inOut",
          onStart: () => {
            // Remove overflow hidden from body
            body.style.overflow = "";
          },
          onComplete: () => {
            gsap.set(loadingScreen, { display: "none" });
          },
        })
        // Animate hero background wrapper with clip-path reveal
        .to(
          heroBgWrapper,
          {
            clipPath: "inset(0% 0% 0% 0%)", // Reveal from top to bottom
            duration: 2.2,
            ease: "power2.inOut",
          },
          "-=0.6"
        )
        // Animate hero background scale
        .to(
          heroBg,
          {
            scale: 1,
            duration: 2.2,
            ease: "power2.inOut",
          },
          "-=2.2" // Start at the same time as the clip-path
        )
        // Animate hero content in as one unit
        .to(
          heroContent,
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            ease: "power2.out",
          },
          "-=1.0"
        );
    }, remainingTime);
  };

  // Hide when page is fully loaded
  if (document.readyState === "complete") {
    hideLoadingScreen();
  } else {
    window.addEventListener("load", hideLoadingScreen);
  }
}
