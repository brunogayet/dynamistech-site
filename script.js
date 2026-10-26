document.documentElement.classList.remove("no-js");

// Header border once the page scrolls
const header = document.querySelector(".site-header");
const onScroll = () => header && header.classList.toggle("scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Reveal on scroll, staggered within each group
const items = document.querySelectorAll(".reveal, .step");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add("in"));
}
document.querySelectorAll("[data-stagger]").forEach((group) => {
  [...group.children].forEach((child, i) => child.style.setProperty("--d", `${i * 0.07}s`));
});

// Spotlight that follows the cursor on service cards
document.querySelectorAll(".service").forEach((card) => {
  card.addEventListener("pointermove", (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  });
});

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
