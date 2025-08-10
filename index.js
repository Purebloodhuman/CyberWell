// Enable hidden nav bar
{
  const nav = document.querySelector(".navbar");
  let lastScrollY = window.scrollY;
  window.addEventListener("scroll", () => {
    if (lastScrollY < window.scrollY) {
      nav.classList.add("hidden");
    } else {
      nav.classList.remove("hidden");
    }

    lastScrollY = window.scrollY;
  });
}

// Card Animation on Scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
}, observerOptions);

// Observe all cards
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".fade-in");
  cards.forEach((card) => {
    observer.observe(card);
  });
});

// Dark Mode Toggle
function toggleDarkMode() {
  const body = document.body;
  const themeIcon = document.getElementById("theme-icon");

  if (body.classList.contains("dark-mode")) {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    themeIcon.className = "fas fa-moon";
    localStorage.setItem("theme", "light");
  } else {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    themeIcon.className = "fas fa-sun";
    localStorage.setItem("theme", "dark");
  }
}

// Initialize theme based on device preference or saved preference
function initializeTheme() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const themeIcon = document.getElementById("theme-icon");

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.body.classList.add("dark-mode");
    themeIcon.className = "fas fa-sun";
  } else {
    document.body.classList.add("light-mode");
    themeIcon.className = "fas fa-moon";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  initializeTheme();
});
