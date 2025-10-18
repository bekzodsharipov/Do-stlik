document.addEventListener("DOMContentLoaded", function () {
  const event__img_box = document.querySelector(".event__img_box");
  setTimeout(() => {
    event__img_box.innerHTML = `
      <div class="swiper mySwiper">
                      <div class="swiper-wrapper">
                          <div class="swiper-slide">
                              <img src="./images/house1.avif" alt="house" class="event__house_img" decoding="async"
                                  loading="lazy" width="359" height="2">
                          </div>
                          <div class="swiper-slide">
                              <img src="./images/house1.avif" alt="house" class="event__house_img" decoding="async"
                                  loading="lazy" width="359" height="2">
                          </div>
                          <div class="swiper-slide">
                              <img src="./images/house1.avif" alt="house" class="event__house_img" decoding="async"
                                  loading="lazy" width="359" height="2">
                          </div>
                      </div>
                      <div class="swiper-pagination"></div>
                  </div>
    `;

    var swiper = new Swiper(".mySwiper", {
      autoplay: {
        loop: true,
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
      },
    });
  }, 1000);

  // === Elementlar ===
  const registerBtns = document.querySelectorAll(".registerBtn");
  const modal = document.getElementById("registrationModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const modalOverlay = document.querySelector(".homeModalOverlay");
  const form = document.getElementById("registrationForm");

  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const cityInput = document.getElementById("city");

  const nameError = document.getElementById("nameError");
  const phoneError = document.getElementById("phoneError");
  const cityError = document.getElementById("cityError");

  const submitBtn = document.getElementById("submitBtn");

  // Mamlakat tanlovchi
  const selectedCountry = document.getElementById("selectedCountry");
  const selectedCountryCode = document.getElementById("selectedCountryCode");
  const countryDropdown = document.getElementById("countryDropdown");
  const dropdownIcon = document.getElementById("dropdownIcon");

  // === Mamlakatlar ro'yxati va formatlash ===
  const COUNTRIES = [
    { name: "Uzbekistan", code: "+998" },
    { name: "AQSH", code: "+1" },
    { name: "Janubiy Koreya", code: "+82" },
    { name: "Qirg’iziston", code: "+996" },
    { name: "Qozog’iston", code: "+7" },
    { name: "Tojikiston", code: "+992" },
    { name: "Turkmaniston", code: "+993" },
    { name: "Polsha", code: "+48" },
  ];

  const PHONE_RULES = {
    "+998": {
      placeholder: "88 888 88 88",
      format(d) {
        let s = "";
        if (d.length > 0) s += d.slice(0, Math.min(2, d.length));
        if (d.length > 2) s += " " + d.slice(2, Math.min(5, d.length));
        if (d.length > 5) s += " " + d.slice(5, Math.min(7, d.length));
        if (d.length > 7) s += " " + d.slice(7, Math.min(9, d.length));
        return s;
      },
      validate(v) {
        return /^\d{2} \d{3} \d{2} \d{2}$/.test(v);
      },
    },
    "+1": {
      placeholder: "555 123 4567",
      format(d) {
        let s = "";
        if (d.length > 0) s += d.slice(0, Math.min(3, d.length));
        if (d.length > 3) s += " " + d.slice(3, Math.min(6, d.length));
        if (d.length > 6) s += " " + d.slice(6, Math.min(10, d.length));
        return s;
      },
      validate(v) {
        return /^\d{3} \d{3} \d{4}$/.test(v);
      },
    },
    "+82": {
      placeholder: "10 1234 5678",
      format(d) {
        let s = "";
        if (d.length > 0) s += d.slice(0, Math.min(2, d.length));
        if (d.length > 2) s += " " + d.slice(2, Math.min(6, d.length));
        if (d.length > 6) s += " " + d.slice(6, Math.min(10, d.length));
        return s;
      },
      validate(v) {
        return /^\d{2} \d{4} \d{4}$/.test(v);
      },
    },
    "+996": {
      placeholder: "555 123 456",
      format(d) {
        let s = "";
        if (d.length > 0) s += d.slice(0, Math.min(3, d.length));
        if (d.length > 3) s += " " + d.slice(3, Math.min(6, d.length));
        if (d.length > 6) s += " " + d.slice(6, Math.min(9, d.length));
        return s;
      },
      validate(v) {
        return /^\d{3} \d{3} \d{3}$/.test(v);
      },
    },
    "+7": {
      placeholder: "700 123 4567",
      format(d) {
        let s = "";
        if (d.length > 0) s += d.slice(0, Math.min(3, d.length));
        if (d.length > 3) s += " " + d.slice(3, Math.min(6, d.length));
        if (d.length > 6) s += " " + d.slice(6, Math.min(10, d.length));
        return s;
      },
      validate(v) {
        return /^\d{3} \d{3} \d{4}$/.test(v);
      },
    },
    "+992": {
      placeholder: "55 555 5555",
      format(d) {
        let s = "";
        if (d.length > 0) s += d.slice(0, Math.min(2, d.length));
        if (d.length > 2) s += " " + d.slice(2, Math.min(5, d.length));
        if (d.length > 5) s += " " + d.slice(5, Math.min(9, d.length));
        return s;
      },
      validate(v) {
        return /^\d{2} \d{3} \d{4}$/.test(v);
      },
    },
    "+993": {
      placeholder: "6 123 4567",
      format(d) {
        let s = "";
        if (d.length > 0) s += d.slice(0, Math.min(1, d.length));
        if (d.length > 1) s += " " + d.slice(1, Math.min(4, d.length));
        if (d.length > 4) s += " " + d.slice(4, Math.min(8, d.length));
        return s;
      },
      validate(v) {
        return /^\d{1} \d{3} \d{4}$/.test(v);
      },
    },
    "+48": {
      placeholder: "123 456 789",
      format(d) {
        let s = "";
        if (d.length > 0) s += d.slice(0, Math.min(3, d.length));
        if (d.length > 3) s += " " + d.slice(3, Math.min(6, d.length));
        if (d.length > 6) s += " " + d.slice(6, Math.min(9, d.length));
        return s;
      },
      validate(v) {
        return /^\d{3} \d{3} \d{3}$/.test(v);
      },
    },
  };

  let currentCode = "+998";

  // === Helperlar ===
  function setCountry(c) {
    currentCode = c.code;
    selectedCountryCode.textContent = c.code;
    countryDropdown.style.display = "none";
    const rule = PHONE_RULES[c.code] || PHONE_RULES["+998"];
    phoneInput.placeholder = rule.placeholder;
    phoneInput.value = "";
    phoneError.style.display = "none";
    dropdownIcon.innerHTML = ""; // faqat svg ichidagi polyline o'zgaradi, default ko'rinish qoldiriladi
  }

  function renderCountryDropdown() {
    countryDropdown.innerHTML = "";
    COUNTRIES.forEach((c) => {
      const div = document.createElement("div");
      div.className = "country-option";
      if (c.code === currentCode) div.classList.add("selected");
      div.innerHTML = `
        <span>${c.name}</span>
        <span class="country-code">${c.code}</span>
        ${c.code === currentCode
          ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'
          : ""
        }
      `;
      div.addEventListener("click", () => setCountry(c));
      countryDropdown.appendChild(div);
    });
  }

  function openModal() {
    modal.style.display = "block";
    document.body.style.overflowY = "hidden";
  }
  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflowY = "scroll";
  }

  function formatByCountry(raw, code) {
    const digits = raw.replace(/\D/g, "");
    return (PHONE_RULES[code] || PHONE_RULES["+998"]).format(digits);
  }

  function validatePhoneStr(code, value) {
    return (PHONE_RULES[code] || PHONE_RULES["+998"]).validate(value);
  }

  function show(el) {
    el.style.display = "block";
  }
  function hide(el) {
    el.style.display = "none";
  }

  // === Eventlar ===
  selectedCountry.addEventListener("click", function () {
    if (countryDropdown.style.display === "block") {
      countryDropdown.style.display = "none";
      dropdownIcon.innerHTML = '<polyline points="6 9 12 15 18 9"></polyline>';
    } else {
      renderCountryDropdown();
      countryDropdown.style.display = "block";
      dropdownIcon.innerHTML = '<polyline points="18 15 12 9 6 15"></polyline>';
    }
  });

  // Dropdown tashqarisiga bosilganda yopish
  document.addEventListener("click", function (e) {
    if (
      !selectedCountry.contains(e.target) &&
      !countryDropdown.contains(e.target)
    ) {
      countryDropdown.style.display = "none";
      dropdownIcon.innerHTML = '<polyline points="6 9 12 15 18 9"></polyline>';
    }
  });

  // Telefon input formatlash
  phoneInput.addEventListener("input", function (e) {
    const formatted = formatByCountry(e.target.value, currentCode);
    phoneInput.value = formatted;
    hide(phoneError);
  });

  // Raqamga faqat son kiritishni cheklash (bo'sh joylar qoladi)
  phoneInput.addEventListener("keypress", function (e) {
    const char = String.fromCharCode(e.which);
    if (!/\d/.test(char)) {
      e.preventDefault();
    }
  });

  // Xatolarni kiritishda yashirish
  nameInput.addEventListener("input", () => hide(nameError));
  cityInput.addEventListener("input", () => hide(cityError));

  // Modal boshqaruvi
  registerBtns.forEach((btn) => btn.addEventListener("click", openModal));
  closeModalBtn.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", closeModal);

  // ESC bilan yopish
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "block") closeModal();
  });

  // Submit
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Trimlangan qiymatlar
    const nameVal = nameInput.value.trim();
    const phoneVal = phoneInput.value.trim();
    const cityVal = cityInput.value.trim();

    // Validatsiya: nom
    if (!nameVal) {
      show(nameError);
      hide(phoneError);
      show(cityError); // city ham talab qilinadi
      cityError.textContent = "Iltimos, shahar yoki tumanni kiriting";
      nameInput.focus();
      return;
    } else {
      hide(nameError);
    }

    // Validatsiya: telefon
    if (!validatePhoneStr(currentCode, phoneVal)) {
      show(phoneError);
      phoneInput.focus();
      return;
    } else {
      hide(phoneError);
    }

    // Validatsiya: shahar/tuman
    if (!cityVal) {
      show(cityError);
      cityInput.focus();
      return;
    } else {
      hide(cityError);
    }

    // Yuborish holati
    submitBtn.textContent = "YUBORILMOQDA...";
    submitBtn.disabled = true;

    // Sana/soat
    const now = new Date();
    const day = now.toLocaleDateString("uz-UZ");
    const time = now.toLocaleTimeString("uz-UZ");

    // Saqlanadigan ma'lumot
    const payload = {
      name: nameVal,
      phone: `${currentCode} ${phoneVal}`,
      city: cityVal,
      SanaSoat: `${day} - ${time}`,
    };

    // LocalStorage ga yozish
    localStorage.setItem("FormData", JSON.stringify(payload));

    // Redirect
    window.location.href = "/thankYou.html";

    // UI tiklash (agar redirect bo'lmasa ham)
    submitBtn.textContent = "DAVOM ETISH";
    submitBtn.disabled = false;
    nameInput.value = "";
    phoneInput.value = "";
    cityInput.value = "";

    closeModal();
  });

  // Default mamlakat sozlash
  setCountry({ name: "Uzbekistan", code: "+998" });
});

// === Taymer ===
let totalSeconds = 120;
const timerElement = document.getElementById("timer");
const countdown = setInterval(() => {
  if (totalSeconds <= 0) {
    clearInterval(countdown);
    return;
  }
  totalSeconds--;
  const min = Math.floor(totalSeconds / 60);
  const sec = totalSeconds % 60;
  const mm = `0${min}`.slice(-2);
  const ss = `${sec}`.padStart(2, "0");
  if (timerElement) timerElement.textContent = `${mm}:${ss}`;
}, 1000);
