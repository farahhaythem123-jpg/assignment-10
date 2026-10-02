

var root = document.documentElement; 
var body = document.body;


var navLinks = document.querySelectorAll(".nav-links a");
var sectionIds = ["hero-section", "about", "portfolio", "experience", "testimonials", "contact"];


root.style.scrollBehavior = "smooth";

function updateActiveLink() {
  var currentId = sectionIds[0];


  for (var i = 0; i < sectionIds.length; i++) {
    var section = document.getElementById(sectionIds[i]);
    if (window.scrollY >= section.offsetTop - 150) {
      currentId = sectionIds[i];
    }
  }

 
  for (var i = 0; i < navLinks.length; i++) {
    if (navLinks[i].getAttribute("href") === "#" + currentId) {
      navLinks[i].style.color = "var(--color-primary)";
      navLinks[i].style.textDecoration = "underline";
      navLinks[i].style.textUnderlineOffset = "8px";
    } else {
      navLinks[i].style.color = "";
      navLinks[i].style.textDecoration = "none";
    }
  }
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();


var themeButton = document.getElementById("theme-toggle-button");


if (localStorage.getItem("theme") === "light") {
  root.classList.remove("dark");
}

themeButton.addEventListener("click", function () {
  if (root.classList.contains("dark")) {
    root.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    root.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
  themeButton.setAttribute("aria-pressed", root.classList.contains("dark"));
});


var filterButtons = document.querySelectorAll(".portfolio-filter");
var portfolioItems = document.querySelectorAll(".portfolio-item");


var activeButtonClasses =
  "portfolio-filter active px-8 py-3 rounded-xl bg-linear-to-r from-primary to-secondary text-white font-bold transition-all duration-300 hover:shadow-lg hover:shadow-primary/50";
var inactiveButtonClasses =
  "portfolio-filter px-8 py-3 rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700";

for (var i = 0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener("click", function () {
    var filter = this.dataset.filter; 


    for (var j = 0; j < filterButtons.length; j++) {
      filterButtons[j].className = inactiveButtonClasses;
      filterButtons[j].setAttribute("aria-pressed", "false");
    }
    this.className = activeButtonClasses;
    this.setAttribute("aria-pressed", "true");

  
    for (var k = 0; k < portfolioItems.length; k++) {
      if (filter === "all" || portfolioItems[k].dataset.category === filter) {
        portfolioItems[k].classList.remove("hidden");
      } else {
        portfolioItems[k].classList.add("hidden");
      }
    }
  });
}


var track = document.getElementById("testimonials-carousel");
var cards = track.querySelectorAll(".testimonial-card");
var nextButton = document.getElementById("next-testimonial");
var prevButton = document.getElementById("prev-testimonial");
var dotsBox = document.querySelector(".carousel-indicator").parentElement;

var dotActiveClasses =
  "carousel-indicator w-3 h-3 rounded-full bg-accent transition-all duration-300 hover:scale-125 cursor-pointer";
var dotInactiveClasses =
  "carousel-indicator w-3 h-3 rounded-full bg-slate-400 dark:bg-slate-600 transition-all duration-300 hover:scale-125 cursor-pointer";

var currentIndex = 0;
var cardsPerView = 3;
var autoPlay;


function getCardsPerView() {
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
}


function getLastIndex() {
  return cards.length - cardsPerView;
}

function createDots() {
  dotsBox.innerHTML = "";
  for (var i = 0; i <= getLastIndex(); i++) {
    var dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", "التوصية " + (i + 1));
    dot.dataset.index = i;
    dot.addEventListener("click", function () {
      currentIndex = Number(this.dataset.index);
      showSlide();
    });
    dotsBox.appendChild(dot);
  }
}

function showSlide() {

  track.style.transform = "translateX(" + currentIndex * (100 / cardsPerView) + "%)";

  var dots = dotsBox.children;
  for (var i = 0; i < dots.length; i++) {
    dots[i].className = i === currentIndex ? dotActiveClasses : dotInactiveClasses;
  }
}

function nextSlide() {
  if (currentIndex >= getLastIndex()) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }
  showSlide();
}

function prevSlide() {
  if (currentIndex <= 0) {
    currentIndex = getLastIndex();
  } else {
    currentIndex--;
  }
  showSlide();
}

nextButton.addEventListener("click", nextSlide);
prevButton.addEventListener("click", prevSlide);


function startAutoPlay() {
  clearInterval(autoPlay);
  autoPlay = setInterval(nextSlide, 5000);
}
track.parentElement.addEventListener("mouseenter", function () {
  clearInterval(autoPlay);
});
track.parentElement.addEventListener("mouseleave", startAutoPlay);


window.addEventListener("resize", function () {
  cardsPerView = getCardsPerView();
  if (currentIndex > getLastIndex()) currentIndex = getLastIndex();
  createDots();
  showSlide();
});

cardsPerView = getCardsPerView();
createDots();
showSlide();
startAutoPlay();


var settingsToggle = document.getElementById("settings-toggle");
var settingsSidebar = document.getElementById("settings-sidebar");
var closeSettings = document.getElementById("close-settings");
var resetSettings = document.getElementById("reset-settings");
var colorsGrid = document.getElementById("theme-colors-grid");
var fontButtons = document.querySelectorAll(".font-option");


function openSidebar() {
  settingsSidebar.classList.remove("translate-x-full");
  settingsSidebar.setAttribute("aria-hidden", "false");
  settingsToggle.setAttribute("aria-expanded", "true");
  settingsToggle.style.right = settingsSidebar.offsetWidth + "px"; 
}

function closeSidebar() {
  settingsSidebar.classList.add("translate-x-full");
  settingsSidebar.setAttribute("aria-hidden", "true");
  settingsToggle.setAttribute("aria-expanded", "false");
  settingsToggle.style.right = "0px";
}

settingsToggle.addEventListener("click", function () {
  if (settingsSidebar.classList.contains("translate-x-full")) {
    openSidebar();
  } else {
    closeSidebar();
  }
});
closeSettings.addEventListener("click", closeSidebar);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeSidebar();
});


var fontClasses = ["font-alexandria", "font-tajawal", "font-cairo"];

function applyFont(name) {
  if (fontClasses.indexOf("font-" + name) === -1) {
    name = "tajawal"; 
  }

  for (var i = 0; i < fontClasses.length; i++) {
    body.classList.remove(fontClasses[i]);
  }
  body.classList.add("font-" + name);

  for (var i = 0; i < fontButtons.length; i++) {
    if (fontButtons[i].dataset.font === name) {
      fontButtons[i].classList.add("active");
      fontButtons[i].style.borderColor = "var(--color-primary)";
      fontButtons[i].setAttribute("aria-checked", "true");
    } else {
      fontButtons[i].classList.remove("active");
      fontButtons[i].style.borderColor = "";
      fontButtons[i].setAttribute("aria-checked", "false");
    }
  }
}

for (var i = 0; i < fontButtons.length; i++) {
  fontButtons[i].addEventListener("click", function () {
    applyFont(this.dataset.font);
    localStorage.setItem("font", this.dataset.font);
  });
}


var style = getComputedStyle(root);
var colors = [
  { id: "ocean", primary: "#3b82f6", secondary: "#06b6d4", accent: "#6366f1" },
  { id: "emerald", primary: "#10b981", secondary: "#14b8a6", accent: "#22c55e" },
  {
    id: "default",
    primary: style.getPropertyValue("--color-primary") || "#ec4899",
    secondary: style.getPropertyValue("--color-secondary") || "#f97316",
    accent: style.getPropertyValue("--color-accent") || "#8b5cf6",
  },
  { id: "violet", primary: "#8b5cf6", secondary: "#6366f1", accent: "#a855f7" },
  { id: "amber", primary: "#f59e0b", secondary: "#f97316", accent: "#eab308" },
  { id: "red", primary: "#ef4444", secondary: "#f43f5e", accent: "#f97316" },
  { id: "teal", primary: "#14b8a6", secondary: "#06b6d4", accent: "#0ea5e9" },
  { id: "fuchsia", primary: "#d946ef", secondary: "#8b5cf6", accent: "#ec4899" },
];


for (var i = 0; i < colors.length; i++) {
  var swatch = document.createElement("button");
  swatch.type = "button";
  swatch.className = "theme-swatch";
  swatch.dataset.color = colors[i].id;
  swatch.setAttribute("aria-label", colors[i].id);
  swatch.style.width = "100%";
  swatch.style.aspectRatio = "1";
  swatch.style.borderRadius = "50%";
  swatch.style.cursor = "pointer";
  swatch.style.border = "2px solid rgba(148, 163, 184, 0.35)";
  swatch.style.outlineOffset = "3px";
  swatch.style.background =
    "linear-gradient(135deg, " + colors[i].primary + ", " + colors[i].secondary + ")";

  swatch.addEventListener("click", function () {
    applyColor(this.dataset.color);
    localStorage.setItem("color", this.dataset.color);
  });

  colorsGrid.appendChild(swatch);
}

function applyColor(id) {
  var chosen = colors[2]; 
  for (var i = 0; i < colors.length; i++) {
    if (colors[i].id === id) chosen = colors[i];
  }

  if (chosen.id === "default") {
   
    root.style.removeProperty("--color-primary");
    root.style.removeProperty("--color-secondary");
    root.style.removeProperty("--color-accent");
  } else {
    root.style.setProperty("--color-primary", chosen.primary);
    root.style.setProperty("--color-secondary", chosen.secondary);
    root.style.setProperty("--color-accent", chosen.accent);
  }


  var swatches = document.querySelectorAll(".theme-swatch");
  for (var i = 0; i < swatches.length; i++) {
    if (swatches[i].dataset.color === chosen.id) {
      swatches[i].style.outline = "2px solid " + chosen.primary;
    } else {
      swatches[i].style.outline = "none";
    }
  }
}


resetSettings.addEventListener("click", function () {
  applyColor("default");
  applyFont("tajawal");
  localStorage.removeItem("color");
  localStorage.removeItem("font");
});


applyColor(localStorage.getItem("color") || "default");
applyFont(localStorage.getItem("font") || "tajawal");


var scrollTopButton = document.getElementById("scroll-to-top");

window.addEventListener("scroll", function () {
  if (window.scrollY > 400) {
    scrollTopButton.classList.remove("opacity-0");
    scrollTopButton.classList.remove("invisible");
  } else {
    scrollTopButton.classList.add("opacity-0");
    scrollTopButton.classList.add("invisible");
  }
});

scrollTopButton.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});