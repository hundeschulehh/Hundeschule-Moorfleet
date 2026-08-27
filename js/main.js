/* ============================================
   Hundeschule Moorfleet – main.js
   Kein Tracking, keine externen Aufrufe.
   ============================================ */

(function () {
  "use strict";

  // Mobiles Menü ein-/ausklappen
  var navToggle = document.querySelector(".nav-toggle");
  var mainNav = document.querySelector(".main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Menü schließen, wenn ein Link angeklickt wird (mobile)
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // FAQ-Akkordeon
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    var question = item.querySelector(".faq-q");
    var answer = item.querySelector(".faq-a");
    if (!question || !answer) return;

    question.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");

      // Optional: andere offenen Einträge im selben Akkordeon schließen
      var parent = item.closest(".faq-list");
      if (parent) {
        parent.querySelectorAll(".faq-item.open").forEach(function (openItem) {
          if (openItem !== item) {
            openItem.classList.remove("open");
            var openAnswer = openItem.querySelector(".faq-a");
            if (openAnswer) openAnswer.style.maxHeight = null;
            var openQ = openItem.querySelector(".faq-q");
            if (openQ) openQ.setAttribute("aria-expanded", "false");
          }
        });
      }

      if (isOpen) {
        item.classList.remove("open");
        answer.style.maxHeight = null;
        question.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + "px";
        question.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Aktuelles Jahr im Footer
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Kontaktformular: da statisch gehostet (kein Server-Backend),
  // öffnet das Formular den E-Mail-Client mit vorausgefüllter Nachricht.
  var contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var anliegen = contactForm.anliegen ? contactForm.anliegen.value : "";
      var name = contactForm.name ? contactForm.name.value.trim() : "";
      var kontaktdaten = contactForm.kontaktdaten ? contactForm.kontaktdaten.value.trim() : "";
      var nachricht = contactForm.nachricht ? contactForm.nachricht.value.trim() : "";
      var kontaktweg = contactForm.kontaktweg ? contactForm.kontaktweg.value : "";

      var subject = "Anfrage über die Website: " + anliegen;
      var bodyLines = [
        "Anliegen: " + anliegen,
        "Name: " + name,
        "Telefon/E-Mail: " + kontaktdaten,
        "Gewünschter Kontaktweg: " + kontaktweg,
        "",
        "Nachricht:",
        nachricht || "(keine Angabe)"
      ];
      var body = bodyLines.join("\n");

      var mailto = "mailto:info@hundeschule-moorfleet.de" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      window.location.href = mailto;
    });
  }
})();
