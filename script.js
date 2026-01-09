let cards = [
    {
        id: 0,
        name: "Explosion",
        school: "Curses",
        target: "Opponent",
        timing: "Instant",
        powerMin: 3,
        powerMax: 5,
        type: "Damage",
        damage: 1
    },
    {
        id: 1,
        name: "Shock",
        school: "Jinxes",
        target: "Opponent",
        timing: "Instant",
        powerMin: 1,
        powerMax: 3,
        type: "Damage",
        damage: 0
    },
    {
        id: 2,
        name: "Baby Explosion",
        school: "Curses",
        target: "Opponent",
        timing: "Instant",
        powerMin: 2,
        powerMax: 4,
        type: "Damage",
        damage: 1
    },
    {
        id: 3,
        name: "Big Shock",
        school: "Jinxes",
        target: "Opponent",
        timing: "Instant",
        powerMin: 2,
        powerMax: 4,
        type: "Damage",
        damage: 0
    }
]

class Player {
    constructor(name) {
        this.name = name;
        this.stamina = 20;
        this.power = 10;
        this.cards = [0, 1, 2];
    }
    takeDamage(damage) {
        this.stamina -= damage;
        if (this.stamina > 20) {
            this.stamina = 20;
        }
        if (this.stamina < 0) {
            this.stamina = 0;
        }
        console.log(this.name + " takes " + damage + " Damage.");
        console.log(this.name + "'s Stamina is " + this.stamina + "/20.");
    }
    takeFatigue(fatigue) {
        this.stamina -= fatigue;
        if (this.stamina > 20) {
            this.stamina = 20;
        }
        if (this.stamina < 0) {
            this.stamina = 0;
        }
        console.log(this.name + " takes " + fatigue + " Famage.");
        console.log(this.name + "'s Stamina is " + this.stamina + "/20.");
    }
    chooseCard() {

    }
    usePower(power) {
        this.power -= power;
        
        console.log(this.name + " uses " + power + " Power.");
        console.log(this.name + "'s Power is " + this.power + "/10.");
    }
    focus() {
        this.power = 10;

        console.log(this.name + " uses Focus to refill power to 10.");
        console.log(this.name + "'s Power is " + this.power + "/10.");
    }
    castSpell(id, power) {
        let foundSpell = cards.find(card => card.id === id);

        console.log(this.name + " is casting " + foundSpell.name + ".");

        let damage = power + foundSpell.damage;

        computer.takeDamage(damage);
    }
};

class Human extends Player {
    chooseCard() {
        console.log("human choose card");
    }
};

class Computer extends Player {
    chooseCard() {
        let currentPower = computer.power;
        let arrayOfCastableSpells = [];

        cards.forEach(function(card) {
            if (currentPower >= card.powerMin) {
                arrayOfCastableSpells.push(card.id);
            }
        });

        let randomCardId = Math.floor(Math.random() * arrayOfCastableSpells.length);
        let chosenCard = cards.find(card => card.id === randomCardId);
        let powerUsed = Math.floor(Math.random() * (chosenCard.powerMax - chosenCard.powerMin + 1)) + chosenCard.powerMin;

        computer.usePower(powerUsed);
        
        computer.castSpell(randomCardId, powerUsed);
    }
};

let human = new Human("Human");
let computer = new Computer("Computer");
let turn = 1;

// human.takeDamage(5);
// human.usePower(7);
// human.focus();
// human.castSpell(2, 5);

startGame();
function startGame() {
    console.log(human.name + " vs. " + computer.name);
    startTurn();
}

function startTurn() {
    console.log("Turn " + turn);
    computer.chooseCard();
    human.chooseCard();
}