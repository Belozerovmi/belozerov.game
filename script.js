function switchPage(pageId) {
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active-page"));
  document.getElementById(pageId + "-page").classList.add("active-page");
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active");
    if (btn.getAttribute("data-page") === pageId) btn.classList.add("active");
  });
  closeMobileMenu();
}

function openMobileMenu() {
  mobileMenu.classList.add("open");
  burgerBtn.classList.add("active");
}
function closeMobileMenu() {
  mobileMenu.classList.remove("open");
  burgerBtn.classList.remove("active");
}
function toggleMobileMenu() {
  if (mobileMenu.classList.contains("open")) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

const burgerBtn = document.getElementById("burgerBtn");
const closeMenuBtn = document.getElementById("closeMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

burgerBtn?.addEventListener("click", toggleMobileMenu);
closeMenuBtn?.addEventListener("click", closeMobileMenu);

document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    switchPage(btn.getAttribute("data-page"));
  });
});

document
  .getElementById("goToRulesBtn")
  ?.addEventListener("click", () => switchPage("rules"));
document
  .getElementById("goToFatherBtn")
  ?.addEventListener("click", () => switchPage("father"));

function toggleTheme() {
  document.body.classList.toggle("dark");
}
document
  .getElementById("themeToggleDesktop")
  ?.addEventListener("click", toggleTheme);
document
  .getElementById("themeToggleMobile")
  ?.addEventListener("click", toggleTheme);

// Замените существующий обработчик формы (примерно строка 570-620) на этот:
document
  .getElementById("feedbackForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("fbName").value.trim();
    const message = document.getElementById("fbMessage").value.trim();
    const resultDiv = document.getElementById("feedbackResult");

    // Проверка на пустое имя
    if (!name) {
      resultDiv.innerText = "Пожалуйста, введите имя!";
      resultDiv.style.color = "#c0392b";
      return;
    }

    // Проверка на пустое сообщение
    if (!message) {
      resultDiv.innerText = "Напишите что-нибудь :)";
      resultDiv.style.color = "#c0392b";
      return;
    }

    resultDiv.innerText = "Отправляем...";
    resultDiv.style.color = "var(--text-soft)";

    const SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbyW1kbVeyLtwzLME9slqFMwh5cVnAthh0G7ZTDu0gvTSu8d26W0FAR5Egy0ZkK6Ng2Aaw/exec";

    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, message: message }),
      });

      resultDiv.innerText = `Спасибо, ${name}! Кот уже утащил ваше пожелание и ждёт когда мы его прочитаем!`;
      resultDiv.style.color = "#2a7a2a";
      document.getElementById("fbName").value = "";
      document.getElementById("fbMessage").value = "";
    } catch (error) {
      console.error("Ошибка:", error);
      resultDiv.innerText = "Что-то пошло не так. Попробуйте позже.";
      resultDiv.style.color = "#c0392b";
    }

    setTimeout(() => {
      if (resultDiv.innerText.includes("Спасибо")) {
        resultDiv.innerText = "";
      }
    }, 5000);
  });
if (window.innerWidth <= 800) {
  document.addEventListener("click", function (e) {
    if (
      mobileMenu.classList.contains("open") &&
      !mobileMenu.contains(e.target) &&
      !burgerBtn.contains(e.target)
    ) {
      closeMobileMenu();
    }
  });
}
// ===== ДОБАВИТЬ В КОНЕЦ СКРИПТА =====
// Сохраняем оригинальную функцию
const originalSwitchPage = switchPage;

// Переопределяем с сохранением в localStorage
switchPage = function (pageId) {
  originalSwitchPage(pageId);
  localStorage.setItem("lastPage", pageId);
};

// Восстанавливаем страницу при загрузке
(function restorePage() {
  const lastPage = localStorage.getItem("lastPage");
  if (lastPage && document.getElementById(lastPage + "-page")) {
    switchPage(lastPage);
  }
})();
// Валидация поля имени - только буквы (русские, английские) и пробелы
const nameInput = document.getElementById("fbName");

if (nameInput) {
  nameInput.addEventListener("input", function (e) {
    // Разрешаем: русские буквы (включая Ёё), английские буквы, пробел
    const allowedRegex = /[^a-zA-Zа-яА-ЯёЁ\s]/g;
    this.value = this.value.replace(allowedRegex, "");
  });

  // Дополнительная проверка при отправке формы (уже есть, но усиливаем)
  const originalSubmitHandler =
    document.getElementById("feedbackForm").onsubmit;
  document
    .getElementById("feedbackForm")
    .addEventListener("submit", function (e) {
      const name = nameInput.value.trim();
      if (name && !/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(name)) {
        e.preventDefault();
        const resultDiv = document.getElementById("feedbackResult");
        resultDiv.innerText =
          "Имя может содержать только буквы (русские или английские) и пробелы";
        resultDiv.style.color = "#c0392b";
        return false;
      }
    });
}
// ===== ОТКРЫТИЕ ПОЛИТИКИ С ПРОКРУТКОЙ ВВЕРХ =====
const legalPolicyBtn = document.getElementById("legalPolicyBtn");
if (legalPolicyBtn) {
  legalPolicyBtn.addEventListener("click", (e) => {
    e.preventDefault();
    switchPage("policy");
    // Прокручиваем страницу вверх после переключения
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 150);
  });
}

// Клик по логотипу или названию — переход на главную страницу
const logo = document.querySelector(".logo");
const logoContainer = document.querySelector(".header-flex a");

function goToHome(e) {
  e.preventDefault();
  switchPage("welcome");
  // Меняем URL без перезагрузки страницы
  if (history.pushState) {
    history.pushState(
      null,
      null,
      window.location.pathname.split("/").pop() || "index.html",
    );
  }
}

if (logoContainer) {
  logoContainer.addEventListener("click", goToHome);
} else if (logo) {
  // Если ссылки нет, вешаем на сам логотип
  logo.style.cursor = "pointer";
  logo.addEventListener("click", goToHome);
}

// ===== КНОПКА "НАВЕРХ" =====
const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    scrollBtn.classList.add("visible");
  } else {
    scrollBtn.classList.remove("visible");
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== ССЫЛКА НА ПОЛИТИКУ ИЗ СТРАНИЦЫ ОБРАТНОЙ СВЯЗИ =====
const policyLinkFromFeedback = document.getElementById(
  "policyLinkFromFeedback",
);
if (policyLinkFromFeedback) {
  policyLinkFromFeedback.addEventListener("click", (e) => {
    e.preventDefault();
    switchPage("policy");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 150);
  });
}
