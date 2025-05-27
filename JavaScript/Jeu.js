let educationPoints = 0;
let totalEarnedPoints = 0;
let productionMultiplier = 1;
let pts = 0;

let initialCost = {"manuel": 10,"enseignant": 100,"ecole": 500,"college": 2000,"lycee": 5000,"plateforme": 10000};

let upgrades = {
    "manuel":     { name: "📘 Manuel scolaire", cost: 10, rate: 0.1, owned: 0 },
    "enseignant": { name: "👨‍🏫 Enseignant", cost: 100, rate: 1, owned: 0 },
    "ecole":      { name: "🏫 École primaire", cost: 500, rate: 5, owned: 0 },
    "college":    { name: "🏢 Collège", cost: 2000, rate: 20, owned: 0 },
    "lycee":      { name: "🎓 Lycée", cost: 5000, rate: 50, owned: 0 },
    "plateforme": { name: "💻 Plateforme e-learning", cost: 10000, rate: 100, owned: 0 }
};

let metaUpgrades = {
    "efficacite1": { name: "📈 Formation optimisée I", cost: 2000, multiplier: 1.5, purchased: false },
    "efficacite2": { name: "📈 Formation optimisée II", cost: 10000, multiplier: 2, purchased: false },
    "efficacite3": { name: "📈 Formation optimisée III", cost: 50000, multiplier: 3, purchased: false }
};

function updateDisplay() {
    document.getElementById("educationPoints").innerText = `Points d'éducation : ${educationPoints.toFixed(1)}`;
    document.getElementById("pts").innerText = `Points/Sec : ${pts.toFixed(1)}`;
    document.getElementById("totalPoints").innerText = `${Math.floor(totalEarnedPoints)} pts`;
    updateProgressVisual();
    updateLevelText();
}

function updateProgressVisual() {
    let height = Math.min(Math.log10(totalEarnedPoints + 1) * 20, 100);
    document.getElementById("progressFill").style.height = height + "%";

    let fill = document.getElementById("progressFill");
    if (height > 90) fill.style.background = "linear-gradient(to top, gold, orange)";
    else if (height > 60) fill.style.background = "linear-gradient(to top, #58d68d, #2ecc71)";
    else fill.style.background = "linear-gradient(to top, #3498db, #5dade2)";
}

function updateLevelText() {
    let level = "Débutant";
    if (totalEarnedPoints > 100000) level = "Prix Nobel 🎓";
    else if (totalEarnedPoints > 50000) level = "Université 🏛️";
    else if (totalEarnedPoints > 10000) level = "Lycée 📚";
    else if (totalEarnedPoints > 2000) level = "Collège ✏️";
    else if (totalEarnedPoints > 500) level = "École 🏫";
    document.getElementById("educationLevel").innerText = "Niveau : " + level;
}

function educate() {
    educationPoints += 1;
    totalEarnedPoints += 1;
    updateDisplay();
}

function buyUpgrade(key) {
    let upg = upgrades[key];
    if (educationPoints >= upg.cost) {
        educationPoints -= upg.cost;
        upg.owned++;
        upg.cost = Math.floor(upg.cost * 1.1);
        updateUpgrades();
        updateDisplay();
    }
}

function buyMetaUpgrade(key) {
    let meta = metaUpgrades[key];
    if (!meta.purchased && educationPoints >= meta.cost) {
        educationPoints -= meta.cost;
        meta.purchased = true;
        productionMultiplier *= meta.multiplier;
        updateMetaUpgrades();
        updateDisplay();
    }
}

function updateUpgrades() {
    pts = 0;
    let container = document.getElementById("upgrades");
    container.innerHTML = "";
    for (let key in upgrades) {
        let upg = upgrades[key];
        container.innerHTML += `
          <div class="upgrade">
            <div class="upgrade-title">${upg.name}</div>
            <div>Possédé : ${upg.owned} | Production : ${(upg.rate * upg.owned * productionMultiplier).toFixed(1)}/s</div>
            <div>Coût : ${upg.cost} pts</div>
            <button onclick="buyUpgrade('${key}')">Acheter</button>
          </div>
        `;
        pts += (upg.rate * upg.owned * productionMultiplier);
    }
}

function updateMetaUpgrades() {
    let container = document.getElementById("metaUpgradesList");
    container.innerHTML = "";
    for (let key in metaUpgrades) {
        let meta = metaUpgrades[key];
        if (!meta.purchased) {
            container.innerHTML += `
            <div class="meta-upgrade">
              <div>${meta.name}</div>
              <div>Coût : ${meta.cost} pts</div>
              <button onclick="buyMetaUpgrade('${key}')">Acheter</button>
            </div>
          `;
        }
    }
}

function autoGenerate() {
    let totalGain = 0;
    for (let key in upgrades) {
        let gain = (upgrades[key].owned * upgrades[key].rate * productionMultiplier) / 10;
        educationPoints += gain;
        totalEarnedPoints += gain;
        totalGain += gain;
    }
    updateDisplay();
}

updateUpgrades();
updateMetaUpgrades();
setInterval(autoGenerate, 100);

function saveProgress() {
    const gameState = {
        educationPoints: educationPoints,
        totalEarnedPoints: totalEarnedPoints,
        productionMultiplier: productionMultiplier,
        upgrades: {},
        metaUpgrades: {}
    };

    // Sauvegarder l'état des upgrades
    for (let key in upgrades) {
        gameState.upgrades[key] = {
            cost: upgrades[key].cost,
            owned: upgrades[key].owned
        };
    }

    // Sauvegarder l'état des méta-upgrades
    for (let key in metaUpgrades) {
        gameState.metaUpgrades[key] = {
            purchased: metaUpgrades[key].purchased
        };
    }

    localStorage.setItem('myGameSave', JSON.stringify(gameState));
}

function loadProgress() {
    const savedState = localStorage.getItem('myGameSave');
    if (savedState) {
        const gameState = JSON.parse(savedState);

        educationPoints = gameState.educationPoints || 0;
        totalEarnedPoints = gameState.totalEarnedPoints || 0;
        productionMultiplier = gameState.productionMultiplier || 1;

        // Restaurer upgrades
        if (gameState.upgrades) {
            for (let key in gameState.upgrades) {
                if (upgrades[key]) {
                    upgrades[key].cost = gameState.upgrades[key].cost;
                    upgrades[key].owned = gameState.upgrades[key].owned;
                }
            }
        }

        // Restaurer méta-upgrades
        if (gameState.metaUpgrades) {
            for (let key in gameState.metaUpgrades) {
                if (metaUpgrades[key]) {
                    metaUpgrades[key].purchased = gameState.metaUpgrades[key].purchased;
                }
            }
        }

        updateUpgrades();
        updateMetaUpgrades();
        updateDisplay();
    } else {
        // Pas de sauvegarde, initialiser valeurs par défaut
        educationPoints = 0;
        totalEarnedPoints = 0;
        productionMultiplier = 1;
        updateUpgrades();
        updateMetaUpgrades();
        updateDisplay();
    }
}

window.onload = loadProgress;
setInterval(saveProgress, 1000); // sauvegarde automatique chaque seconde


function resetSave() {
    localStorage.removeItem('myGameSave');
    // Réinitialise aussi les variables en mémoire si besoin
    educationPoints = 0;
    totalEarnedPoints = 0;
    productionMultiplier = 1;

    // Remet à zéro les propriétés des upgrades
    for (let key in upgrades) {
        upgrades[key].owned = 0;
        // Optionnel : remettre aussi le coût initial si tu en as besoin
        upgrades[key].cost = initialCost[key];
    }

    // Remet à zéro les meta upgrades
    for (let key in metaUpgrades) {
        metaUpgrades[key].purchased = false;
    }

    // Mets à jour l'affichage après reset
    updateUpgrades();
    updateMetaUpgrades();
    updateDisplay();
}


