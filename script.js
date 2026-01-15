import { spellInfo, castStun, castSilence, castExplosion, castDeath, castDisarm, castGrimOmen, castSharePain, castChaos, castMindControl, castPolymorph, castIgnite } from "./spells.js";

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
        name: "Share Pain",
        school: "Hexes",
        target: "Opponent",
        timing: "Instant",
        powerMin: 1,
        powerMax: 3,
        type: "Damage",
        damage: 1
    },
    {
        id: 3,
        name: "Stun",
        school: "",
        target: "Opponent",
        timing: "Instant",
        powerMin: 1,
        powerMax: 3,
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
        this.hasSilence = false;
        this.silenceRounds = 0;
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
        this.displayStamina();
    }
    takeFatigue(fatigue) {
        this.stamina -= fatigue;
        if (this.stamina > 20) {
            this.stamina = 20;
        }
        if (this.stamina < 0) {
            this.stamina = 0;
        }
        console.log(this.name + " takes " + fatigue + " Fatigue.");
        this.displayStamina();
    }
    chooseCard() {

    }
    usePower(power) {
        this.power -= power;

        console.log(this.name + " uses " + power + " Power.");
        
        this.displayPower();
    }
    displayPower() {
        console.log(this.name + " has " + this.power + "/10 Power.")
    }
    displayStamina() {
        console.log(this.name + " has " + this.stamina + "/20 Stamina.")
    }
    focus() {
        this.power = 10;

        console.log(this.name + " uses Focus to refill power to 10.");
        console.log(this.name + "'s Power is " + this.power + "/10.");
    }
    castSpell(id, power) {
        // let foundSpell = cards.find(card => card.id === id);

        // console.log(this.name + " is casting " + foundSpell.name + ".");

        // let damage = power + foundSpell.damage;

        // computer.takeDamage(damage);


    }
    lose() {
        console.log(this.name + " loses the duel.");
    }
    endTurn() {
        this.checkForIgnite();
    }
    checkForIgnite() {
        if (this.hasIgnite && this.igniteTurn === turn) {
            console.log(this.name + " takes damage from Ignite.");

            let damage = 6;
            this.takeDamage(damage);

            this.hasIgnite = false;
            this.igniteTurn = 0;
        }
    }
};

class Human extends Player {
    chooseCard() {
        console.log("human choose card");
    }
};

class Computer extends Player {
    chooseCard() {
        let currentPower = this.power;
        let arrayOfCastableSpells = [];

        cards.forEach(function(card) {
            if (currentPower >= card.powerMin) {
                arrayOfCastableSpells.push(card.id);
            }
        });

        let randomCardId = Math.floor(Math.random() * arrayOfCastableSpells.length);
        let chosenCard = cards.find(card => card.id === randomCardId);
        let powerUsed = Math.floor(Math.random() * (chosenCard.powerMax - chosenCard.powerMin + 1)) + chosenCard.powerMin;

        this.usePower(powerUsed);
        
        this.castSpell(randomCardId, powerUsed);
    }
};

// class DurationSpell {
//     constructor(spellFunction, caster, target, activateTurnNumber) {
//         this.spellFunction = spellFunction;
//     }
    
// }

let turns = [];

let human = new Human("Human");
let computer = new Computer("Computer");
export let turn = 1;

startGame();
function startGame() {
    console.log(human.name + " vs. " + computer.name);
}

document.querySelector(".js_start-turn").onclick = function() {
    startTurn();
};

document.querySelector(".js_end-turn").onclick = function() {
    endTurn();
};

document.addEventListener('click', function(event) {
    if (event.target.closest('.js_cast-spell')) {
        let spellId = parseInt(event.target.dataset.id);
        let powerSpent = parseInt(document.querySelector(".js_power-dropdown").value);
        
        let foundSpell = spellInfo.find((spell) => spell.id === spellId);

        human.usePower(powerSpent);

        foundSpell.spell(human, computer, powerSpent);
    }
});

function startTurn() {
    console.log("Turn " + turn + " is beginning.");
    // computer.chooseCard();
    // human.chooseCard();
}

function endTurn() {
    console.log("Checking for end of turn effects...");

    human.endTurn();
    computer.endTurn();

    console.log("Turn " + turn + " is over.");
    turn++;
}