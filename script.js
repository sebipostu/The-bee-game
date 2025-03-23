const numberOfWorkerBees = 5;
const numberOfDroneBees = 8;

// Bee Class
class Bee {
    constructor(type, health, damage) {
        this.type = type;
        this.health = health;
        this.maxHealth = health;
        this.damage = damage;
        this.alive = true;
        this.element = null;
        this.healthBar = null;
    }

    takeDamage() {
        if (!this.alive) return;
        this.health -= this.damage;
        this.animateHit();
        if (this.health <= 0) {
            this.health = 0;
            this.alive = false;
            console.log(`${this.type} bee has died!`);
        }
        this.updateElement();
    }

    animateHit() {
        if (this.element) {
            this.element.classList.add("hit-effect");
            setTimeout(() => this.element.classList.remove("hit-effect"), 300);

            // clear timeout?
        }
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("bee", this.type.toLowerCase());

        const name = document.createElement("div");
        name.classList.add("bee-name");
        name.textContent = this.type;
        this.element.appendChild(name);

        const healthContainer = document.createElement("div");
        healthContainer.classList.add("health-container");

        this.healthBar = document.createElement("div");
        this.healthBar.classList.add("health-bar");
        this.healthBar.innerText = `${this.health}/${this.maxHealth}`;
        this.updateElement();

        healthContainer.appendChild(this.healthBar);
        this.element.appendChild(healthContainer);

        return this.element;
    }

    updateElement() {
        if (this.healthBar) {
            let healthPercentage = (this.health / this.maxHealth) * 100;
            this.healthBar.style.width = healthPercentage + "%";
            this.healthBar.innerText = `${this.health}/${this.maxHealth}`;
            if (!this.alive) {
                this.element.classList.add("dead");
                this.healthBar.style.backgroundColor = "gray";
            }
        }
    }

    isAlive() {
        return this.alive;
    }
}

// Subclasses for Bee Types
class QueenBee extends Bee {
    constructor() {
        super("Queen", 100, 8);
    }
}

class WorkerBee extends Bee {
    constructor() {
        super("Worker", 75, 10);
    }
}

class DroneBee extends Bee {
    constructor() {
        super("Drone", 50, 12);
    }
}

// Hive Class to Manage Bees
class Hive {
    constructor() {
        this.bees = [];
        this.hiveTotalHealth = 100+numberOfWorkerBees*75+numberOfDroneBees*50;
        this.currentHiveHealth = this.hiveTotalHealth
        this.healthBar = null;
    }

    addBee(bee) {
        this.bees.push(bee);
    }

    hitRandomBee() {
        const aliveBees = this.bees.filter(bee => bee.isAlive());
   

        const randomBee = aliveBees[Math.floor(Math.random() * aliveBees.length)];
        this.currentHiveHealth = this.currentHiveHealth - (randomBee.health<randomBee.damage?randomBee.health:randomBee.damage)
        randomBee.takeDamage();
        logHit(randomBee.type, randomBee.damage);
        this.updateHiveHealthBar()
        this.updateUI();
        this.checkGameOver()
    }

    createHiveHealthBar(){
        const hiveHealthBar = document.getElementById('hiveHealthBar');
        const healthContainer = document.createElement("div");
        healthContainer.classList.add("health-container");

        this.healthBar = document.createElement("div");
        this.healthBar.classList.add("health-bar");
        this.healthBar.innerText = `${this.currentHiveHealth}/${this.hiveTotalHealth}`;
        this.updateHiveHealthBar()
        healthContainer.appendChild(this.healthBar);
         hiveHealthBar.appendChild(healthContainer)
    }


    updateHiveHealthBar(){
        if (this.healthBar) {
            let healthPercentage = (this.currentHiveHealth / this.hiveTotalHealth) * 100;
            this.healthBar.style.width = healthPercentage + "%";
            this.healthBar.innerText = `${this.currentHiveHealth}/${this.hiveTotalHealth}`;
            
        }
    }

    updateUI() {
        this.bees.forEach(bee => bee.updateElement());
    }

    resetGame() {
        this.bees = [];
        this.currentHiveHealth = this.hiveTotalHealth;
        this.updateHiveHealthBar()
        this.initializeBees();
        this.renderUI();
        resetLogContainer()
    }

    renderUI() {
        const containers = {
            Queen: document.getElementById("queenContainer"),
            Worker: document.getElementById("workerContainer"),
            Drone: document.getElementById("droneContainer"),
        };
        Object.values(containers).forEach(container => container.innerHTML = "");
        this.bees.forEach(bee => {
            const beeElement = bee.createElement();
            containers[bee.type].appendChild(beeElement);
        });
    }

    initializeBees() {
        this.addBee(new QueenBee());
        for (let i = 0; i < numberOfWorkerBees; i++) this.addBee(new WorkerBee());
        for (let i = 0; i < numberOfDroneBees; i++) this.addBee(new DroneBee());

        
    }

    checkGameOver() {
        const queen = this.bees.find(bee => bee instanceof QueenBee);
        const aliveBees = this.bees.filter(bee => bee.isAlive());

        if (!queen.isAlive() || (aliveBees.length === 1 && queen.isAlive())) {
            this.gameOver = true;
            showGameOverModal();
        }
    }
}

// Game Initialization
document.addEventListener("DOMContentLoaded", function () {
    const playerModal = document.getElementById("playerNameModal");
    const playerNameInput = document.getElementById("playerNameInput");
    const startGameButton = document.getElementById("startGameButton");
    const playerGreeting = document.getElementById("playerGreeting");

    let playerName = localStorage.getItem("playerName");
    if (playerName) {
        displayPlayerGreeting(playerName);
    } else {
        playerModal.style.display = "flex";
    }

    startGameButton.addEventListener("click", function () {
        playerName = playerNameInput.value.trim();
        if (playerName) {
            localStorage.setItem("playerName", playerName);
            displayPlayerGreeting(playerName);
            playerModal.style.display = "none";
        }
    });

    function displayPlayerGreeting(name) {
        playerGreeting.textContent = `Hello, ${name}! Ready to hit some bees? 🐝`;
    }
});

function logHit(beeType, damage) {
    const logContainer = document.getElementById("hitLog");
    const logEntry = document.createElement("div");
    logEntry.classList.add("log-entry", beeType.toLowerCase());
    logEntry.innerHTML = `<span class="log-icon">🐝</span> ${beeType} was hit for ${damage} HP!`;
    logContainer.appendChild(logEntry);
    logContainer.scrollTop = logContainer.scrollHeight;
}
function resetLogContainer(){
    const logContainer = document.getElementById("hitLog");
    logContainer.innerHTML = ''
    logHit("Queen", 8);
    logHit("Worker", 10);
    logHit("Drone", 12);
}

const hive = new Hive();
hive.initializeBees();
hive.renderUI();
hive.createHiveHealthBar()

document.getElementById("hitButton").addEventListener("click", () => hive.hitRandomBee());
document.getElementById("resetButton").addEventListener("click", () => hive.resetGame());

// Game over functionality

function showGameOverModal() {
    document.getElementById("gameOverModal").classList.remove("hidden");
}

document.getElementById("playAgainButton").addEventListener("click", function() {
    document.getElementById("gameOverModal").classList.add("hidden");
    hive.resetGame();
});


logHit("Queen", 8);
logHit("Worker", 10);
logHit("Drone", 12);