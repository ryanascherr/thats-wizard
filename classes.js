//TODO: Look at silence text. Maybe have console.log each round showing how many rounds left an effect is in play
//TODO: Computer may cast spell it can afford with too much power

import { spellInfo, focus, castStun, castSilence, castExplosion, castDeath, castDisarm, castGrimOmen, castSharePain, castChaos, castMindControl, castPolymorph, castIgnite, counterSpell } from "./spells.js";
import { round } from "./script.js";

export class Player {
    constructor(name) {
        this.name = name;
        this.stamina = 20;
        this.power = 10;
        this.spells = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
        this.consecutiveCounterspells = 0;
    }
    takeDamage(damage) {
        let additionalDamage = this.checkForBrittleBones();

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

        this.displayPower();
    }
    counterSpell() {
        let staminaLost = 1 + this.consecutiveCounterspells;

        this.stamina -= staminaLost;
        console.log(this.name + " loses Stamina because of Counterspell.");
        this.displayStamina();
        this.consecutiveCounterspells += 1;
    }
    castSpell(caster, target) {
        if (this.isCounterspelled && this.currentSpellObject.isSpell !== false) {
            console.log("Counterspell prevents " + this.name + " from casting " + this.currentSpellObject.name + ".");

            if (this.name === "Human") {
                computer.counterSpell();
            } else {
                human.counterSpell();
            }

            this.isCounterspelled = false;
        } else {
            this.currentSpellObject.spell(caster, target, this.currentSpellPower);

            if (this.name === "Human") {
                computer.consecutiveCounterspells = 0;
            } else {
                human.consecutiveCounterspells = 0;
            }
        }
    }
    lose() {
        console.log(this.name + " loses the duel.");
    }
    endRound() {
        this.checkForIgnite();
        this.checkForLevitate();
        this.checkForPortents();
        this.checkForRegenerate();
        this.checkForFocus();
    }
    checkForIgnite() {
        if (this.hasIgnite && this.igniteRound === round) {
            console.log(this.name + " takes damage from Ignite.");

            this.takeDamage(this.igniteDamage);

            this.hasIgnite = false;
            this.igniteRound = 0;
            this.igniteDamage = 0;
        }
    }
    checkForLevitate() {
        if (this.isLevitating && this.levitateRound === round) {
            console.log(this.name + " takes damage from Levitate.");

            this.takeDamage(this.levitateDamage);

            this.isLevitating = false;
            this.levitateRound = 0;
            this.levitateDamage = 0;
        }
    }
    checkForEmbracePain(number, type) {
        if (this.isEmbracingPain && round >= this.embracePainStart) {
            this.power += number;
            if (power > 10) {
                power = 10;
            }

            console.log(this.name + " gains " + numnber + " " + type + " because of Embrace Pain.");
            this.displayPower();
        }

        if (round === this.embracePainEnd) {
            this.isEmbracingPain = false;
            this.embracePainStart = 0;
            this.embracePainEnd = 0;
        }
    }
    checkForPortents() {
        if (this.hasPortents && round >= this.portentsStart) {
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

            if (round === this.portentsEnd) {
                this.hasPortents = false;
                this.portentsStart = 0;
                this.portentsEnd = 0;
            }
        }
    }
    checkForFear() {
        let additionalFatigue = 0;

        if (this.hasFear && round >= this.fearStart) {
            console.log(this.name + " takes additional Fatigue from Fear.");
            additionalFatigue = 2;
        }

        if (round === this.fearEnd) {
            this.hasFear = false;
            this.fearStart = 0;
            this.fearEnd = 0;
        }

        return additionalFatigue;
    }
    checkForBrittleBones() {
        let additionalDamage = 0;

        if (this.hasBrittleBones && round >= this.brittleBonesStart) {
            console.log(this.name + " takes additional Damage from Brittlebones.");
            additionalDamage = 2;
        }

        if (round === this.brittleBonesEnd) {
            this.hasBrittleBones = false;
            this.brittleBonesStart = 0;
            this.brittleBonesEnd = 0;
        }

        return additionalDamage;
    }
    checkForRegenerate() {
        if (this.isRegenerating && this.regenerateRound === round) {
            console.log(this.name + " gains 2 Stamina from Levitate.");

            this.gainStamina(2);

            this.isRegenerating = false;
            this.regenerateRound = 0;
        }
    }
    checkForFocus() {
        if (this.isFocusing === true) {
            if (this.isLevitating) {
                console.log(this.name + " is Levitating and Focus has no effect.");
            } else {
                this.focus();
            }
            this.isFocusing = false;
        }
    }
};

export class Computer extends Player {
    chooseCard() {
        let currentPower = this.power;
        let arrayOfCastableSpells = [];

        // Find all spells in spellbook that the computer has the Focus to cast, and add it to an array
        this.spells.forEach((spellId, index) => {
            let foundSpell = spellInfo.find((spell) => spell.id === spellId);

            let powerMin = foundSpell.powerMin;
            if (powerMin <= currentPower) {
                arrayOfCastableSpells.push(spellId);
            }
        });
        
        // Determine if computer is using Counterspell, Focus, or casting a spell
        let randomNumber = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
        let isUsingCounterSpell = randomNumber === 1 && this.stamina > 1 + this.consecutiveCounterspells ? true : false;
        let isusingFocus = randomNumber !== 1 && arrayOfCastableSpells.length === 0 || randomNumber === 4 && currentPower <= 4 ? true : false;
        let isCastingSpell = !isUsingCounterSpell && !isusingFocus ? true : false;
        let spellObject = "";
        let powerUsed = 0;

        if (isUsingCounterSpell) {
            spellObject = spellInfo.find(spell => spell.id === 1);
        }
        if (isusingFocus) {
            spellObject = spellInfo.find(spell => spell.id === 0);
        }
        // If casting a spell, do the following:
        // 1. Get a random spell from arrayOfCastableSpells
        // 2. If spell has a choice of power, randomly choose the power
        if (isCastingSpell) {
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

            spellObject = spellToCast;
            powerUsed = power;
        }

        this.currentSpellObject = spellObject;
        this.currentSpellPower = powerUsed;
    }
};

export let human = new Player("Human");
export let computer = new Computer("Computer");