const yearFilter = document.getElementById("filter-year");
const subjectFilter = document.getElementById("filter-subject");
const codeFilter = document.getElementById("filter-code");
const tableRows = document.querySelectorAll("#annales-table tbody tr");

function filterTable() {
    const year = yearFilter.value.toLowerCase();
    const subject = subjectFilter.value.toLowerCase();
    const code = codeFilter.value.toLowerCase();

    tableRows.forEach(row => {
        const rowYear = row.cells[0].textContent.toLowerCase();
        const rowSubject = row.cells[1].textContent.toLowerCase();
        const rowCode = row.cells[2].textContent.toLowerCase();

        const match =
            (year === "" || rowYear === year) &&
            (subject === "" || rowSubject === subject) &&
            (code === "" || rowCode.includes(code));
        row.style.display = match ? "" : "none";
    });
}

yearFilter.addEventListener("change", filterTable);
subjectFilter.addEventListener("change", filterTable);
codeFilter.addEventListener("input", filterTable);
