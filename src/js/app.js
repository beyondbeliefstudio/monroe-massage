import gsap from "gsap";
// GALLERY GRID
// Animate grid items on page load
window.addEventListener("DOMContentLoaded", () => {
  const galleryImages = document.querySelectorAll(".gallery-item img");
  if (galleryImages.length > 0) {
    gsap.from(galleryImages, {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
    });

    // Add a fun hover scale bounce
    galleryImages.forEach(item => {
      item.addEventListener("mouseenter", () => {
        gsap.to(item, { scale: 1.03, duration: 0.3, ease: "back.out(1.7)" });
      });
      item.addEventListener("mouseleave", () => {
        gsap.to(item, { scale: 1, duration: 0.3, ease: "power2.out" });
      });
    });
  }
});

// REVIEW SCROLLER
const scrollers = document.querySelectorAll(".scroller-image");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach(scroller => {
    scroller.setAttribute("data-animated", true);

    const scrollerInner = scroller.querySelector(".scroller-inner-image");
    const scrollerContent = Array.from(scrollerInner.children);

    for (var i = 0; i < 3; i++) {
      scrollerContent.forEach(item => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicatedItem);
      });
    }
  });
}

// NAV ACTIVE STATES
document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll("a.nav-link");

  // Helper function to normalize paths by removing trailing slashes
  const normalizePath = path => (path === "/" ? "/" : path.replace(/\/$/, ""));

  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;

    // Normalize both paths for comparison
    const normalizedLinkPath = normalizePath(linkPath);
    const normalizedCurrentPath = normalizePath(currentPath);

    if (normalizedLinkPath === normalizedCurrentPath) {
      link.classList.add("active");
    }
  });
});
