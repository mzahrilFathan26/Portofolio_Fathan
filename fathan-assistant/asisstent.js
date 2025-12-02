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
    // === Info Pribadi & Portfolio ===
    "siapa kamu": "Saya Fathan Assistant, asisten virtual Muhammad Irpan.",
    "umur kamu": "Saya lahir pada 26 Juni 2006.",
    "universitas": "Saat ini saya kuliah di Universitas Nusa Putra.",
    "pendidikan terakhir": "Saya menyelesaikan pendidikan terakhir di SMKS Harpan Bangsa.",
    "tentang saya": "Halo! Saya penggemar teknologi yang suka membangun website interaktif, blogging, dan proyek coding pribadi.",
    "menu": "Baik! Fitur portfolio tersedia: Beranda, Sosial Media, Sertifikat, MyTube, Blog, CV, Code, Kontak, Tentang. Silakan ketik menu pilihan Anda.",
    
    // === Portfolio ===
    "website": "Di portfolio saya ada beberapa proyek: Website Kenangan Kelas, Video Tugas, Blog Pribadi, CV, Sertifikat, dan Coding Code.",
    "blog": "Blog pribadi saya berisi tulisan, pengalaman, dan ide kreatif.",
    "cv": "CV saya berisi identitas, pendidikan, pengalaman, dan skill.",
    "sertifikat": "Sertifikat yang saya peroleh dari sekolah, seminar, dan keahlian.",
    "code": "Di halaman Coding Code, kamu bisa melihat berbagai kodingan saya.",
    "mytube": "Video proyek dan tutorial dapat dilihat di MyTube.",
    
    // === Pengetahuan Informatika ===
    "logika": "Logika adalah dasar ilmu komputer. Contoh soal: 'Jika p benar dan q salah, apa hasil p AND q?' → Jawaban: Salah.",
    "logika dasar": "Logika dasar mempelajari operasi AND, OR, NOT. Contoh: p = benar, q = salah → p OR q = Benar.",
    "proposisi": "Proposisi adalah pernyataan yang benar atau salah. Contoh: 'Hari ini hujan' adalah proposisi jika bisa ditentukan benar/salah.",
    
    "algoritma": "Algoritma adalah urutan langkah untuk menyelesaikan masalah. Contoh soal: 'Buat algoritma mencari nilai maksimum dari array [3,5,1]' → Jawaban: Bandingkan elemen satu per satu dan pilih yang terbesar.",
    "algoritma dasar": "Algoritma dasar mencakup sorting, searching, dan traversal. Contoh: Bubble sort, Binary search.",
    "pseudocode": "Pseudocode adalah representasi algoritma sebelum dikoding. Contoh: 'Start, ambil input x, jika x>0 tampilkan positif, else tampilkan negatif, End'.",
    
    "struktur data": "Struktur data adalah cara menyimpan data agar efisien. Contoh soal: 'Tentukan struktur data untuk menyimpan daftar nama mahasiswa' → Jawaban: Array atau Linked List.",
    "array": "Array adalah struktur data linear untuk menyimpan data berurutan.",
    "linked list": "Linked List adalah struktur data yang elemen-elemennya saling terhubung melalui pointer.",
    "stack": "Stack adalah struktur data LIFO (Last In First Out). Contoh: Undo di aplikasi teks.",
    "queue": "Queue adalah struktur data FIFO (First In First Out). Contoh: Antrian printer.",
    
    "kalkulus": "Kalkulus mempelajari perubahan dan gerakan. Contoh soal: 'Turunan dari f(x)=x^2?' → Jawaban: f'(x) = 2x.",
    "turunan": "Turunan digunakan untuk mengetahui laju perubahan fungsi. Contoh: f(x)=x^3 → f'(x)=3x^2",
    "integral": "Integral digunakan untuk menghitung luas di bawah kurva. Contoh: ∫x dx = x^2/2 + C",
    
    "statistika": "Statistika mempelajari pengumpulan dan analisis data. Contoh soal: 'Hitung rata-rata [2,4,6]' → Jawaban: 4.",
    "rata-rata": "Rata-rata = jumlah data / banyak data. Contoh: [3,5,7] → (3+5+7)/3 = 5",
    "median": "Median adalah nilai tengah dari data terurut. Contoh: [1,3,5] → Median=3",
    "modus": "Modus adalah nilai yang paling sering muncul. Contoh: [1,2,2,3] → Modus=2"
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

    let textLower = text.toLowerCase();

    // === Kalkulator Matematika ===
    try {
      // hapus tanda '=' di akhir
      if (textLower.endsWith("=")) textLower = textLower.slice(0, -1).trim();

      let mathExpr = textLower
        .replace(/\^/g, "**")             // pangkat
        .replace(/sin\(/g, "Math.sin(")
        .replace(/cos\(/g, "Math.cos(")
        .replace(/tan\(/g, "Math.tan(")
        .replace(/log\(/g, "Math.log(");

      // konversi derajat → radian untuk sin/cos/tan
      mathExpr = mathExpr.replace(/Math\.sin\(([^)]+)\)/g, "Math.sin(($1)*Math.PI/180)");
      mathExpr = mathExpr.replace(/Math\.cos\(([^)]+)\)/g, "Math.cos(($1)*Math.PI/180)");
      mathExpr = mathExpr.replace(/Math\.tan\(([^)]+)\)/g, "Math.tan(($1)*Math.PI/180)");

      if (/[0-9]/.test(mathExpr) && /[+\-*/%()Math]/.test(mathExpr)) {
        let result = eval(mathExpr);
        botTyping(`Hasil: ${result}`);
        return;
      }
    } catch (err) {
      // lanjut ke chat biasa jika error
    }

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

    // Menu utama
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
