document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Empêche l'envoi classique du formulaire

    // Optionnel : vérification des champs ici si besoin

    // Affichage d'un message de confirmation
    document.getElementById('confirmation').classList.remove('hidden');

    // Réinitialisation du formulaire
    this.reset();
});
