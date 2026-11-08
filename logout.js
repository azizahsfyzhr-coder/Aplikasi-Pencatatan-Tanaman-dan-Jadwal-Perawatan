
// TOMBOL BATAL

function batalLogout() {
    window.location.href = "dashboard.html";
}


// TOMBOL YA, KELUAR

function keluarAkun() {

    sessionStorage.removeItem("isLogin");
    localStorage.removeItem("isLogin");

    window.location.href = "login.html";

}
