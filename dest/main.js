/* SHOW BTN UP AND CHANGE BG */
function showBtnUpAndChangeBg() {
  const buttonUp = document.querySelector(".footer__bottom-btnup");
  const header = document.querySelector(".header");
  if (window.scrollY >= header.scrollHeight) {
    buttonUp.classList.add("--showBtnUp");
    buttonUp.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
    header.classList.add("--bg-dark");
  } else {
    buttonUp?.classList.remove("--showBtnUp");
    header.classList.remove("--bg-dark");
  }
}

/* HANDLE MENU MOBILE */
function handleMenuMobile() {
  const btnMenu = document.querySelector(".header__cta-btnmenu");
  const nav = document.querySelector(".navmenu");
  const navMobile = document.querySelectorAll(".navmenu .navmenu__btn .btn");
  const headerMobile = document.querySelector(".header");

  btnMenu.addEventListener("click", () => {
    btnMenu.classList.toggle("active-menu");
    nav.classList.toggle("active-nav");
    headerMobile.classList.remove("--bg-dark");
  });

  // Hide Menu
  const hideMenu = () => {
    btnMenu.classList.remove("active-menu");
    nav.classList.remove("active-nav");
  };

  // Resize Window
  window.addEventListener("resize", () => {
    let widthWindow = window.innerWidth;
    if (widthWindow > 992) {
      hideMenu();
    }
  });

  function removeActive() {
    navMobile.forEach((el) => {
      el.classList.remove("--active");
    });
  }

  navMobile.forEach((btn) => {
    if (btn.href == window.location.href) {
      removeActive();
      btn.classList.add("--active");
    }
  });
}
handleMenuMobile();

/* HANDLE MENU HEADER */
function handleMenuHeader() {
  const headerMenu = document.querySelectorAll(".header .header__menu li a");

  function removeActive() {
    headerMenu.forEach((el) => {
      el.classList.remove("--active-nav");
    });
  }

  headerMenu.forEach((btn) => {
    if (btn.href == window.location.href) {
      removeActive();
      btn.classList.add("--active-nav");
    }
  });
}
handleMenuHeader();

function handleItemUsersSayHeight() {
  const textElements = document.querySelectorAll(".userssay__bottom-item .text");
  let height = 0;
  textElements.forEach((elem) => {
    let heightMax = elem.offsetHeight;
    if (heightMax > height) {
      height = heightMax;
    }
  });
  textElements.forEach((elem) => {
    elem.style.height = `${height}px`;
  });
}

/* HANDLE USERS SAY */
function handleUsersSay() {
  var slider = document.querySelector(".userssay .userssay__bottom");
  if (slider) {
    const flktySlider = new FlickityResponsive(slider, {
      cellAlign: "center",
      contain: true,
      prevNextButtons: false,
      wrapAround: true,
      groupCells: 2,
      on: {
        ready: function () {
          console.log("Flickity is ready");
          handleItemUsersSayHeight();
        },
        resize: function () {
          handleItemUsersSayHeight();
        },
      },
      responsive: [
        {
          breakpoint: 768,
          settings: {
            cellAlign: "center",
            groupCells: 1,
          },
        },
        {
          breakpoint: 576,
          settings: {
            cellAlign: "left",
            groupCells: 1,
          },
        },
      ],
    });
  }
}

/* POPUP VIDEO */
function handlePopUp() {
  let videos = document.querySelector(".startedtoday__right");
  let modalVideo = document.querySelector(".popupvideo");
  let iframeVideo = document.querySelector(".popupvideo .popupvideo__inner .popupvideo__inner-iframe iframe");
  let closeModal = document.querySelector(".popupvideo .popupvideo__inner .popupvideo__inner-iframe .close-popupvideo");

  function closeVideo() {
    modalVideo.classList.remove("active-video");
    // Remove src when close
    iframeVideo.setAttribute(`src`, ``);
  }
  if (modalVideo) {
    //video
    videos?.addEventListener("click", () => {
      modalVideo.classList.add("active-video");
      let dataID = videos.getAttribute("data-video");
      iframeVideo.setAttribute(`src`, `https://www.youtube.com/embed/${dataID}?autoplay=1&mute=0`);
    });
    closeModal.addEventListener("click", () => {
      closeVideo();
    });
    modalVideo.addEventListener("click", () => {
      closeVideo();
    });
  }
}

/* PROGRESS SCROLL BAR */
function progressScrollBar() {
  let progress = document.querySelector(".progressbar");
  window.addEventListener("scroll", function () {
    let scrollY = window.scrollY;
    let percentScroll = (scrollY / (document.body.offsetHeight - window.innerHeight)) * 100;
    progress.style.width = `${percentScroll}%`;
  });
}

/* LOADING PAGE */
function initLoading() {
  /*  */
  let loadedCount = 0;
  let images = document.querySelectorAll("img").length;
  let body = document.querySelector("body");

  let imgLoad = new imagesLoaded(body);
  imgLoad
    .on("progress", function (instance) {
      console.log(loadedCount++);
      // console.log(instance);
      let percent = Math.round((loadedCount / images) * 100);
      loadingHandle(percent);
    })
    .on("always", function (instance) {
      console.log("always");
      // hideLoading();
    })
    .on("fail", function (instance) {
      console.log("Image load failed for " + instance);
    })
    .on("done", function (instance) {
      console.log("done");
      hideLoading();
    });

  function loadingHandle(percent) {
    const progress = document.querySelector(".loading__inner-progress");
    const percentNumber = document.querySelector(".loading__percent");
    progress.style.width = `${percent}%`;
    percentNumber.textContent = `${percent}%`;
  }

  function hideLoading() {
    const body = document.querySelector("body");
    body.classList.add("--is-loaded");
  }
}

/* HANDLE TABS */
function handleTabs() {
  let tabsNews = document.querySelectorAll(".btn.--tab");
  let listNews = document.querySelectorAll(".news__list");
  tabsNews.forEach(function (tab) {
    tab.addEventListener("click", function () {
      // Remove --active-tab
      tabsNews.forEach(function (tab) {
        tab.classList.remove("--active-tab");
      });
      // Add class active to the clicked tab
      this.classList.add("--active-tab");
      // Hide all new list
      listNews.forEach(function (listNew) {
        listNew.classList.remove("--active-grid");
      });
      // Get ID
      let id = this.dataset.tab;
      // Show only one list with related ID
      document.querySelector(".news__list--" + id).classList.add("--active-grid");
    });
  });
}
handleTabs();

/* ACCORDION */
function handleAccordion() {
  const toggle = document.querySelectorAll(".faqs .faqs__item .textbox"),
    faqsItem = document.querySelectorAll(".faqs .faqs__item"),
    desc = document.querySelectorAll(".faqs .faqs__item .desc");

  function removeActive() {
    faqsItem.forEach((el) => {
      el.classList.remove("--active");
    });
  }

  toggle.forEach((item, index) => {
    item.addEventListener("click", () => {
      // removeActive();
      faqsItem[index].classList.toggle("--active");
      if (desc[index].style.maxHeight) {
        desc[index].style.maxHeight = null;
      } else {
        desc[index].style.maxHeight = desc[index].scrollHeight + "px";
      }
    });
  });
  window.addEventListener("resize", () => {
    faqsItem.forEach((item, index) => {
      if (item.classList.contains("--active")) {
        desc[index].style.maxHeight = desc[index].scrollHeight + "px";
      }
    });
  });
}
handleAccordion();

// Validate Email
const validateEmail = (email) => {
  if (
    String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    return true;
  } else {
    return false;
  }
};

// Validate Name
const validateName = (name) => {
  if (/^[A-Za-z\s]+$/.test(name)) {
    return true;
  } else {
    return false;
  }
};

/* VALIDATE GET IN TOUCH */
function handleValidate() {
  const formName = document.querySelector(".getintouch-form--name input"),
    formEmail = document.querySelector(".getintouch-form--email input"),
    formSubject = document.querySelector(".getintouch-form--subject input"),
    formMess = document.querySelector(".getintouch-form--message textarea"),
    formBtn = document.querySelector(".getintouch .getintouch__wrap-left .btnmain");
  if (formName) {
    function showAlert(inputType) {
      const formAlert = document.querySelector(
        `.getintouch .getintouch__wrap-left .getintouch-form--${inputType} .form-alert`
      );

      if (inputType === "email" && formEmail.value !== "") {
        formAlert.innerText = "Enter a valid email!";
        formAlert.style.display = "block";
      } else if (inputType === "name" && formName.value !== "") {
        formAlert.innerText = "The name can't contain special characters!";
        formAlert.style.display = "block";
      } else {
        formAlert.innerText = document.querySelector(`.getintouch-form--${inputType} .form-alert`).innerText;
        formAlert.style.display = "block";
      }
    }
    function removeAlert(inputType) {
      const formAlert = document.querySelector(
        `.getintouch .getintouch__wrap-left .getintouch-form--${inputType} .form-alert`
      );
      formAlert.style.display = "none";
    }
    function removeBorder() {
      formName.style.border = "";
      formEmail.style.border = "";
      formSubject.style.border = "";
      formMess.style.border = "";
    }

    formBtn.addEventListener("click", (e) => {
      e.preventDefault();
      validateEmail(formEmail.value)
        ? ((formEmail.style.border = "1px solid #0328EE"), removeAlert("email"))
        : ((formEmail.style.border = "1px solid #EE0303"), showAlert("email"));

      formSubject.value
        ? ((formSubject.style.border = "1px solid #0328EE"), removeAlert("subject"))
        : ((formSubject.style.border = "1px solid #EE0303"), showAlert("subject"));

      validateName(formName.value)
        ? ((formName.style.border = "1px solid #0328EE"), removeAlert("name"))
        : ((formName.style.border = "1px solid #EE0303"), showAlert("name"));

      formMess.value
        ? ((formMess.style.border = "1px solid #0328EE"), removeAlert("message"))
        : ((formMess.style.border = "1px solid #EE0303"), showAlert("message"));

      if (validateEmail(formEmail.value) && formSubject.value && validateName(formName.value) && formMess.value) {
        setTimeout(() => {
          alert("Submitted!");
          formEmail.value = "";
          formSubject.value = "";
          formName.value = "";
          formMess.value = "";
          removeBorder();
        }, 500);
      }
    });
  }
}
handleValidate();

// Handle Newsletter Input
function handleNewsletterInput() {
  const form = document.querySelector(".newsletter__input"),
    formInput = document.querySelector(".newsletter__input input"),
    formAlert = document.querySelector(".newsletter__input .form-group .form-alert"),
    formBtn = document.querySelector(".newsletter__input-btn");
  if (form) {
    formBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (!formInput.value) {
        form.classList.add("--invalid");
        formAlert.classList.add("--alert");
      } else if (!validateEmail(formInput.value)) {
        form.classList.add("--invalid");
        formAlert.classList.add("--alert");
        formAlert.innerText = "Enter a valid email!";
      } else {
        form.classList.remove("--invalid");
        formAlert.classList.remove("--alert");
        setTimeout(() => {
          formInput.value = "";
          alert("Subscribed!");
        }, 500);
      }
    });
  }
}
handleNewsletterInput();

document.addEventListener("DOMContentLoaded", () => {
  initLoading();
  progressScrollBar();
  handleUsersSay();
  handlePopUp();
});

window.addEventListener("load", () => {
  initLoading();
  progressScrollBar();
  handleUsersSay();
  handlePopUp();
});

window.onscroll = () => {
  showBtnUpAndChangeBg();
};
