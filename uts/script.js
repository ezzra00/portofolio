/* ==================== JavaScript (perilaku tombol dan animasi) ==================== */

const root = document.documentElement;

// --- Tombol tema: ganti gelap/terang + putar animasi pergantian ---
const btnTema = document.getElementById("btnTema");
const labelTema = document.getElementById("labelTema");

btnTema.addEventListener("click", function () {
  // Mulai ulang animasi: lepas class "ganti", paksa browser menghitung ulang, pasang lagi
  root.classList.remove("ganti");
  void root.offsetWidth;
  root.classList.add("ganti");
  setTimeout(function () { root.classList.remove("ganti"); }, 2000);

  // toggle menambah class "terang" jika belum ada, menghapusnya jika sudah ada
  const terang = root.classList.toggle("terang");
  labelTema.textContent = terang ? "Mode Gelap" : "Mode Terang";
});

// --- Tombol hobi: tampilkan atau sembunyikan daftar hobi ---
const btnHobi = document.getElementById("btnHobi");
const daftarHobi = document.getElementById("daftarHobi");

btnHobi.addEventListener("click", function () {
  // toggle menambah class "buka" jika belum ada, menghapusnya jika sudah ada
  // (animasi buka-tutup dijalankan sepenuhnya oleh CSS)
  const terbuka = daftarHobi.classList.toggle("buka");
  btnHobi.textContent = terbuka ? "Sembunyikan Hobi" : "Tampilkan Hobi";
  btnHobi.setAttribute("aria-expanded", terbuka);
});

// --- Kartu muncul halus saat di-scroll ke layar ---
const pengamat = new IntersectionObserver(function (daftar) {
  daftar.forEach(function (item) {
    if (item.isIntersecting) {
      item.target.classList.add("tampil");
      pengamat.unobserve(item.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(function (el) { pengamat.observe(el); });
