// PARTICLE BACKGROUND
document.addEventListener("DOMContentLoaded", function () {
  // Create particle canvas
  const canvas = document.createElement("canvas");
  canvas.id = "particles-js";
  const heroSection = document.getElementById("hero");
  heroSection.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
      this.color = `rgba(138, 43, 61, ${Math.random() * 0.5 + 0.1})`;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
      if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Create particles
  const particles = [];
  const particleCount = Math.floor(canvas.width / 10);

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Mouse interaction
  let mouseX = 0;
  let mouseY = 0;
  let mouseRadius = 100;

  window.addEventListener("mousemove", function (e) {
    mouseX = e.x;
    mouseY = e.y;
  });

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      // Mouse interaction
      const dx = particles[i].x - mouseX;
      const dy = particles[i].y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouseRadius) {
        particles[i].speedX = dx * 0.05;
        particles[i].speedY = dy * 0.05;
      }
    }

    requestAnimationFrame(animate);
  }

  animate();

  // Handle window resize
  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
});

// CUSTOM CURSOR
const cursor = document.querySelector(".cursor");
const cursorFollower = document.querySelector(".cursor-follower");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  setTimeout(() => {
    cursorFollower.style.left = e.clientX + "px";
    cursorFollower.style.top = e.clientY + "px";
  }, 100);
});

// Hover effects
const hoverElements = document.querySelectorAll(
  "a, button, .portfolio-item, .social-link, .filter-btn, .btn",
);

hoverElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("hover");
    cursorFollower.classList.add("hover");
  });

  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover");
    cursorFollower.classList.remove("hover");
  });
});

// THEME TOGGLE
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

// Set initial theme based on system preference
if (prefersDarkScheme.matches) {
  document.documentElement.setAttribute("data-theme", "dark");
  themeIcon.classList.remove("fa-sun");
  themeIcon.classList.add("fa-moon");
} else {
  document.documentElement.setAttribute("data-theme", "light");
  themeIcon.classList.remove("fa-moon");
  themeIcon.classList.add("fa-sun");
}

// Toggle theme manually
themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "light");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  }
});

// MOBILE MENU
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const closeMenu = document.getElementById("close-menu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.add("active");
});

closeMenu.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
});

// Close menu when clicking on links
const mobileLinks = document.querySelectorAll(".mobile-links a");
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });
});

// NAVBAR SCROLL EFFECT
const nav = document.querySelector("nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

//SCROLLING
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      });

      // update active link
      document
        .querySelectorAll(".nav-links a, .mobile-links a")
        .forEach((link) => {
          link.classList.remove("active");
        });
      this.classList.add("active");
    }
  });
});

// ACTIVE LINK ON SCROLL
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a, .mobile-links a");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop - 300) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// PORTFOLIO FILTER
const filterBtns = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    //remove active class from all buttons
    filterBtns.forEach((b) => b.classList.remove("active"));

    // add active class to clicked button
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    portfolioItems.forEach((item) => {
      if (filter === "all" || item.getAttribute("data-category") === filter) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// SKILL BAR ANIMATION
const skillBars = document.querySelectorAll(".skill-progress");

function animateSkillBars() {
  skillBars.forEach((bar) => {
    const width = bar.getAttribute("data-width");
    bar.style.width = width + "%";
  });
}

//animate when in viewport
const skillsSection = document.getElementById("skills");
const skillsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSkillBars();
        skillsObserver.unobserve(skillsSection);
      }
    });
  },
  { threshold: 0.2 },
);

skillsObserver.observe(skillsSection);

//auto slide
setInterval(() => {
  showSlide(currentSlide);
}, 5000);

// BACK TO TOP BUTTON
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 500) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// VALIDASI FORM
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = true;

  // reset errors
  document.querySelectorAll(".form-error").forEach((error) => {
    error.style.display = "none";
  });

  //validasi nama
  const name = document.getElementById("name");
  if (name.value.trim() === "") {
    document.getElementById("name-error").textContent = "Nama wajib diisi";
    document.getElementById("name-error").style.display = "block";
    isValid = false;
  }

  //validasi email
  const email = document.getElementById("email");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value.trim() === "") {
    document.getElementById("email-error").textContent = "Email wajib diisi";
    document.getElementById("email-error").style.display = "block";
    isValid = false;
  } else if (!emailRegex.test(email.value)) {
    document.getElementById("email-error").textContent = "Email tidak valid";
    document.getElementById("email-error").style.display = "block";
    isValid = false;
  }

  //validasi subjek
  const subject = document.getElementById("subject");
  if (subject.value.trim() === "") {
    document.getElementById("subject-error").textContent = "Subjek wajib diisi";
    document.getElementById("subject-error").style.display = "block";
    isValid = false;
  }

  //validasi pesan
  const message = document.getElementById("message");
  if (message.value.trim() === "") {
    document.getElementById("message-error").textContent = "Pesan wajib diisi";
    document.getElementById("message-error").style.display = "block";
    isValid = false;
  }

  // If valid, submit form
  if (isValid) {
    // ala ala hehe
    alert("Pesan berhasil dikirim! Saya akan menghubungi Anda segera.");
    contactForm.reset();
  }
});

// ANIMATE ON SCROLL
const animatedElements = document.querySelectorAll(".portfolio-item");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 },
);

animatedElements.forEach((element) => {
  observer.observe(element);
});
