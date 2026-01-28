import { human, computer } from "./classes.js";
import { spellInfo, focus, castStun, castSilence, castExplosion, castDeath, castDisarm, castGrimOmen, castSharePain, castChaos, castMindControl, castPolymorph, castIgnite, counterSpell } from "./spells.js";

export let round = 1;

startGame();
function startGame() {
    computer.adjustHand(4);
    console.log("----- " + human.name + " vs. " + computer.name + " -----");
    createHand();
    startRound();
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
                <button class="js_cast-spell" data-id="` + spellId + `">Cast</button>
                <label for="power">Power:</label>
                <select class="js_power-dropdown" id="power" name="power" data-id="` + spellId + `">
                    <option value="` + foundSpell.powerMin + `">` + foundSpell.powerMin + `</option>
                </select>
            `;
        }

        document.querySelector(".js_hand-of-cards").appendChild(newDiv);
    });
}

function startRound() {
    console.log("--- Round " + round + " Start ---");
    computer.chooseCard();
}

function endRound() {
    console.log("-- Checking for end of round effects... --");

    human.endRound();
    computer.endRound();

    console.log("--- Round " + round + " End ---");
    round++;
}

//When human chooses spell to play, get spell object and store for later use
document.addEventListener('click', function(event) {
    if (event.target.closest('.js_cast-spell')) {
        let spellId = parseInt(event.target.dataset.id);
        let powerSpent = parseInt(document.querySelector(".js_power-dropdown[data-id='" + spellId + "'").value);
        
        let foundSpell = spellInfo.find((spell) => spell.id === spellId);

        human.currentSpellObject = foundSpell;
        human.currentSpellPower = powerSpent;

        comparePower();
        endRound();
        startRound();
    }
});

function comparePower() {
    let humanSpellName = human.currentSpellObject.name;
    let computerSpellName = computer.currentSpellObject.name;

    console.log("Human plays " + humanSpellName + " using " + human.currentSpellPower + " Power.");
    human.usePower(human.currentSpellPower);

    console.log("Computer plays " + computerSpellName + " using " + computer.currentSpellPower + " Power.");
    computer.usePower(computer.currentSpellPower);

    if (human.currentSpellPower <= computer.currentSpellPower) {
        console.log("Human goes first.");
        human.castSpell(human, computer);
        computer.castSpell(computer, human);
    } else {
        console.log("Computer goes first.");
        computer.castSpell(computer, human);
        human.castSpell(human, computer);
    }
}