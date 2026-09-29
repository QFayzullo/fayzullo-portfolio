const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

function setMenu(open) {
    menu.classList.toggle("active", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.textContent = open ? "✕" : "☰";
}

menuBtn.addEventListener("click", () => {
    setMenu(!menu.classList.contains("active"));
});

menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => setMenu(false));
});


/* ===== LOYIHALAR ===== */
// Skrinshotlar: images/<slug>-1.png, images/<slug>-2.png ... (shots = nechta rasm)
// Rasm bo'lmasa, karta oldingi ko'rinishda (sarlavha bilan) qoladi.
const projects = [
  { slug: "agrobank", title: "Agrobank", shots: 3,
    desc: "Real server bilan ishlaydigan, multi-module arxitekturaga ega Android ilova.",
    features: [],
    tags: ["Kotlin", "Compose", "Hilt", "Retrofit"],
    link: { text: "Play Market →", href: "#" } },

  { slug: "camera", title: "CameraApp", shots: 4,
    desc: "Kamera imkoniyatlarini bir joyga yig'gan ko'p funksiyali ilova.",
    features: ["QR kodni skanerlash", "Bank kartasini skanerlash (OCR, bir necha kadr bo'yicha tekshirish)", "Yuzni aniqlash (old kamera bilan)", "Shakl va rangni aniqlash (OpenCV)"],
    tags: ["Kotlin", "Compose", "CameraX", "ML Kit", "OpenCV", "Navigation"],
    link: { text: "GitHub →", href: "#" } },

  { slug: "oshxona", title: "Oshxona", shots: 3,
    desc: "Retseptlarni ko'rish va kategoriyalar bo'yicha saralash imkonini beruvchi ilova.",
    features: ["Retseptlar ro'yxati va tasodifiy retsept", "Kategoriya bo'yicha ko'rish", "Nom va masalliq bo'yicha qidiruv"],
    tags: ["Kotlin", "Compose", "Retrofit", "Gson"],
    link: { text: "GitHub →", href: "#" } },

  { slug: "water", title: "Water Reminder", shots: 3,
    desc: "Kun davomida ichilgan suv miqdorini kuzatish va hisoblash uchun ilova.",
    features: ["Kunlik suv maqsadini belgilash", "Muntazam eslatma bildirishnomalari", "Bildirishnomadan to'g'ridan-to'g'ri belgilash"],
    tags: ["Kotlin", "Compose", "Hilt", "WorkManager", "SharedPreferences"],
    link: { text: "GitHub →", href: "#" } },

  { slug: "education", title: "Education App", shots: 3,
    desc: "Kurslar, guruhlar va talabalarni boshqarish uchun Android ilova.",
    features: [],
    tags: ["Kotlin", "Room", "Navigation", "ViewBinding"],
    link: { text: "GitHub →", href: "#" } },

  { slug: "bot", title: "Telegram tozalovchi bot", shots: 2,
    desc: "Guruhni xizmat xabarlari va spamdan tozalaydigan Kotlin bot.",
    features: ["A'zo qo'shilgan/chiqqan xabarlarini o'chirish", "Havola, mention va stop-so'zlar filtri", "Lokal (polling) va production (webhook) rejimlari"],
    tags: ["Kotlin", "Ktor", "Telegram Bot API", "Railway"],
    link: { text: "GitHub →", href: "#" } },

  { slug: "gap", title: "GAP", shots: 4, status: "Jarayonda",
    desc: "Do'stlar orasidagi aylanma \"gap\" yig'inlarida pul hisobini yuritish ilovasi.",
    features: ["Guruhlar, a'zolar va gaplarni boshqarish", "Har bir gapda kim qancha berganini ko'rsatish", "Natijani rasm qilib galereyaga saqlash"],
    tags: ["Kotlin", "Room", "Hilt", "Firebase", "KSP"],
    link: { text: "GitHub →", href: "#" } },

  { slug: "chat", title: "Chat App", shots: 3, status: "Jarayonda",
    desc: "Real vaqtda xabar almashish uchun chat ilovasi.",
    features: ["Telefon raqam va OTP orqali kirish", "WebSocket orqali real vaqtdagi xabarlar", "Push bildirishnoma, media va o'qildi belgisi"],
    tags: ["Kotlin", "REST API", "WebSocket"],
    link: { text: "GitHub →", href: "#" } },

  { slug: "puzzle", title: "Puzzle 15", shots: 3, status: "Jarayonda",
    desc: "Klassik 15 raqamli sirpanuvchi plitkalar o'yini.",
    features: ["Yangi o'yin va davom ettirish", "Qadamni qaytarish (undo)", "O'yin holati saqlanadi"],
    tags: ["Kotlin", "SharedPreferences"],
    link: { text: "GitHub →", href: "#" } },
];

const grid = document.getElementById("projectsGrid");
const dialog = document.getElementById("shotDialog");
const dialogImg = dialog.querySelector("img");
dialog.addEventListener("click", () => dialog.close());

function make(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text) e.textContent = text;
  return e;
}

projects.forEach(p => {
  const card = make("article", "project-card");

  const cover = make("div", "project-image");
  cover.append(make("span", "", p.title.toUpperCase()));
  card.append(cover);

  const strip = make("div", "shots");
  for (let i = 1; i <= p.shots; i++) {
    const btn = make("button");
    btn.type = "button";
    btn.setAttribute("aria-label", `${p.title} skrinshoti ${i}`);
    const img = new Image();
    img.loading = "lazy";
    img.alt = `${p.title} skrinshoti ${i}`;
    img.src = `images/${p.slug}-${i}.png`;
    img.onload = () => card.classList.add("has-shots");
    img.onerror = () => btn.remove();
    btn.append(img);
    btn.onclick = () => { dialogImg.src = img.src; dialogImg.alt = img.alt; dialog.showModal(); };
    strip.append(btn);
  }
  card.append(strip);

  const info = make("div", "project-info");
  const head = make("div", "project-head");
  head.append(make("h3", "", p.title));
  if (p.status) head.append(make("span", "badge", p.status));
  info.append(head, make("p", "", p.desc));

  if (p.features.length) {
    const ul = make("ul", "features");
    p.features.forEach(f => ul.append(make("li", "", f)));
    info.append(ul);
  }

  const tags = make("div", "project-tags");
  p.tags.forEach(t => tags.append(make("span", "", t)));
  info.append(tags);

  const a = make("a", "project-link", p.link.text);
  a.href = p.link.href;
  if (p.link.href !== "#") { a.target = "_blank"; a.rel = "noopener noreferrer"; }
  info.append(a);

  card.append(info);
  grid.append(card);
});
