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