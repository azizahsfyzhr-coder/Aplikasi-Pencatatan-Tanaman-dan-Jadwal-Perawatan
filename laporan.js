
// FILTER LAPORAN

const filterTanaman = document.getElementById("filterTanaman");
const filterLokasi = document.getElementById("filterLokasi");
const filterPerawatan = document.getElementById("filterPerawatan");

const tanggalMulai = document.getElementById("tanggalMulai");
const tanggalAkhir = document.getElementById("tanggalAkhir");


// KONVERSI TANGGAL

function konversiTanggal(tanggal) {
    const [hari, bulan, tahun] = tanggal.split("/");
    return `${tahun}-${bulan}-${hari}`;
}


// FILTER DATA

function filterLaporan() {

    const rows = document.querySelectorAll("#reportTable tr");

    rows.forEach(row => {

        const tanggal = konversiTanggal(
            row.cells[0].textContent.trim()
        );

        const tanaman = row.cells[1].textContent.trim();
        const perawatan = row.cells[3].textContent.trim();
        const lokasi = row.dataset.lokasi;

        const cocokTanaman =
            !filterTanaman.value ||
            tanaman === filterTanaman.value;

        const cocokLokasi =
            !filterLokasi.value ||
            lokasi === filterLokasi.value;

        const cocokPerawatan =
            !filterPerawatan.value ||
            perawatan === filterPerawatan.value;

        const cocokTanggal =
            (!tanggalMulai.value || tanggal >= tanggalMulai.value) &&
            (!tanggalAkhir.value || tanggal <= tanggalAkhir.value);

        row.style.display =
            cocokTanaman &&
            cocokLokasi &&
            cocokPerawatan &&
            cocokTanggal ? "" : "none";

    });

    updateRingkasan();
}


// UPDATE TOTAL

function updateRingkasan() {

    const rows = [
        ...document.querySelectorAll("#reportTable tr")
    ].filter(row => row.style.display !== "none");

    let selesai = 0;
    let belum = 0;

    rows.forEach(row => {

        if (row.querySelector(".status").classList.contains("selesai")) {
            selesai++;
        } else {
            belum++;
        }

    });

    document.getElementById("totalPerawatan").textContent = rows.length;
    document.getElementById("totalSelesai").textContent = selesai;
    document.getElementById("totalBelum").textContent = belum;
}


// HAPUS DATA

function hapusData(button) {

    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {

        button.closest("tr").remove();

        updateRingkasan();

    }

}


// EDIT DATA

function editData(button) {

    const row = button.closest("tr");

    const keterangan = prompt(
        "Masukkan keterangan baru:",
        row.cells[4].textContent
    );

    if (keterangan !== null && keterangan.trim() !== "") {

        row.cells[4].textContent = keterangan;

    }

}


// EVENT FILTER

filterTanaman.addEventListener("change", filterLaporan);
filterLokasi.addEventListener("change", filterLaporan);
filterPerawatan.addEventListener("change", filterLaporan);

tanggalMulai.addEventListener("change", filterLaporan);
tanggalAkhir.addEventListener("change", filterLaporan);


// MENU AKTIF SESUAI HALAMAN

const halaman = window.location.pathname
    .split("/")
    .pop()
    .toLowerCase();

document.querySelectorAll(".sidebar a").forEach(link => {

    const tujuan = link.getAttribute("href")
        .split("/")
        .pop()
        .toLowerCase();

    link.classList.toggle("active", tujuan === halaman);

});


// TAMPILAN AWAL

updateRingkasan();
