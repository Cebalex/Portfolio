const langSelect = document.getElementById("lang-select");
const elements = document.querySelectorAll("[data-translate]");

// Load translations from JSON
async function loadTranslations(lang) {
  try {
    const res = await fetch("assets/lang/translations.json");
    const translations = await res.json();

    if (translations[lang]) {
      elements.forEach(el => {
        const type = el.getAttribute("data-type") || "default";
        const key = el.getAttribute("data-translate");

        if (translations[lang][type] && translations[lang][type][key]) {
          const translatedText = translations[lang][type][key];

          // Handle different element types
          if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
            if (el.hasAttribute("placeholder")) {
              el.placeholder = translatedText; // for text fields
            }
            if (el.type === "submit" || el.type === "button"  || el.type === "reset") {
              el.value = translatedText; // for submit/button inputs
            }
          } else if (el.tagName === "BUTTON") {
            el.textContent = translatedText; // for <button> tags
          } else if (el.tagName === "IMG") {
            if (el.hasAttribute("alt")) {
              el.alt = translatedText; // for image alt text
            }
          } else {
            el.innerHTML = translatedText; // default case (labels, spans, divs…)
          }
        }
      });
    }
  } catch (err) {
    console.error("Error loading translations:", err);
  }
}

// Load saved language or default to English
const savedLang = localStorage.getItem("siteLang") || "en";
langSelect.value = savedLang;
loadTranslations(savedLang);

// Handle user changing language
langSelect.addEventListener("change", (e) => {
  const selectedLang = e.target.value;
  localStorage.setItem("siteLang", selectedLang);
  loadTranslations(selectedLang);
});