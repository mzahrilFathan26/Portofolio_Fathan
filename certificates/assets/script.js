/* DATA SUBCATEGORY */
const subCategories = {
  school: ["osis", "FPSH", "PASKIBRA", "FOKSI"],
  campus: ["organisasi", "event"],
  /*workshop: ["uiux", "coding"],*/
  seminar: ["SENAPADMA", "FPSH"],
  kursus: ["CySec-Dasar"]
};

/* FILTER LEVEL 1 */
function filterMain(cat) {
  document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");

  const container = document.getElementById("certContainer");

  // tampilkan sub kategori
  generateSubFilter(cat);

  if (cat === "all") {
    container.classList.remove("filtered");
    document.querySelectorAll(".cert-card").forEach(card => card.style.display = "block");
    return;
  }

  container.classList.add("filtered");

  document.querySelectorAll(".cert-card").forEach(card => {
    let kategori = card.getAttribute("data-cat");
    card.style.display = kategori === cat ? "block" : "none";
  });
}

/* GENERATE SUBCATEGORY */
function generateSubFilter(mainCat) {
  const subBar = document.getElementById("subFilterBar");
  subBar.innerHTML = "";

  if (!subCategories[mainCat] || mainCat === "all") {
    subBar.style.display = "none";
    return;
  }

  subBar.style.display = "flex";

  subCategories[mainCat].forEach(sub => {
    const btn = document.createElement("button");
    btn.textContent = sub.toUpperCase();
    btn.className = "sub-filter-btn";
    btn.onclick = () => filterSub(mainCat, sub, btn);
    subBar.appendChild(btn);
  });
}

/* FILTER SUB CATEGORY */
function filterSub(mainCat, subCat, btn) {
  document.querySelectorAll(".sub-filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  document.querySelectorAll(".cert-card").forEach(card => {
    let cat = card.getAttribute("data-cat");
    let sub = card.getAttribute("data-sub");

    card.style.display =
      (cat === mainCat && sub === subCat) ? "block" : "none";
  });
}

/* POPUP */
function openPopup(img, title, cat) {
  document.getElementById("popupImg").src = img;
  document.getElementById("popupTitle").textContent = title;
  document.getElementById("popupCat").textContent = cat;
  document.getElementById("popupBg").style.display = "flex";
}
function closePopup() {
  document.getElementById("popupBg").style.display = "none";
}