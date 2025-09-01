const langSelect = document.getElementById("lang-select");
const elements = document.querySelectorAll("[data-translate]");

// Load translations from JSON
async function loadTranslations(lang) {
  try {
    const res = await fetch("assets/lang/translations.json");
    const translations = await res.json();

    if (translations[lang]) {
      elements.forEach(el => {
        const key = el.getAttribute("data-translate");
        if (translations[lang][key]) {
          el.innerHTML = translations[lang][key];
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