```javascript
document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // PASSWORD SCREEN
  // =========================

  const passwordScreen = document.getElementById("passwordScreen");
  const passwordForm = document.getElementById("passwordForm");
  const passwordInput = document.getElementById("passwordInput");
  const passwordError = document.getElementById("passwordError");
  const passwordCard = document.querySelector(".password-card");
  const websiteContent = document.getElementById("websiteContent");

  // Anniversary date password: February 25, 2026
  const correctPassword = "02252026";

  passwordForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Accepts 02252026, 02/25/2026, or 02-25-2026
    const enteredPassword = passwordInput.value.replace(/\D/g, "");

    if (enteredPassword === correctPassword) {
      passwordError.textContent = "";
      passwordScreen.hidden = true;
      websiteContent.hidden = false;

      showPage("home");
      updateTimer();

      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      passwordError.textContent =
        "That's not our special date. Try again. ♡";

      passwordCard.classList.remove("shake");
      void passwordCard.offsetWidth;
      passwordCard.classList.add("shake");

      passwordInput.value = "";
      passwordInput.focus();
    }
  });


  // =========================
  // PAGE NAVIGATION
  // =========================

  const pages = document.querySelectorAll(".page");
  const navButtons = document.querySelectorAll(".nav-btn");
  const goButtons = document.querySelectorAll("[data-go]");

  function showPage(pageName) {
    const targetPage = document.getElementById(pageName);

    if (!targetPage || !targetPage.classList.contains("page")) {
      return;
    }

    pages.forEach((page) => {
      page.classList.toggle("active", page === targetPage);
    });

    navButtons.forEach((button) => {
      button.classList.toggle(
        "active",
        button.dataset.page === pageName
      );
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      showPage(button.dataset.page);
    });
  });

  goButtons.forEach((button) => {
    button.addEventListener("click", () => {
      showPage(button.dataset.go);
    });
  });

  // Allow feature cards to work with Enter and Space
  document.querySelectorAll(".feature-card[data-go]").forEach((card) => {
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        showPage(card.dataset.go);
      }
    });
  });


  // =========================
  // ANNIVERSARY TIMER
  // =========================

  // February 25, 2026
  const anniversaryDate = new Date(2026, 1, 25, 0, 0, 0);

  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  function updateTimer() {
    const now = new Date();

    let difference = Math.max(
      0,
      now.getTime() - anniversaryDate.getTime()
    );

    const days = Math.floor(
      difference / (1000 * 60 * 60 * 24)
    );

    difference %= 1000 * 60 * 60 * 24;

    const hours = Math.floor(
      difference / (1000 * 60 * 60)
    );

    difference %= 1000 * 60 * 60;

    const minutes = Math.floor(
      difference / (1000 * 60)
    );

    difference %= 1000 * 60;

    const seconds = Math.floor(
      difference / 1000
    );

    daysElement.textContent = days;
    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;
    secondsElement.textContent = seconds;
  }

  updateTimer();
  setInterval(updateTimer, 1000);


  // =========================
  // SAVE PERSONAL MESSAGE
  // =========================

  const personalNote = document.getElementById("personalNote");
  const saveNote = document.getElementById("saveNote");
  const saveStatus = document.getElementById("saveStatus");

  if (personalNote && saveNote && saveStatus) {

    // Load the previously saved message
    try {
      personalNote.value =
        localStorage.getItem("ourPersonalNote") || "";
    } catch (error) {
      console.warn("Unable to load the saved message.");
    }

    // Save the message in this browser
    saveNote.addEventListener("click", () => {
      try {
        localStorage.setItem(
          "ourPersonalNote",
          personalNote.value
        );

        saveStatus.textContent =
          "Your message has been saved. ♡";

      } catch (error) {
        saveStatus.textContent =
          "Unable to save the message in this browser.";
      }
    });
  }

});
```