// ======== DATA VIDEO ========
const videos = [
  {
    title: "Tutorial HTML Dasar",
    url: "https://www.youtube.com/embed/VzP8aZG410M",
    desc: "Belajar dasar-dasar HTML untuk pemula."
  },
  {
    title: "Belajar CSS Modern",
    url: "https://www.youtube.com/embed/yfoY53QXEnI",
    desc: "Gaya modern dengan CSS dan animasi."
  },
  {
    title: "JavaScript Interaktif",
    url: "https://www.youtube.com/embed/W6NZfCO5SIk",
    desc: "Membuat website lebih dinamis dengan JS."
  },
  {
    title: "Membuat Portofolio Website",
    url: "https://www.youtube.com/embed/xV7S8BhIeBo",
    desc: "Tutorial lengkap membangun web portofolio."
  }
];


// ======== GENERATE VIDEO CARD ========
const container = document.getElementById("videoContainer");
function renderVideos(list) {
  container.innerHTML = "";
  list.forEach(v => {
    const card = document.createElement("div");
    card.classList.add("video-card");
    card.dataset.title = v.title;
    card.innerHTML = `
      <iframe src="${v.url}" frameborder="0" allowfullscreen></iframe>
      <h3>${v.title}</h3>
      <p>${v.desc}</p>
    `;
    container.appendChild(card);
  });
}
renderVideos(videos);

// ======== MODE GELAP-TERANG ========
const modeToggle = document.getElementById("modeToggle");
const body = document.body;
const lightIcon = document.getElementById("lightIcon");
const darkIcon = document.getElementById("darkIcon");

modeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  const darkMode = body.classList.contains("dark");
  darkIcon.style.display = darkMode ? "none" : "inline";
  lightIcon.style.display = darkMode ? "inline" : "none";
});

// ======== PENCARIAN VIDEO ========
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

function searchVideo() {
  const filter = searchInput.value.toLowerCase();
  const filtered = videos.filter(v => v.title.toLowerCase().includes(filter));
  renderVideos(filtered);
}

searchBtn.addEventListener("click", searchVideo);
searchInput.addEventListener("keyup", searchVideo);
