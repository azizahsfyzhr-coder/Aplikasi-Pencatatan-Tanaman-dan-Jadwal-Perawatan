
// ================================
// MODAL
// ================================

const modalElement = document.getElementById("careModal");
const careModal = new bootstrap.Modal(modalElement);

let editRow = null;


// ================================
// TAMBAH DATA
// ================================

function tambahData() {

    editRow = null;

    document.getElementById("careForm").reset();

    document.getElementById("formTitle").textContent =
        "Tambah Perawatan";

    careModal.show();

}


// ================================
// SIMPAN DATA
// ================================

document.getElementById("careForm")
    .addEventListener("submit", function(e) {

        e.preventDefault();

        const nama = document.getElementById("namaTanaman").value;
        const jenis = document.getElementById("jenisTanaman").value;
        const perawatan = document.getElementById("jenisPerawatan").value;
        const tanggal = document.getElementById("tanggalPerawatan").value;
        const keterangan = document.getElementById("keterangan").value;
        const status = document.getElementById("statusPerawatan").value;

        const tanggalFormat = tanggal.split("-").reverse().join("/");

        let statusClass = "";
        let statusIcon = "";

        if (status === "Selesai") {
            statusClass = "selesai";
            statusIcon = "fa-check-circle";
        } else if (status === "Terjadwal") {
            statusClass = "terjadwal";
            statusIcon = "fa-clock";
        } else {
            statusClass = "menunggu";
            statusIcon = "fa-clock";
        }

        const baris = `
            <td>${tanggalFormat}</td>
            <td>${jenis}</td>
            <td>${nama}</td>
            <td>${perawatan}</td>
            <td>${keterangan}</td>

            <td>
                <span class="status ${statusClass}">
                    <i class="fas ${statusIcon}"></i>
                    ${status}
                </span>
            </td>

            <td>
                <button class="action-btn edit"
                    onclick="editData(this)">
                    <i class="fas fa-pen"></i>
                </button>

                <button class="action-btn delete"
                    onclick="hapusData(this)">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;

        if (editRow) {

            editRow.innerHTML = baris;
            editRow = null;

        } else {

            const row = document.createElement("tr");

            row.innerHTML = baris;

            document.getElementById("careTable")
                .prepend(row);

        }

        careModal.hide();

        this.reset();

        updateTotal();

        filterData();

        alert("Data perawatan berhasil disimpan!");

    });


// ================================
// EDIT DATA
// ================================

function editData(button) {

    editRow = button.closest("tr");

    const cells = editRow.querySelectorAll("td");

    const tanggal = cells[0].textContent.trim().split("/");

    document.getElementById("tanggalPerawatan").value =
        `${tanggal[2]}-${tanggal[1]}-${tanggal[0]}`;

    document.getElementById("jenisTanaman").value =
        cells[1].textContent.trim();

    document.getElementById("namaTanaman").value =
        cells[2].textContent.trim();

    document.getElementById("jenisPerawatan").value =
        cells[3].textContent.trim();

    document.getElementById("keterangan").value =
        cells[4].textContent.trim();

    document.getElementById("statusPerawatan").value =
        cells[5].textContent.trim().replace(/^[✓◷]\s*/, "");

    document.getElementById("formTitle").textContent =
        "Edit Perawatan";

    careModal.show();

}


// ================================
// HAPUS DATA
// ================================

function hapusData(button) {

    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {

        button.closest("tr").remove();

        updateTotal();

        filterData();

    }

}


// ================================
// PENCARIAN DAN FILTER
// ================================

function filterData() {

    const search = document.getElementById("searchInput")
        .value.toLowerCase();

    const jenis = document.getElementById("filterJenis").value;

    const status = document.getElementById("filterStatus").value;

    const rows = document.querySelectorAll("#careTable tr");

    rows.forEach(row => {

        const text = row.textContent.toLowerCase();

        const jenisRow = row.cells[3].textContent.trim();

        const statusRow = row.cells[5].textContent.trim()
            .replace(/^[✓◷]\s*/, "");

        const cocokSearch = text.includes(search);

        const cocokJenis = jenis === "" || jenisRow === jenis;

        const cocokStatus = status === "" || statusRow === status;

        row.style.display =
            cocokSearch && cocokJenis && cocokStatus ? "" : "none";

    });

}


// ================================
// HITUNG TOTAL PERAWATAN SELESAI
// ================================

function updateTotal() {

    const rows = document.querySelectorAll("#careTable tr");

    let total = 0;

    rows.forEach(row => {

        const status = row.cells[5].textContent;

        if (status.includes("Selesai")) {
            total++;
        }

    });

    document.getElementById("totalSelesai").textContent = total;

}


// ================================
// EVENT PENCARIAN
// ================================

document.getElementById("searchInput")
    .addEventListener("input", filterData);

document.getElementById("filterJenis")
    .addEventListener("change", filterData);

document.getElementById("filterStatus")
    .addEventListener("change", filterData);


// ================================
// MENU SIDEBAR OTOMATIS
// ================================

document.addEventListener("DOMContentLoaded", function() {

    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    document.querySelectorAll(".sidebar .nav-link")
        .forEach(link => {

            const linkPage = link.getAttribute("href")
                .split("/")
                .pop()
                .toLowerCase();

            link.classList.toggle(
                "active",
                currentPage === linkPage
            );

        });

    updateTotal();

});
