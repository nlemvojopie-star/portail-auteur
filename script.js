"use strict";

/* =========================
   MENU SUR TÉLÉPHONE
   ========================= */

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");
const mobileScreen = window.matchMedia("(max-width: 800px)");

if (menuButton && navigation) {
  document.documentElement.classList.add("js");
  menuButton.hidden = false;

  function closeMenu() {
    menuButton.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  }

  menuButton.addEventListener("click", () => {
    const isOpen =
      menuButton.getAttribute("aria-expanded") === "true";

    menuButton.setAttribute("aria-expanded", String(!isOpen));

    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    const isOpen =
      menuButton.getAttribute("aria-expanded") === "true";

    if (event.key === "Escape" && isOpen) {
      closeMenu();
      menuButton.focus();
    }
  });

  document.addEventListener("click", (event) => {
    const clickedInsideNavigation =
      navigation.contains(event.target);

    const clickedMenuButton =
      menuButton.contains(event.target);

    if (!clickedInsideNavigation && !clickedMenuButton) {
      closeMenu();
    }
  });

  mobileScreen.addEventListener("change", closeMenu);
}

/* =========================
   ANNÉE DU PIED DE PAGE
   ========================= */

const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* =========================
   AGRANDISSEMENT DES COUVERTURES
   ========================= */

const coverDialog = document.querySelector("#cover-dialog");
const dialogImage = document.querySelector("#dialog-image");
const dialogTitle = document.querySelector("#dialog-title");
const closeDialogButton = document.querySelector(".dialog-close");
const coverButtons = document.querySelectorAll("[data-cover]");

let lastCoverButton = null;

if (
  coverDialog &&
  dialogImage &&
  dialogTitle &&
  closeDialogButton
) {
  function closeCover() {
    coverDialog.close();
  }

  coverButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const imagePath = button.dataset.cover;
      const bookTitle = button.dataset.title;

      if (!imagePath) {
        return;
      }

      lastCoverButton = button;

      dialogTitle.textContent =
        bookTitle || "Couverture du roman";

      dialogImage.src = imagePath;

      dialogImage.alt =
        `Couverture complète : ${bookTitle || "roman"}`;

      coverDialog.showModal();

      document.body.classList.add("modal-open");
    });
  });

  closeDialogButton.addEventListener("click", closeCover);

  coverDialog.addEventListener("click", (event) => {
    if (event.target !== coverDialog) {
      return;
    }

    const bounds = coverDialog.getBoundingClientRect();

    const clickedOutside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;

    if (clickedOutside) {
      closeCover();
    }
  });

  coverDialog.addEventListener("close", () => {
    document.body.classList.remove("modal-open");

    dialogImage.removeAttribute("src");
    dialogImage.alt = "";

    if (lastCoverButton) {
      lastCoverButton.focus();
    }
  });
}

/* Un clic sur la couverture ouverte active ou retire le zoom. */

const zoomableCover = document.querySelector("#dialog-image");
const zoomDialog = document.querySelector("#cover-dialog");

if (zoomableCover && zoomDialog) {
  zoomableCover.addEventListener("click", () => {
    zoomableCover.classList.toggle("is-zoomed");
  });

  zoomDialog.addEventListener("close", () => {
    zoomableCover.classList.remove("is-zoomed");
  });
}