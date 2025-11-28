document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("assistantButton");
  const box = document.getElementById("assistantWidget");
  const closeBtn = document.getElementById("assistantClose");
  const send = document.getElementById("assistantSend");
  const input = document.getElementById("assistantInput");
  const msgBox = document.getElementById("assistantMessages");

  const sendSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3");

  let currentMenu = "main"; // main / kontak / Sosial Media
  let pendingRedirect = null;

  // === CHAT AI RINGKAS ===
  const faq = {
    "siapa kamu": "Saya Fathan Assistant, asisten virtual Muhammad Irpan.",
    "umur kamu": "Saya lahir pada 26 Juni 2006.",
    "universitas": "Saat ini saya kuliah di Universitas Nusa Putra.",
    "pendidikan terakhir": "Saya menyelesaikan pendidikan terakhir di SMKS Harpan Bangsa.",
    "menu": "Baik! Fitur portfolio tersedia seperti: Beranda, Sosial Media, Sertifikat, MyTube, Blog, CV, Code, Kontak, Tentang. Silakan ketik menu pilihan Anda."
  };

  // Semua key menu dibuat lowercase
  const menuMap = {
    "beranda": "https://mzahrilfathan26.github.io/Portofolio_Fathan/#home",
    "mytube": "https://mzahrilfathan26.github.io/Portofolio_Fathan/video/Mytube.html",
    "blog": "https://mzahrilfathan26.github.io/Portofolio_Fathan/blog/blog.html",
    "cv": "https://mzahrilfathan26.github.io/Portofolio_Fathan/cv/cv.html",
    "sertifikat": "https://mzahrilfathan26.github.io/Portofolio_Fathan/certificates/certificates.html",
    "code": "https://mzahrilfathan26.github.io/Portofolio_Fathan/code/code.html",
    "kontak": "kontak",
    "tentang": "tentang",
    "sosial media": "sosial media"
  };

  function preciseScroll() {
    setTimeout(() => { msgBox.scrollTop = msgBox.scrollHeight + 200; }, 80);
  }

  function addBubble(html) {
    msgBox.insertAdjacentHTML("beforeend", html);
    preciseScroll();
  }

  function botMessage(text, callbackAfter = null) {
    addBubble(`
      <div class="chat-bubble">
        <div class="avatar bot-avatar"></div>
        <div class="msg-assistant">${text}</div>
      </div>
    `);
    if (callbackAfter) callbackAfter();
  }

  function userMessage(text) {
    sendSound.play();
    addBubble(`
      <div class="chat-bubble" style="justify-content:right;">
        <div class="msg-user">${text}</div>
        <div class="avatar user-avatar"></div>
      </div>
    `);
  }

  function botTyping(callbackText, callbackAfter = null) {
    addBubble(`
      <div id="typingIndicator" class="chat-bubble">
        <div class="avatar bot-avatar"></div>
        <div class="msg-assistant"><i>Assistant sedang mengetik...</i></div>
      </div>
    `);
    preciseScroll();
    setTimeout(() => {
      const typing = document.getElementById("typingIndicator");
      if (typing) typing.remove();
      botMessage(callbackText, callbackAfter);
    }, 900);
  }

  // === Buka Widget ===
  btn.addEventListener("click", () => {
    btn.classList.add("btn-hide");
    setTimeout(() => { btn.style.display = "none"; }, 250);

    box.classList.remove("assistant-hidden");
    box.classList.add("assistant-open");

    msgBox.innerHTML = "";

    setTimeout(() => {
      botTyping("Halo! Saya Fathan Assistant. Ada yang bisa saya bantu?", () => {
        botTyping("Baik! Fitur portfolio tersedia seperti: Beranda, Sosial Media, Sertifikat, MyTube, Blog, CV, Code, Kontak, Tentang. Silakan ketik menu pilihan Anda.");
      });
    }, 300);

    input.focus();
  });

  // === Tutup Widget ===
  closeBtn.addEventListener("click", () => {
    closeBtn.classList.add("close-animate");
    box.classList.add("assistant-close");

    setTimeout(() => {
      box.classList.add("assistant-hidden");
      box.classList.remove("assistant-open");
      box.classList.remove("assistant-close");
      closeBtn.classList.remove("close-animate");
    }, 280);

    setTimeout(() => {
      btn.style.display = "block";
      btn.classList.remove("btn-hide");
      btn.classList.add("btn-show");
    }, 300);
  });

  // === Send Message ===
  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    userMessage(text);
    input.value = "";

    const textLower = text.toLowerCase();

    // === Chat AI Ringkas ===
    if (faq[textLower]) {
      botTyping(faq[textLower]);
      return;
    }

    // Menu Sosial Media
    if (textLower === "sosial media") {
      currentMenu = "Sosial Media";
      botTyping("Silakan pilih sosial media: Tiktok atau Instagram.");
      return;
    }

    if (currentMenu === "Sosial Media") {
      if (textLower === "tiktok") {
        botTyping("Mengalihkan ke Tiktok...", () => {
          window.open("https://www.tiktok.com/@zhrl.fthn?_r=1&_t=ZS-91kl6UoQTw2", "_blank");
          currentMenu = "main";
        });
      } else if (textLower === "instagram") {
        botTyping("Mengalihkan ke Instagram...", () => {
          window.open("https://www.instagram.com/highmorn", "_blank");
          currentMenu = "main";
        });
      } else {
        botTyping("Silakan ketik 'Tiktok' atau 'Instagram'.");
      }
      return;
    }

    // Menu Kontak
    if (currentMenu === "kontak") {
      if (textLower === "whatsapp") {
        botTyping("Mengalihkan ke WhatsApp...", () => {
          window.open("https://wa.me/+6285121046062", "_blank");
          currentMenu = "main";
        });
      } else if (textLower === "email") {
        botTyping("Mengalihkan ke Email...", () => {
          window.open("mailto:muhamad.irpan260626@gmail.com", "_blank");
          currentMenu = "main";
        });
      } else {
        botTyping("Silakan ketik 'WhatsApp' atau 'Email'.");
      }
      return;
    }

    // Menu utama (case-insensitive)
    if (menuMap[textLower]) {
      switch (textLower) {
        case "kontak":
          currentMenu = "kontak";
          botTyping("Silakan pilih metode kontak dengan mengetik: WhatsApp atau Email.");
          break;
        case "tentang":
          botTyping("Halo! Perkenalkan, saya Muhammad Irpan, lahir pada 26 Juni 2006. Saya menyelesaikan pendidikan terakhir di SMKS Harpan Bangsa dan saat ini sedang menempuh S1 di Universitas Nusa Putra.");
          break;
        case "sosial media":
          currentMenu = "Sosial Media";
          botTyping("Silakan pilih sosial media: Tiktok atau Instagram.");
          break;
        default:
          pendingRedirect = menuMap[textLower];
          botTyping(`Mengalihkan ke ${text}...`, () => {
            window.open(pendingRedirect, "_blank");
          });
      }
    } else {
      botTyping("Maaf, menu tidak tersedia. Silakan ketik: Beranda, Sosial Media, Sertifikat, MyTube, Blog, CV, Code, Kontak, Tentang. Silakan ketik menu pilih kembali.");
    }
  }

  send.addEventListener("click", sendMessage);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });
});
