import { turn } from "./script.js";

export let spellInfo = [
    {
        id: 0,
        name: "Focus",
        isSpell: false,
        powerMin: 0,
        powerMax: 0,
        spell: function(caster, target, power) {
            focus(caster, target, power);
        }
    },
    {
        id: 1,
        name: "Counterspell",
        isSpell: false,
        powerMin: 0,
        powerMax: 0,
        spell: function(caster, target, power) {
            counterSpell(caster, target, power);
        }
    },
    {
        id: 2,
        name: "Stun",
        powerMin: 1,
        powerMax: 3,
        spell: function(caster, target, power) {
            castStun(caster, target, power);
        }
    },
    {
        id: 3,
        name: "Explosion",
        powerMin: 3,
        powerMax: 5,
        spell: function(caster, target, power) {
            castExplosion(caster, target, power);
        }
    },
    {
        id: 4,
        name: "Death",
        powerMin: 10,
        powerMax: 10,
        spell: function(caster, target, power) {
            castDeath(caster, target, power);
        }
    },
    {
        id: 5,
        name: "Disarm",
        powerMin: 2,
        powerMax: 2,
        spell: function(caster, target, power) {
            castDisarm(caster, target, power);
        }
    },
    {
        id: 6,
        name: "Chaos",
        powerMin: 4,
        powerMax: 6,
        spell: function(caster, target, power) {
            castChaos(caster, target, power);
        }
    },
    {
        id: 7,
        name: "Embrace Pain",
        powerMin: 1,
        powerMax: 3,
        spell: function(caster, target, power) {
            castEmbracePain(caster, target, power);
        }
    },
    {
        id: 8,
        name: "Portents",
        powerMin: 2,
        powerMax: 4,
        spell: function(caster, target, power) {
            castPortents(caster, target, power);
        }
    },
    {
        id: 9,
        name: "Share Pain",
        powerMin: 1,
        powerMax: 3,
        spell: function(caster, target, power) {
            castSharePain(caster, target, power);
        }
    },
]

export function focus(caster, target, power) {
    console.log(caster.name + " uses Focus and will gain all Power at the end of the round.");
    caster.isFocusing = true;
}

export function counterSpell(caster, target, power) {
    console.log(caster.name + " prepares Counterspell.");
    target.isCounterspelled = true;
}

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
    target.igniteDamage = power + 3;
}

export function castLevitate(caster, target, power) {
    console.log(caster.name + " is casting Levitate on " + target.name + " using " + power + " Power.");

    target.isLevitating = true;
    target.levitateTurn = turn + 1;
    target.levitateDamage = power;
}

export function castEmbracePain(caster, target, power) {
    console.log(caster.name + " is casting Embrace Pain on themselves using " + power + " Power.");

    caster.isEmbracingPain = true;
    caster.embracePainStart = turn + 1;
    caster.embracePainEnd = caster.embracePainStart + power + 1;
}

export function castPortents (caster, target, power) {
    console.log(caster.name + " is casting Portents on themselves using " + power + " Power.");

    caster.hasPortents = true;
    caster.portentsStart = turn + 1;
    caster.portentsEnd = caster.portentsStart + power;
}

export function castFear(caster, target, power) {
    console.log(caster.name + " is casting Fear on " + target.name + " using " + power + " Power.");

    target.hasFear = true;
    target.fearStart = turn + 1;
    target.fearEnd = target.fearStart + power;
}

export function castRegenerate(caster, target, power) {
    console.log(caster.name + " is casting Regenerate on themselves using " + power + " Power.");

    console.log(caster + " regains 2 Stamina now.");
    caster.gainStamina(2);

    caster.isRegenerating = true;
    caster.regenerateTurn = turn + 1;
}

export function castBrittleBones(caster, target, power) {
    console.log(caster.name + " is casting Brittlebones on " + target.name + " using " + power + " Power.");

    target.hasBrittleBones = true;
    target.brittleBonesStart = turn + 1;
    target.brittleBonesEnd = target.brittleBonesStart + power;
}

export function castShrink(caster, target, power) {
    console.log(caster.name + " is casting Shrink on " + target.name + " using " + power + " Power.");

    let fatigue = Math.floor(target.stamina / 2);
    target.takeFatigue(fatigue);
}