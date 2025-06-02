window.onload = () => {
    const path = window.location.pathname;

    if (path.includes("Accueil.html")) {
        document.getElementById("accueilLink").classList.add("active");
    } else if (path.includes("ODD.html")) {
        document.getElementById("oddLink").classList.add("active");
    } else if (path.includes("Annales.html")) {
        document.getElementById("annalesLink").classList.add("active");
    } else if (path.includes("Contact.html")) {
        document.getElementById("contactLink").classList.add("active");
    }
}
