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

  function preciseScroll() {
    setTimeout(() => {
      msgBox.scrollTop = msgBox.scrollHeight + 200;
    }, 80);
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

  // Buka widget
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

  // Tutup widget
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

  // Menu utama (tanpa Sosial Media)
  const menuMap = {
    "Beranda": "https://mzahrilfathan26.github.io/Portofolio_Fathan/#home",
    "MyTube": "https://mzahrilfathan26.github.io/Portofolio_Fathan/video/Mytube.html",
    "Blog": "https://mzahrilfathan26.github.io/Portofolio_Fathan/blog/blog.html",
    "CV": "https://mzahrilfathan26.github.io/Portofolio_Fathan/cv/cv.html",
    "Sertifikat": "https://mzahrilfathan26.github.io/Portofolio_Fathan/certificates/certificates.html",
    "Code": "https://mzahrilfathan26.github.io/Portofolio_Fathan/code/code.html",
    "Kontak": "kontak",
    "Tentang": "tentang"
  };

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    userMessage(text);
    input.value = "";

    const textLower = text.toLowerCase();
    const textCapitalized = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

    // Menu Sosial Media
    if (textLower === "sosial media") {
      currentMenu = "Sosial Media";
      botTyping("Silakan pilih sosial media: Tiktok atau Instagram.");
      return;
    }

    // Submenu Sosial Media
    if (currentMenu === "Sosial Media") {
      if (textLower === "tiktok") {
        botTyping("Mengalihkan ke Tiktok...", () => {
          window.open("https://www.tiktok.com/@zhrl.fthn?_r=1&_t=ZS-91kl6UoQTw2", "_blank");
          currentMenu = "main";
        });
      } else if (textLower === "instagram") {
        botTyping("Mengalihkan ke Instagram...", () => {
          window.open("https://www.instagram.com/highmorn?igsh=dXRrYnJvaTc1YTNk&utm_source=qr", "_blank");
          currentMenu = "main";
        });
      } else {
        botTyping("Silakan ketik 'Tiktok' atau 'Instagram'.");
      }
      return;
    }

    // Submenu Kontak
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

    // Menu utama
    if (menuMap[textCapitalized]) {
      if (textLower === "kontak") {
        currentMenu = "kontak";
        botTyping("Silakan pilih metode kontak dengan mengetik: WhatsApp atau Email.");
      } else if (textLower === "tentang") {
        botTyping(
          `Halo! Perkenalkan, saya Muhammad Irpan, lahir pada 26 Juni 2006. Saya menyelesaikan pendidikan terakhir di SMKS Harpan Bangsa dan saat ini sedang menempuh S1 di Universitas Nusa Putra.`
        );
      } else {
        pendingRedirect = menuMap[textCapitalized];
        botTyping(`Mengalihkan ke ${textCapitalized}...`, () => {
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
