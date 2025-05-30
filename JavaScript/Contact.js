document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = {
        nom: document.getElementById("nom").value,
        prenom: document.getElementById("prenom").value,
        email: document.getElementById("email").value,
        sujet: document.getElementById("sujet").value,
        message: document.getElementById("message").value
    };

    try {
        const response = await fetch("http://82.23.190.226:3000/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            document.getElementById("confirmation").classList.remove("hidden");
            document.getElementById("contactForm").reset();
        } else {
            alert("Erreur lors de l'envoi du message. Réessayez plus tard.");
        }
    } catch (error) {
        console.error("Erreur réseau :", error);
        alert("Erreur réseau.");
    }
});
