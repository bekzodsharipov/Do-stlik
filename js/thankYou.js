const SHEET_URL = "https://script.google.com/macros/s/AKfycbwsZnuwGig-uKcU9q24WBA0QQSVXYjaRDrEwu7oztcJ0W49u_fk_a5ApLXy1Na2RyLh/exec";

async function sendFormData() {
  const o = localStorage.getItem("FormData");
  if (!o) return void console.log("Ma'lumotlar yo‘q");

  const t = JSON.parse(o);

  const a = new FormData();
  a.append("Ism", t.name);
  a.append("Telefon raqam", t.phone);
  a.append("Shahar/Tuman", t.city || ""); 
  a.append("Royhatdan o'tgan vaqti", t.time);

  try {
    const [sheetRes] = await Promise.all([
      fetch(SHEET_URL, { method: "POST", body: a }),
    ]);

    if (!sheetRes.ok) throw new Error("Google Sheet API response was not ok");

    console.log("Ma'lumotlar muvaffaqiyatli yuborildi ✅");
    localStorage.removeItem("FormData");
  } catch (err) {
    console.error("Form yuborishda xatolik:", err);
    const el = document.getElementById("errorMessage");
    if (el) el.style.display = "block";
  }
}

window.onload = () => {
  sendFormData();
};
