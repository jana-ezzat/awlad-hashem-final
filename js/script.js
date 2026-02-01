const slideImages = [
  "images/slide1.png",
  "images/slide2.png",
  "images/slide3.png",
  "images/slide4.png",
];

const slideContent = {
  badge: "يوجد شحن لجميع المحافظات للجملة فقط",
  title: "اولاد هاشم لمستحضرات<br />التجميل والعطور",
  primaryButton: "ابدأ الآن",
  primaryButtonMobile: "تحميل الآن",
  secondaryButton: "تسجيل الدخول",
};
const makeSlide = (imageUrl, index) => `
  <div class="swiper-slide" 
       style="background-image: url('${imageUrl}'), linear-gradient(#8a6a2d, #c9a23a);"
       role="group" 
       aria-label="سلايد ${index + 1} من ${slideImages.length}">
    <div class="slide-overlay"></div>
    <div class="slide-content">
      <div class="slide-badge">
        ${slideContent.badge}
      </div>
      <h1 class="slide-title">
        ${slideContent.title}
      </h1>
      <div class="slide-buttons">
        <button 
          class="btn-slide-primary"
          aria-label="${slideContent.primaryButton}">
          <span class="btn-text-desktop">${slideContent.primaryButton}</span>
          <span class="btn-text-mobile">${slideContent.primaryButtonMobile}</span>
        </button>
        <button 
          class="btn-slide-secondary"
          aria-label="${slideContent.secondaryButton}">
          ${slideContent.secondaryButton}
        </button>
      </div>
    </div>
  </div>
`;

const initSlides = () => {
  const swiperWrapper = document.querySelector(".swiper-wrapper");

  if (!swiperWrapper) {
    console.error("Swiper wrapper not found");
    return;
  }

  const slidesHTML = slideImages
    .map((image, index) => makeSlide(image, index))
    .join("");

  swiperWrapper.innerHTML = slidesHTML;
};

const initSwiper = () => {
  const swiper = new Swiper(".heroSwiper", {
    loop: true,
    speed: 500,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      prevEl: ".swiper-button-prev-custom",
      nextEl: ".swiper-button-next-custom",
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    a11y: {
      enabled: true,
      prevSlideMessage: "السلايد السابق",
      nextSlideMessage: "السلايد التالي",
      firstSlideMessage: "هذا هو السلايد الأول",
      lastSlideMessage: "هذا هو السلايد الأخير",
    },
  });

  return swiper;
};

const setNav = () => {
  const path = window.location.pathname;
  let currentPage = "home";

  if (path === "/" || path.endsWith("index.html")) {
    currentPage = "home";
  } else if (path.includes("about")) {
    currentPage = "about";
  } else if (path.includes("brands")) {
    currentPage = "brands";
  } else if (path.includes("products")) {
    currentPage = "products";
  } else if (path.includes("contact")) {
    currentPage = "contact";
  }

  const allLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");

  allLinks.forEach((link) => {
    link.classList.remove("active");
    link.removeAttribute("aria-current");

    if (link.dataset.page === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
};

const initMobileNav = () => {
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href) {
        e.preventDefault();

        const modalElement = document.getElementById("mobileMenuModal");
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }

        setTimeout(() => {
          window.location.href = href;
        }, 200);
      }
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const swiperWrapper = document.querySelector(".swiper-wrapper");
  if (swiperWrapper) {
    initSlides();
    initSwiper();
  }
  setNav();
  initMobileNav();
});