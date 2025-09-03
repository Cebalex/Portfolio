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

        // Nested lookup
        if (translations[lang][type] && translations[lang][type][key]) {
          el.innerHTML = translations[lang][type][key];
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