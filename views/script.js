const loginForm = document.querySelector(".login-form");
const signupForm = document.querySelector(".signup-form");
const signUpButtons = document.querySelectorAll(".sign-up-btn");
const loginButtons = document.querySelectorAll(".login-btn");
const backLayer = document.querySelector(".back-layer");
var socket = io();

signUpButtons.forEach((button) => {
  button.addEventListener("click", () => {
    loginForm.classList.remove("active");
    signupForm.classList.add("active");
    backLayer.style.clipPath = "inset(0 0 0 50%)";
    pinjamKembali("K");
  });
});

loginButtons.forEach((button) => {
  button.addEventListener("click", () => {
    signupForm.classList.remove("active");
    loginForm.classList.add("active");
    backLayer.style.clipPath = "";
    pinjamKembali("P");
  });
});

function pinjam() {
  swal({
    title: "Anda yakin meminjam kunci M10?",
    text: "Pastikan kunci ruang dan jadwal terisi dengan benar",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((isOkay) => {
    if (isOkay) {
      pinjamBerhasil();
      pinjamKembali("B");
    }
  });
}
function pinjamBerhasil() {
  swal({
    title: "Peminjaman Berhasil!",
    text: "Jangan lupa mengembalikan kunci tepat waktu ya!",
    icon: "success",
  }).then((isOkay) => {
    // pinjamKembali("O");
    window.location = "index.html";
  });
}

function kembalikanKunci() {
  swal({
    title: "Pengembalian kunci",
    text: "Anda sedang mengembalikan kunci, pastikan sudah di tempat yang telah disediakan!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((isOkay) => {
    if (isOkay) {
      kembalikanKunciBerhasil();
    }
  });
}
function kembalikanKunciBerhasil() {
  swal({
    title: "Pengembalian Berhasil!",
    text: "Terima kasih telah mengembalikan kunci tepat waktu!",
    icon: "success",
  }).then((isOkay) => {
    pinjamKembali("T");
    window.location = "index.html";
  });
}

socket.on("data", ({ data }) => {
  let comp = document.getElementById("data");
  let btnKembalikan = document.getElementById("btn-kembalikan");
  if (data === "K1") {
    // data = "🔑";
    comp.textContent = "Kunci Terdeteksi ✔";
    comp.style.color = "green";
    // btnKembalikan.disabled = false;
    btnKembalikan.style.backgroundColor = "#1f6dff";
  } else if (data === "K0") {
    // data = "❌";
    comp.textContent = "Kunci tidak terdeteksi ❌";
    comp.style.color = "red";
    btnKembalikan.style.backgroundColor = "grey";
    // btnKembalikan.disabled = true;
  }
});

function pinjamKembali(data) {
  fetch("http://localhost:3000/arduinoApi", {
    method: "POST",
    body: JSON.stringify({ data }),
    headers: { "Content-Type": "application/json" },
  });
}

// Submit
// function handleSignUp(event) {
//   event.preventDefault(); // Mencegah redirect langsung
//   pinjamKembali("O");
//   window.location.href = "index.html";
// }

function backToIndex(event) {
  event.preventDefault(); // Mencegah redirect langsung
  pinjamKembali("O");
  window.location.href = "index.html";
}

// check User
// index handler
/*
const validUsers = [
  { npm: "2113020015", name: "Aris" },
  { npm: "2113020216", name: "Dzaky" },
  { npm: "2113020008", name: "Fahmi" },
  { npm: "2113020117", name: "Resandi" },
];

// Array untuk menyimpan data yang berhasil masuk
const savedUsers = [];

const inputField = document.querySelector(".inputNpm");
const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Mencegah refresh halaman
  console.log("Form submitted tanpa refresh!");
  validateAndRedirect();
  console.log("jajajal");
});
// Event listener untuk tombol Enter
inputField.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    validateAndRedirect();
    console.log("jajajal");
  }
});

// Fungsi validasi
function validateAndRedirect() {
  const inputValue = inputField.value;
  const user = validUsers.find((user) => user.npm === inputValue);

  if (user) {
    // Jika valid, simpan data dan redirect ke dashboard
    savedUsers.push(user);
    localStorage.setItem("currentUser", JSON.stringify(user)); // Simpan data sementara untuk dashboard
    pinjamKembali("P");
    window.location.href = "dashboard.html";
  } else {
    // Jika tidak valid, tampilkan error di layar
    const errorElement = document.createElement("p");
    errorElement.textContent = "NPM tidak valid!";
    errorElement.style.color = "red";
    document.body.appendChild(errorElement);

    // Hapus pesan error setelah 3 detik
    setTimeout(() => {
      errorElement.remove();
    }, 3000);
  }
}

// dashboard Handler
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (currentUser) {
  // Tampilkan nama pengguna di dashboard
  const welcomeMessage = document.createElement("h1");
  welcomeMessage.textContent = `Selamat datang, ${currentUser.name}!`;
  document.body.appendChild(welcomeMessage);
} else {
  // Jika tidak ada data, redirect kembali ke index.html
  alert("Tidak ada data pengguna! Kembali ke halaman login.");
  window.location.href = "index.html";
}
*/
