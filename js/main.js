/* ------------------- navigation menu ----------------- */
(() => {
  const hamburgerBtn = document.querySelector(".hamburger-btn"),
    navMenu = document.querySelector(".nav-menu"),
    closeNavBtn = document.querySelector(".close-nav-menu");

  hamburgerBtn.addEventListener("click", showNavMenu);
  closeNavBtn.addEventListener("click", hideNavMenu);

  function showNavMenu() {
    navMenu.classList.add("open");
    bodyScrollingToggle();
  }

  function hideNavMenu() {
    navMenu.classList.remove("open");
    fadeOutEffect();
    bodyScrollingToggle();
  }

  function fadeOutEffect() {
    document.querySelector(".fade-out-effect").classList.add("active");
    setTimeout(() => {
      document.querySelector(".fade-out-effect").classList.remove("active");
    }, 300);
  }
  // attach an event handler to document
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("link-item")) {
      // make sure event.target.hash has a value before overriding default behavior
      if (event.target.hash !== "") {
        // prevent default anchor click behavior
        event.preventDefault();
        const hash = event.target.hash;
        // deactivate existing active "section"
        document.querySelector(".section.active").classList.add("hide");
        document.querySelector(".section.active").classList.remove("active");
        // activate new section
        document.querySelector(hash).classList.add("active");
        document.querySelector(hash).classList.remove("hide");
        // deactivate existing active navigation menu "link-item"
        navMenu
          .querySelector(".active")
          .classList.add("outer-shadow", "hover-in-shadow");
        navMenu
          .querySelector(".active")
          .classList.remove("active", "inner-shadow");
        // if clicked link-item is inside of a navigation section
        if (navMenu.classList.contains("open")) {
          // activate new navigation menu "link-item"
          event.target.classList.add("active", "inner-shadow");
          event.target.classList.remove("outer-shadow", "hover-in-shadow");
          // hide navigation menu
          hideNavMenu();
        } else {
          let navItems = navMenu.querySelectorAll(".link-item");
          navItems.forEach((item) => {
            if (hash === item.hash) {
              // activate the new navigation menu "link-item"
              item.classList.add("active", "inner-shadow");
              item.classList.remove("outer-shadow", "hover-in-shadow");
            }
          });
          fadeOutEffect();
        }
        // add hash (#) to url
        window.location.hash = hash;
      }
    }
  });
})();

/* ------------------- about section tabs ----------------- */
(() => {
  const aboutSection = document.querySelector(".about-section"),
    tabsContainer = document.querySelector(".about-tabs");

  tabsContainer.addEventListener("click", (event) => {
    /* if event.target contains 'tab-item' class and doesnt 
    contain 'active' class */
    if (
      event.target.classList.contains("tab-item") &&
      !event.target.classList.contains("active")
    ) {
      const target = event.target.getAttribute("data-target");
      // deactivate existing active 'tab-item'
      tabsContainer
        .querySelector(".active")
        .classList.remove("outer-shadow", "active");
      //  activate new "tab-item"
      event.target.classList.add("outer-shadow", "active");
      //  deactivate existing active 'tab-conent'
      aboutSection
        .querySelector(".tab-content.active")
        .classList.remove("active");
      //  activate new "tab-content"
      aboutSection.querySelector(target).classList.add("active");
    }
  });
})();

function bodyScrollingToggle() {
  document.body.classList.toggle("hidden-scrolling");
}

/*-------------------- portfolio filter and popup ------------------- */

(() => {
  const filterContainer = document.querySelector(".portfolio-filter"),
    portfolioItemsContainer = document.querySelector(".portfolio-items"),
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    popup = document.querySelector(".portfolio-popup"),
    prevBtn = popup.querySelector(".pp-prev"),
    nextBtn = popup.querySelector(".pp-next"),
    closeBtn = popup.querySelector(".pp-close"),
    projectDetailsContainer = popup.querySelector(".pp-details"),
    projectDeatailsBtn = popup.querySelector(".pp-project-details-btn");

  let itemIndex, slideIndex, screenshots;

  // filter portfolio items ----

  filterContainer.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("filter-item") &&
      !event.target.classList.contains("active")
    ) {
      // deactivate existing active 'filter-item'
      filterContainer
        .querySelector(".active")
        .classList.remove("outer-shadow", "active");

      // add 'active' class to clicked 'filter-item'
      event.target.classList.add("active", "outer-shadow");
      const target = event.target.getAttribute("data-target");

      portfolioItems.forEach((item) => {
        if (target === item.getAttribute("data-category") || target === "all") {
          item.classList.remove("hide");
          item.classList.add("show");
        } else {
          item.classList.remove("show");
          item.classList.add("hide");
        }
      });
    }
  });

  portfolioItemsContainer.addEventListener("click", (event) => {
    if (event.target.closest(".portfolio-item-inner")) {
      const portfolioItem = event.target.closest(".portfolio-item-inner")
        .parentElement;

      // get the portfolioIntem index
      itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(
        portfolioItem
      );

      // get screenshots
      screenshots = portfolioItems[itemIndex]
        .querySelector(".portfolio-item-img img")
        .getAttribute("data-screenshots");

      // convert screenshots to arrays
      screenshots = screenshots.split(",");

      if (screenshots.length === 1) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
      } else {
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
      }

      slideIndex = 0;
      popupToggle(); // displays/hides the popup.
      popupSlideShow(); // controls the slideshow
      popupDetails(); // loads project details for each project in the popup detail section
    }
  });

  // popup toggle function
  function popupToggle() {
    popup.classList.toggle("open");
    bodyScrollingToggle();
  }

  // close popup button
  closeBtn.addEventListener("click", () => {
    popupToggle();
    if (projectDetailsContainer.classList.contains("active")) {
      popupDetailsToggle();
    }
  });

  function popupSlideShow() {
    const imgSrc = screenshots[slideIndex];
    const popupImg = popup.querySelector(".pp-img");

    // active loader until the popupImg loaded
    popup.querySelector(".pp-loader").classList.add("active");

    // set img source
    popupImg.src = imgSrc;

    //  deactivate loader after the popupImg
    popupImg.onload = () => {
      popup.querySelector(".pp-loader").classList.remove("active");
    };

    // slider paganation
    popup.querySelector(".pp-counter").innerHTML = `${slideIndex + 1} of ${
      screenshots.length
    }`;
  }

  // next slide
  nextBtn.addEventListener("click", () => {
    if (slideIndex === screenshots.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    popupSlideShow();
  });

  // prev slide

  prevBtn.addEventListener("click", () => {
    if (slideIndex === 0) {
      slideIndex = screenshots.length - 1;
    } else {
      slideIndex--;
    }
    popupSlideShow();
  });

  // popup detail data loader for each project
  function popupDetails() {
    // get the project title
    const title = portfolioItems[itemIndex].querySelector(
      ".portfolio-item-title"
    ).innerHTML;

    // set the project tittle
    popup.querySelector(".pp-title h2").innerHTML = title;

    // check to see if project has details to show, if not, hide button
    if (!portfolioItems[itemIndex].querySelector(".portfolio-item-details")) {
      projectDeatailsBtn.style.display = "none";
      return; // ends function execution
    }
    // get the project details
    const details = portfolioItems[itemIndex].querySelector(
      ".portfolio-item-details"
    ).innerHTML;

    // set the project details
    popup.querySelector(".pp-project-details").innerHTML = details;

    // get the project category
    const category = portfolioItems[itemIndex].getAttribute("data-category");

    // set the project category
    popup.querySelector(".pp-project-category").innerHTML = category
      .split("-")
      .join(" ");
  }

  // project details button
  projectDeatailsBtn.addEventListener("click", () => {
    popupDetailsToggle();
  });

  function popupDetailsToggle() {
    projectDeatailsBtn.querySelector("i").classList.remove("fa-minus");
    projectDeatailsBtn.querySelector("i").classList.add("fa-plus");
    if (projectDetailsContainer.classList.contains("active")) {
      projectDetailsContainer.classList.remove("active");
      projectDetailsContainer.style.maxHeight = `0px`;
    } else {
      projectDeatailsBtn.querySelector("i").classList.remove("fa-plus");
      projectDeatailsBtn.querySelector("i").classList.add("fa-minus");
      projectDetailsContainer.classList.add("active");
      projectDetailsContainer.style.maxHeight =
        projectDetailsContainer.scrollHeight + "px";
      popup.scrollTo(0, projectDetailsContainer.offsetTop);
    }
  }
})();

/* -------------------- testimonial slider ---------------------*/

(() => {
  const sliderContainer = document.querySelector(".testi-slider-container"),
    slides = sliderContainer.querySelectorAll(".testi-item");
  slideWidth = sliderContainer.offsetWidth;
  (prevBtn = document.querySelector(".testi-slider-nav .prev")),
    (nextBtn = document.querySelector(".testi-slider-nav .next")),
    (activeSlide = document.querySelector(".testi-item.active"));
  let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(
    activeSlide
  );

  // set width of all slides
  slides.forEach((slide) => {
    slide.style.width = `${slideWidth}px`;
  });

  // set width of slider container
  sliderContainer.style.width = slideWidth * slides.length + "px";

  nextBtn.addEventListener("click", () => {
    if (slideIndex === slides.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    slider();
  });

  prevBtn.addEventListener("click", () => {
    if (slideIndex === 0) {
      slideIndex = slides.length - 1;
    } else {
      slideIndex--;
    }
    slider();
  });

  function slider() {
    // deactivate existing active slides
    sliderContainer
      .querySelector(".testi-item.active")
      .classList.remove("active");
    // activate new slide
    slides[slideIndex].classList.add("active");
    sliderContainer.style.marginLeft = -(slideWidth * slideIndex) + "px";
  }

  slider();
})();

/*---------------- hide all sections except active ------------------------ */

(() => {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    if (!section.classList.contains("active")) {
      section.classList.add("hide");
    }
  });
})();

window.addEventListener("load", () => {
  document.querySelector(".preloader").classList.add("fade-out");
  setTimeout(() => {
    document.querySelector(".preloader").style.display = "none";
  }, 600);
});
