const yearFilter = document.getElementById("filter-year");
const cursusFilter = document.getElementById("filter-cursus");
const subjectFilter = document.getElementById("filter-subject");
const typeFilter = document.getElementById("filter-type");
const codeFilter = document.getElementById("filter-code");
const tableRows = document.querySelectorAll("#annales-table tbody tr");

function filterTable() {
    const cursus = cursusFilter.value.toLowerCase();
    const year = yearFilter.value.toLowerCase();
    const subject = subjectFilter.value.toLowerCase();
    const type = typeFilter.value.toLowerCase();
    const code = codeFilter.value.toLowerCase();

    tableRows.forEach(row => {
        const rowCursus = row.cells[0].textContent.toLowerCase();
        const rowYear = row.cells[1].textContent.toLowerCase();
        const rowSubject = row.cells[2].textContent.toLowerCase();
        const rowType = row.cells[3].textContent.toLowerCase();
        const rowCode = row.cells[4].textContent.toLowerCase();

        const match =
            (cursus === "" || rowCursus === cursus) &&
            (year === "" || rowYear === year) &&
            (subject === "" || rowSubject === subject) &&
            (type === "" || rowType === type) &&
            (code === "" || rowCode.includes(code));
        row.style.display = match ? "" : "none";
    });
}

cursusFilter.addEventListener("change", filterTable);
yearFilter.addEventListener("change", filterTable);
subjectFilter.addEventListener("change", filterTable);
typeFilter.addEventListener("change", filterTable);
codeFilter.addEventListener("input", filterTable);



