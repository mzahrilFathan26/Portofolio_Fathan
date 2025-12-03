document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("assistantButton");
  const box = document.getElementById("assistantWidget");
  const closeBtn = document.getElementById("assistantClose");
  const send = document.getElementById("assistantSend");
  const input = document.getElementById("assistantInput");
  const msgBox = document.getElementById("assistantMessages");

  const sendSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3");

  let currentMenu = "main";
  let pendingRedirect = null;

  // === CHAT AI RINGKAS ===
  const faq = {
    "siapa kamu": "Saya Fathan Assistant, asisten virtual Muhammad Irpan.",
    "umur kamu": "Saya lahir pada 26 Juni 2006.",
    "universitas": "Saat ini saya kuliah di Universitas Nusa Putra.",
    "pendidikan terakhir": "Saya menyelesaikan pendidikan terakhir di SMKS Harpan Bangsa.",
    "menu": "Baik! Fitur portfolio tersedia seperti: Beranda, Sosial Media, Sertifikat, MyTube, Blog, CV, Code, Kontak, Tentang. Silakan ketik menu pilihan Anda."
  };

  // === MENU MAP ===
  const menuMap = {
    "beranda": "https://fathanportfolio26.netlify.app/#home",
    "mytube": "https://fathanportfolio26.netlify.app/video/mytube",
    "blog": "https://fathanportfolio26.netlify.app/blog/blog",
    "cv": "https://fathanportfolio26.netlify.app/cv/cv",
    "sertifikat": "https://fathanportfolio26.netlify.app/certificates/certificates",
    "code": "https://fathanportfolio26.netlify.app/code/code",
    "kontak": "kontak",
    "tentang": "tentang",
    "sosial media": "sosial media"
  };

  // === SCROLL ===
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

  // ============================================================
  // === FUNGSI MATEMATIKA, STATISTIKA, KALKULUS (DITAMBAHKAN) ===
  // ============================================================

  function evaluateMath(expr) {
    try {
      expr = expr.replace(/\^/g, "**");
      const allowed = {
        sin: Math.sin,
        cos: Math.cos,
        tan: Math.tan,
        log: Math.log10,
        ln: Math.log,
        sqrt: Math.sqrt,
        abs: Math.abs,
        pi: Math.PI,
        e: Math.E
      };
      return Function("Math", "with(Math){ return " + expr + "}")(allowed);
    } catch {
      return null;
    }
  }

  function mean(arr) {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
  }

  function median(arr) {
    arr = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(arr.length / 2);
    return arr.length % 2 !== 0 ? arr[mid] : (arr[mid - 1] + arr[mid]) / 2;
  }

  function mode(arr) {
    const freq = {};
    arr.forEach(n => freq[n] = (freq[n] || 0) + 1);
    let maxFreq = Math.max(...Object.values(freq));
    return Object.keys(freq).filter(key => freq[key] == maxFreq);
  }

  function derivative(expr, x0) {
    const h = 1e-6;
    const f = (x) => evaluateMath(expr.replace(/x/g, `(${x})`));
    return (f(x0 + h) - f(x0 - h)) / (2 * h);
  }

  function integral(expr, a, b, n = 10000) {
    const f = (x) => evaluateMath(expr.replace(/x/g, `(${x})`));
    let h = (b - a) / n;
    let sum = 0.5 * (f(a) + f(b));
    for (let i = 1; i < n; i++) sum += f(a + i * h);
    return sum * h;
  }

  // ==================================================

  // === BUKA WIDGET ===
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

  // === TUTUP WIDGET ===
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

  // ==================================================
  // === KIRIM PESAN ===
  // ==================================================
  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    userMessage(text);
    input.value = "";
    const textLower = text.toLowerCase();

    // =========================================================
    // === DETEKSI MATEMATIKA (ditempatkan paling atas logika) ==
    // =========================================================

    // Turunan: "turunan x^2+3x pada x=5"
    if (textLower.startsWith("turunan ")) {
      const match = textLower.match(/turunan (.*) pada x=([\-0-9\.]+)/);
      if (match) {
        const expr = match[1];
        const nilaiX = parseFloat(match[2]);
        const hasil = derivative(expr, nilaiX);
        botTyping(`Turunan dari ${expr} pada x=${nilaiX} adalah ${hasil}`);
        return;
      }
    }

    // Integral: "integral x^2 dari 0 sampai 3"
    if (textLower.startsWith("integral ")) {
      const match = textLower.match(/integral (.*) dari ([\-0-9\.]+) sampai ([\-0-9\.]+)/);
      if (match) {
        const expr = match[1];
        const a = parseFloat(match[2]);
        const b = parseFloat(match[3]);
        const hasil = integral(expr, a, b);
        botTyping(`Integral dari ${expr} dari ${a} sampai ${b} adalah ${hasil}`);
        return;
      }
    }

    // Fungsi matematika biasa
    if (/[\d\+\-\*\/\^\(\)x]/.test(textLower)) {
      const result = evaluateMath(textLower);
      if (result !== null) {
        botTyping(`Hasil dari <b>${text}</b> adalah <b>${result}</b>`);
        return;
      }
    }

    // Mean
    if (textLower.startsWith("mean ")) {
      const nums = textLower.replace("mean", "").trim().split(/\s+/).map(Number);
      botTyping(`Mean = ${mean(nums)}`);
      return;
    }

    // Median
    if (textLower.startsWith("median ")) {
      const nums = textLower.replace("median", "").trim().split(/\s+/).map(Number);
      botTyping(`Median = ${median(nums)}`);
      return;
    }

    // Modus
    if (textLower.startsWith("modus ") || textLower.startsWith("mode ")) {
      const nums = textLower.replace(/modus|mode/g, "").trim().split(/\s+/).map(Number);
      botTyping(`Modus = ${mode(nums).join(", ")}`);
      return;
    }

    // =========================================================
    // === CHAT AI RINGKAS (menu profil dll)
    // =========================================================
    if (faq[textLower]) {
      botTyping(faq[textLower]);
      return;
    }

    // Sosial Media
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

    // Kontak
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

    // MENU UTAMA
    if (menuMap[textLower]) {
      switch (textLower) {
        case "kontak":
          currentMenu = "kontak";
          botTyping("Silakan pilih metode kontak: WhatsApp atau Email.");
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
      return;
    }

    botTyping("Maaf, menu tidak tersedia. Silakan ketik: Beranda, Sosial Media, Sertifikat, MyTube, Blog, CV, Code, Kontak, Tentang.");
  }

  send.addEventListener("click", sendMessage);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });
});
