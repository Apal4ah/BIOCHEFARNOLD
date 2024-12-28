const playerHealthBar = document.getElementById("player-health");
const enemyHealthBar = document.getElementById("enemy-health");
const log = document.getElementById("log");
const attackBtn = document.getElementById("attack-btn");
const healBtn = document.getElementById("heal-btn");

let playerHealth = 100;
let enemyHealth = 100;
let playerLevel = 1;
let enemyLevel = 1;

function logMessage(message) {
    const logEntry = document.createElement("p");
    logEntry.textContent = message;
    log.appendChild(logEntry);
    log.scrollTop = log.scrollHeight;
}

function updateHealthBars() {
    playerHealthBar.textContent = `Sigma Man HP: ${ playerHealth }`;
    enemyHealthBar.textContent = `Chef Arnold HP: ${ enemyHealth }`;
}

function levelUp() {
    playerLevel++;
    playerHealth = Math.min(playerHealth + 20, 100);
    logMessage(`Kamu naik level ${ playerLevel }! darah dipulihkan sebanyak 20.`);
}

function criticalHit() {
    return Math.random() < 0.2; // 20% chance for critical hit
}

function attack() {
    let playerDamage = Math.floor(Math.random() * 15) + 5;
    let enemyDamage = Math.floor(Math.random() * 15) + 5;

    if (criticalHit()) {
        playerDamage *= 2;
        logMessage("Critical hit! Sigma Man menghasilkan double damage jirr!");
    }

    if (criticalHit()) {
        enemyDamage *= 2;
        logMessage("Ahh sial... Musuh melandaskan kritikal hit! Anda terkena double damage.");
    }

    enemyHealth -= playerDamage;
    playerHealth -= enemyDamage;

    logMessage(`Sigma man menyerang dan menghasilkan ${ playerDamage } damage!`);
    logMessage(`Chef arnold counter attack dan menghasilkan ${ enemyDamage } damage!`);

    if (enemyHealth <= 0) {
        enemyHealth = 0;
        logMessage("Woaaahhhhhh,,,, nGoPi sek LuR☕☕ Chef arnold kalah! Selamat kamu menang!");
        attackBtn.disabled = true;
        healBtn.disabled = true;
    }

    if (playerHealth <= 0) {
        playerHealth = 0;
        logMessage("Yaelah cupu bet lu, masa sama serangan chef arnold doang kalah!");
        attackBtn.disabled = true;
        healBtn.disabled = true;
    }

    if (enemyHealth <= 0 && playerHealth > 0) {
        levelUp();
        enemyHealth = 100 + enemyLevel * 20;
        enemyLevel++;
        logMessage(`ALAMAKK BOSS BESAR MUNCULL DENGAN LEVEL YANG GILAA! level:  ${ enemyLevel }.`);
        attackBtn.disabled = false;
        healBtn.disabled = false;
    }

    updateHealthBars();
}

function heal() {
    const healAmount = Math.floor(Math.random() * 20) + 10;
    playerHealth = Math.min(playerHealth + healAmount, 100);

    logMessage(`Sigma Man telah heal sekarang HP anda sebanyak:  ${ healAmount }`);

    if (Math.random() < 0.5) {
        const enemyDamage = Math.floor(Math.random() * 15) + 5;
        playerHealth -= enemyDamage;
        logMessage(`Ohhhh tidakk kamu diserang saat sedang melakukan heal, terkena ${ enemyDamage } damage!`);
    }

    updateHealthBars();
}

attackBtn.addEventListener("click", attack);
healBtn.addEventListener("click", heal);

updateHealthBars();