feather.replace();

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

function downloadPDF() {
  const element = document.getElementById("cv-area");

  const options = {
    margin: 0.5,
    filename: "CV-Muhamad-Irpan.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
  };

  html2pdf().set(options).from(element).save();
}
