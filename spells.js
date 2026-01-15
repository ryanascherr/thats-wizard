import { turn } from "./script.js";

export let spellInfo = [
    {
        id: 0,
        name: "Stun",
        powerMin: 1,
        powerMax: 3,
        spell: function(caster, target, power) {
            castStun(caster, target, power);
        }
    },
    {
        id: 1,
        name: "Explosion",
        powerMin: 3,
        powerMax: 5,
        spell: function(caster, target, power) {
            castExplosion(caster, target, power);
        }
    },
    {
        id: 2,
        name: "Death",
        powerMin: 10,
        powerMax: 10,
        spell: function(caster, target, power) {
            castDeath(caster, target, power);
        }
    },
    {
        id: 3,
        name: "Disarm",
        powerMin: 2,
        powerMax: 2,
        spell: function(caster, target, power) {
            castDisarm(caster, target, power);
        }
    },
    {
        id: 4,
        name: "Chaos",
        powerMin: 4,
        powerMax: 6,
        spell: function(caster, target, power) {
            castChaos(caster, target, power);
        }
    }
]

export function castStun(caster, target, power) {
    console.log(caster.name + " is casting Stun on " + target.name + " using " + power + " Power.");

    let oppPower = target.power;
    let drainAmount = power + 2;

    if (drainAmount <= oppPower) {
        target.power -= drainAmount;
        console.log(target.name + " loses " + drainAmount + " Power.");
    } else {
        let difference = drainAmount - oppPower;
        target.power = 0;
        target.takeDamage(difference);
        console.log(target.name + " loses " + oppPower + " Power.");
    }

    target.displayPower();
}

export function castSilence(caster, target, power) {
    console.log(caster.name + " is casting Silence on " + target.name + " using " + power + " Power.");
    console.log("Silence will last " + power + " rounds, starting next round.");
    
    target.hasSilence = true;
    target.silenceRounds = power;
}

export function castExplosion(caster, target, power) {
    console.log(caster.name + " is casting Explosion on " + target.name + " using " + power + " Power.");

    let damage = power + 1;
    target.takeDamage(damage);
}

export function castDeath(caster, target, power) {
    console.log(caster.name + " is casting Death on " + target.name + " using " + power + " Power.");

    let threshold = power + 1;
    let conditionMet = target.stamina <= threshold ? true : false;

    if (conditionMet) {
        console.log(target.name + " has " + threshold + " or less Stamina and forfeits the duel.");
        target.lose();
    } else {
        console.log("Death has no effect.");
    }
}

export function castDisarm(caster, target, power) {
    console.log(caster.name + " is casting Disarm on " + target.name + " using " + power + " Power.");

    let threshold = power + 3;
    let conditionMet = target.stamina <= threshold ? true : false;

    if (conditionMet) {
        console.log(target.name + " has " + threshold + " or less Stamina and forfeits the duel.");
        target.lose();
    } else {
        console.log("Disarm has no effect.");
    }
}

export function castGrimOmen(caster, target, power) {
    console.log(caster.name + " is casting Grim Omen on " + target.name + " using " + power + " Power.");

    let casterStamina = caster.stamina;
    let targetStamina = target.stamina;

    caster.stamina = targetStamina;
    target.stamina = casterStamina;

    console.log(caster.name + " and " + target.name + " swap Stamina.");

    caster.displayStamina();
    target.displayStamina();
}

export function castSharePain(caster, target, power) {
    console.log(caster.name + " is casting Share Pain on " + target.name + " using " + power + " Power.");

    let conditionMet = caster.stamina < target.stamina ? true : false;
    let fatigue = power;

    if (conditionMet) {
        fatigue += 1;
        console.log(caster.name + " has less Stamina than " + target.name + ". Share Pain deals 1 extra Fatigue.");
    } else {
        console.log(caster.name + " does not have less Stamina than " + target.name + ".");
    }

    target.takeFatigue(fatigue);
}

export function castChaos(caster, target, power) {
    console.log(caster.name + " is casting Chaos on " + target.name + " using " + power + " Power.");

    let randomNumber = Math.floor(Math.random() * 6) + 1;
    let damage = power;

    console.log(caster.name + " rolled a " + randomNumber + ".");

    if (randomNumber === 1) {
        caster.takeDamage(damage);
        target.takeDamage(damage);
    } else if (randomNumber === 2) {
        target.takeDamage(damage);
    } else if (randomNumber === 3 || randomNumber === 4) {
        damage = power + 1;
        target.takeDamage(damage);
    } else if (randomNumber === 5 || randomNumber === 6) {
        damage = power + 2;
        target.takeDamage(damage);
    }
}

export function castMindControl(caster, target, power) {
    console.log(caster.name + " is casting Mind Control on " + target.name + " using " + power + " Power.");

    let threshold = power - 8;
    let conditionMet = target.power <= threshold ? true : false;

    if (conditionMet) {
        console.log(target.name + " has " + threshold + " or less Power and forfeits the duel.");
        target.lose();
    } else {
        console.log("Mind Control has no effect.");
    }
}

export function castPolymorph(caster, target, power) {
    console.log(caster.name + " is casting Polymorph on " + target.name + " using " + power + " Power.");

    let threshold = power + 2;
    let conditionMet = target.stamina <= threshold ? true : false;

    if (conditionMet) {
        console.log(target.name + " has " + threshold + " or less Stamina and forfeits the duel.");
        target.lose();
    } else {
        console.log("Polymorph has no effect.");
    }
}

export function castIgnite(caster, target, power) {
    console.log(caster.name + " is casting Ignite on " + target.name + " using " + power + " Power.");

    target.hasIgnite = true;
    target.igniteTurn = turn + 1;
    console.log(target);

    let damage = power + 3;

    let spellObject = { castSpell: castIgnite(human, computer, ) };

    // let damage = power + 1;
    // target.takeDamage(damage);

    // let newSpellObject = { }
}

// const newObject = { id: 2, name: 'Item B' }