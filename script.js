import { spellInfo, focus, castStun, castSilence, castExplosion, castDeath, castDisarm, castGrimOmen, castSharePain, castChaos, castMindControl, castPolymorph, castIgnite, counterSpell } from "./spells.js";

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
        this.spells = [3, 7, 4, 8, 9];
        this.consecutiveCounterspells = 0;
    }
    takeDamage(damage) {
        let additionalDamage = this.checkForFear();

        this.stamina -= damage + additionalDamage;
        if (this.stamina > 20) {
            this.stamina = 20;
        }
        if (this.stamina < 0) {
            this.stamina = 0;
        }
        console.log(this.name + " takes " + damage + " Damage.");
        this.displayStamina();

        this.checkForEmbracePain(damage, "Damage");
    }
    takeFatigue(fatigue) {
        let additionalFatigue = this.checkForFear();

        this.stamina -= fatigue + additionalFatigue;
        if (this.stamina > 20) {
            this.stamina = 20;
        }
        if (this.stamina < 0) {
            this.stamina = 0;
        }
        console.log(this.name + " takes " + fatigue + " Fatigue.");
        this.displayStamina();

        this.checkForEmbracePain(fatigue, "Fatigue");
    }
    gainStamina(number) {
        this.stamina += number;

        if (this.stamina > 20) {
            this.stamina = 20;
        }

        this.displayStamina();
    }
    usePower(power) {
        this.power -= power;        
        this.displayPower();
    }
    displayPower() {
        console.log(this.name + " has " + this.power + "/10 Power.");

        if (this.name === "Human") {
            document.querySelector(".js_human-power").textContent = this.power;
        }
        if (this.name === "Computer") {
            document.querySelector(".js_computer-power").textContent = this.power;
        }
    }
    displayStamina() {
        console.log(this.name + " has " + this.stamina + "/20 Stamina.");

        if (this.name === "Human") {
            document.querySelector(".js_human-stamina").textContent = this.stamina;
        }
        if (this.name === "Computer") {
            document.querySelector(".js_computer-stamina").textContent = this.stamina;
        }
    }
    focus() {
        this.power = 10;

        console.log(this.name + " uses Focus to refill power to 10.");
        console.log(this.name + "'s Power is " + this.power + "/10.");
    }
    // castSpell(id, power) {
    //     // let foundSpell = cards.find(card => card.id === id);

    //     // console.log(this.name + " is casting " + foundSpell.name + ".");

    //     // let damage = power + foundSpell.damage;

    //     // computer.takeDamage(damage);


    // }
    lose() {
        console.log(this.name + " loses the duel.");
    }
    endTurn() {
        this.checkForIgnite();
        this.checkForLevitate();
        this.checkForPortents();
        this.checkForRegenerate();
        this.checkForFocus();
    }
    checkForIgnite() {
        if (this.hasIgnite && this.igniteTurn === turn) {
            console.log(this.name + " takes damage from Ignite.");

            this.takeDamage(this.igniteDamage);

            this.hasIgnite = false;
            this.igniteTurn = 0;
            this.igniteDamage = 0;
        }
    }
    checkForLevitate() {
        if (this.isLevitating && this.levitateTurn === turn) {
            console.log(this.name + " takes damage from Levitate.");

            this.takeDamage(this.levitateDamage);

            this.isLevitating = false;
            this.levitateTurn = 0;
            this.levitateDamage = 0;
        }
    }
    checkForEmbracePain(number, type) {
        if (this.isEmbracingPain && turn >= this.embracePainStart) {
            this.power += number;
            if (power > 10) {
                power = 10;
            }

            console.log(this.name + " gains " + numnber + " " + type + " because of Embrace Pain.");
            this.displayPower();
        }

        if (turn === this.embracePainEnd) {
            this.isEmbracingPain = false;
            this.embracePainStart = 0;
            this.embracePainEnd = 0;
        }
    }
    checkForPortents() {
        if (this.hasPortents && turn >= this.portentsStart) {
            console.log(this.name + "'s Portents takes effect.");

            let randomNumber = Math.floor(Math.random() * 6) + 1;
            console.log(this.name + " rolled a " + randomNumber + ".");

            if (randomNumber === 1) {
                this.takeFatigue(2);
            } else if (randomNumber === 2 || randomNumber === 3) {
                this.gainStamina(2);
            } else if (randomNumber === 3 || randomNumber === 4 || randomNumber === 5 || randomNumber === 6) {
                damage = power + 1;
                target.takeDamage(damage);
            }

            if (turn === this.portentsEnd) {
                this.hasPortents = false;
                this.portentsStart = 0;
                this.portentsEnd = 0;
            }
        }
    }
    checkForFear() {
        let additionalFatigue = 0;

        if (this.hasFear && turn >= this.fearStart) {
            console.log(this.name + " takes additional Fatigue from Fear.");
            additionalFatigue = 2;
        }

        if (turn === this.fearEnd) {
            this.hasFear = false;
            this.fearStart = 0;
            this.fearEnd = 0;
        }

        return additionalFatigue;
    }
    checkForBrittleBones() {
        let additionalDamage = 0;

        if (this.hasBrittleBones && turn >= this.brittleBonesStart) {
            console.log(this.name + " takes additional Damage from Brittlebones.");
            additionalDamage = 2;
        }

        if (turn === this.brittleBonesEnd) {
            this.hasBrittleBones = false;
            this.brittleBonesStart = 0;
            this.brittleBonesEnd = 0;
        }

        return additionalDamage;
    }
    checkForRegenerate() {
        if (this.isRegenerating && this.regenerateTurn === turn) {
            console.log(this.name + " gains 2 Stamina from Levitate.");

            this.gainStamina(2);

            this.isRegenerating = false;
            this.regenerateTurn = 0;
        }
    }
    checkForFocus() {
        if (this.isFocusing === true) {
            if (this.isLevitating) {
                console.log(this.name + " is Levitating and Focus has no effect.");
            } else {
                this.power = 10;

                console.log(this.name + " uses Focus.");

                this.displayPower();
            }
        }
        this.isFocusing = false;
    }
};

class Human extends Player {
    castSpell() {
        this.currentSpellObject.spell(human, computer, this.currentSpellPower);
    }
};

class Computer extends Player {
    chooseCard() {
        let currentPower = this.power;
        let arrayOfCastableSpells = [];

        this.spells.forEach((spellId, index) => {
            let foundSpell = spellInfo.find((spell) => spell.id === spellId);

            let powerMin = foundSpell.powerMin;
            if (powerMin <= currentPower) {
                arrayOfCastableSpells.push(spellId);
            }
        });
        
        let randomNumber = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
        if (randomNumber === 1 && this.stamina > 1 + this.consecutiveCounterspells) {
            counterSpell(computer, human);
            this.consecutiveCounterspells += 1;
        } else if ((arrayOfCastableSpells === 0) || (currentPower <= 4 && randomNumber === 4)) {
            focus(computer);
        } else {
            let randomSpellId = arrayOfCastableSpells[Math.floor(Math.random() * arrayOfCastableSpells.length)];
            
            let spellToCast = spellInfo.find(spell => spell.id === randomSpellId);
            let hasPowerChoice = spellToCast.powerMin !== spellToCast.powerMax ? true : false;
            let power = 0;

            if (hasPowerChoice) {
                let arrayOfPowerOptions = [spellToCast.powerMin, spellToCast.powerMin + 1, spellToCast.powerMin +2];
                let randomPower = arrayOfPowerOptions[Math.floor(Math.random() * arrayOfPowerOptions.length)];

                power = randomPower;
            } else {
                power = spellToCast.powerMin;
            }
            
            this.currentSpellObject = spellToCast;
            this.currentSpellPower = power;

            // spellToCast.spell(computer, human, power);
        }
    }
    castSpell() {
        this.currentSpellObject.spell(computer, human, this.currentSpellPower);
    }
};

// class DurationSpell {
//     constructor(spellFunction, caster, target, activateTurnNumber) {
//         this.spellFunction = spellFunction;
//     }
    
// }

let human = new Human("Human");
let computer = new Computer("Computer");
export let turn = 1;

startGame();
function startGame() {
    console.log(human.name + " vs. " + computer.name);
    createHand();
    startRound();
    computer.chooseCard();
}

function createHand() {
    human.spells.forEach((spellId, index) => {
        let foundSpell = spellInfo.find((spell) => spell.id === spellId);
        let spellName = foundSpell.name.toLowerCase().replaceAll(' ', '-');
        let src = "./img/spells/spell_" + spellName + ".jpg";
        let hasPowerChoice = foundSpell.powerMin !== foundSpell.powerMax ? true : false;

        let newDiv = document.createElement('div');
        newDiv.className = 'spell';

        if (hasPowerChoice) {
            let numberOne = foundSpell.powerMin;
            let numberTwo = numberOne + 1;
            let numberThree = numberTwo + 1;

            newDiv.innerHTML = `
                <img class="spell__img" src="` + src + `">
                <button class="js_cast-spell" data-id="` + spellId + `">Cast</button>
                <label for="power">Power:</label>
                <select class="js_power-dropdown" id="power" name="power" data-id="` + spellId + `">
                    <option value="` + numberOne + `">` + numberOne + `</option>
                    <option value="` + numberTwo + `">` + numberTwo + `</option>
                    <option value="` + numberThree + `">` + numberThree + `</option>
                </select>
            `;
        } else {
            newDiv.innerHTML = `
                <img class="spell__img" src="` + src + `">
                <button class="js_cast-spell" data-id="` + spellId + `">Cast</button> <span>Power: ` + foundSpell.powerMin + `
            `;
        }

        document.querySelector(".js_hand-of-cards").appendChild(newDiv);
    });
}

document.querySelector(".js_start-turn").onclick = function() {
    startTurn();
};

document.querySelector(".js_end-turn").onclick = function() {
    endTurn();
};

document.querySelector(".js_human-focus").onclick = function() {
    focus(human);
};

document.addEventListener('click', function(event) {
    if (event.target.closest('.js_cast-spell')) {
        let spellId = parseInt(event.target.dataset.id);
        let powerSpent = parseInt(document.querySelector(".js_power-dropdown[data-id='" + spellId + "'").value);
        
        let foundSpell = spellInfo.find((spell) => spell.id === spellId);

        // human.usePower(powerSpent);
        human.currentSpellObject = foundSpell;
        human.currentSpellPower = powerSpent;

        comparePower();
        endTurn();
        startRound();

        // foundSpell.spell(human, computer, powerSpent);
    }
});

function comparePower() {
    let humanSpellName = human.currentSpellObject.name;
    let computerSpellName = computer.currentSpellObject.name;

    console.log("Human plays " + humanSpellName + " using " + human.currentSpellPower + " Power.");
    human.usePower(human.currentSpellPower);
    // human.displayPower();

    console.log("Computer plays " + computerSpellName + " using " + computer.currentSpellPower + " Power.");
    computer.usePower(computer.currentSpellPower);
    // computer.displayPower();

    if (human.currentSpellPower <= computer.currentSpellPower) {
        console.log("Human goes first.");
        human.castSpell();
        computer.castSpell();
    } else {
        console.log("Computer goes first.");
        computer.castSpell();
        human.castSpell();
    }
}

function startRound() {
    console.log("Turn " + turn + " is beginning.");
    // computer.chooseCard();
    // human.chooseCard();
}

function endTurn() {
    console.log("Checking for end of round effects...");

    human.endTurn();
    computer.endTurn();

    console.log("Round " + turn + " is over.");
    turn++;
}