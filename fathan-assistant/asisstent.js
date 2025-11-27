document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("assistantButton");
  const box = document.getElementById("assistantWidget");
  const closeBtn = document.getElementById("assistantClose");
  const send = document.getElementById("assistantSend");
  const input = document.getElementById("assistantInput");
  const msgBox = document.getElementById("assistantMessages");

  const sendSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3");

  let currentMenu = "main"; // main / kontak
  let pendingRedirect = null; // simpan URL yang akan dialihkan

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
        botTyping("Baik! Fitur portfolio tersedia seperti: Beranda, Sertifikat, Proyek, Kontak, Tentang. Silakan ketik menu pilihan Anda.");
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

  const menuMap = {
    "Beranda": "https://mzahrilfathan26.github.io/Portofolio_Fathan/#home",
    "Portfolio": "https://mzahrilfathan26.github.io/Portofolio_Fathan/#portfolio",
    "MyTube": "https://mzahrilfathan26.github.io/Portofolio_Fathan/video/Mytube.html",
    "Blog": "https://mzahrilfathan26.github.io/Portofolio_Fathan/blog/blog.html",
    "CV": "https://mzahrilfathan26.github.io/Portofolio_Fathan/cv/cv.html",
    "Sertifikat": "https://mzahrilfathan26.github.io/Portofolio_Fathan/certificates/certificates.html",
    "Code": "https://mzahrilfathan26.github.io/Portofolio_Fathan/code/code.html",
    "Kontak": "kontak",
    "Tentang": "tentang" // menu khusus
  };

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    userMessage(text);
    input.value = "";

    const textCapitalized = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

    // Jika sedang di submenu kontak
    if (currentMenu === "kontak") {
      if (textCapitalized === "Whatsapp") {
        botTyping("Mengalihkan ke WhatsApp...", () => {
          window.open("https://wa.me/+6285121046062", "_blank");
          currentMenu = "main";
        });
      } else if (textCapitalized === "Email") {
        botTyping("Mengalihkan ke Email...", () => {
          window.location.href = "mailto:muhamad.irpan260626@gmail.com";
          currentMenu = "main";
        });
      } else {
        botTyping("Silakan ketik 'WhatsApp' atau 'Email'.");
      }
      return;
    }

    // Menu utama
    if (menuMap[textCapitalized]) {
      if (textCapitalized === "Kontak") {
        currentMenu = "kontak";
        botTyping("Silakan pilih metode kontak dengan mengetik: WhatsApp atau Email.");
      } else if (textCapitalized === "Tentang") {
        botTyping(
          `Halo! Perkenalkan, saya Muhammad Irpan, lahir pada 26 Juni 2006. Saya menyelesaikan pendidikan terakhir di SMKS Harpan Bangsa dan saat ini sedang menempuh S1 di Universitas Nusa Putra.`
        );
      } else {
        // set URL untuk dialihkan setelah pesan muncul
        pendingRedirect = menuMap[textCapitalized];
        botTyping(`Mengalihkan ke ${textCapitalized}...`, () => {
          window.location.href = pendingRedirect;
        });
      }
    } else {
      botTyping("Maaf, menu tidak tersedia. Silakan ketik: CV, Sertifikat, Proyek, Kontak, Tentang.");
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
