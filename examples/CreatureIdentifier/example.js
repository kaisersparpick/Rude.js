class CleverCreatureIdentifier {
    constructor() {
        this.result = "";
    }

    isAnimal() {
        var animal = new Date().getSeconds() % 2 === 0;
        if (!animal) this.result = "a cherry tree";
        return animal;
    }
    hasLegs() {
        var legs = true;
        if (!legs) this.result = "a snake";
        return legs;
    }
    hasTwoLegs() {
        return new Date().getMilliseconds() % 2 === 0
    }
    canRead() {
        var superhuman = CleverCreatureIdentifier.canCountToInfinity;
        this.result = superhuman ? "Chuck Norris" : "a caveman";
        return superhuman;
    }

    static get canCountToInfinity() { return true; }
    static hasHorns() {
        return getMyVerySecretValue(5) === 7;
    }
}
CleverCreatureIdentifier.type = "mythical";
Object.freeze(CleverCreatureIdentifier);

class SmartPrinter {
    constructor(cleverInst) {
        this.cleverInst = cleverInst;
    }
    poodle() {
        this.cleverInst.result = "OK, so it's a Poodle!";
        return null;
    }
    creatureFound() {
        this.cleverInst.result = `It must be ${this.cleverInst.result}!`;
        return null;
    }
    printResult() {
        document.getElementById("result").innerText = this.cleverInst.result;
    }
    printLog(html) {
        document.getElementById("log").innerHTML = html;
    }
}

function getMyVerySecretValue(val) { return val + 2; }
function hasOneHorn() {
    var one = CleverCreatureIdentifier.type === "mythical";
    c.result = one ? "a unicorn" : "a stag";
    return one;
}

var c = new CleverCreatureIdentifier();
var s = new SmartPrinter(c);

var rude = new Rude(c);
rude.addRule(c.isAnimal, c.hasLegs, { cb: s.creatureFound, scope: s });
rude.addRule(c.hasLegs, c.hasTwoLegs, { cb: s.creatureFound, scope: s });
rude.addRule(c.hasTwoLegs, c.canRead, CleverCreatureIdentifier.hasHorns);
rude.addRule(c.canRead, { cb: s.creatureFound, scope: s }, { cb: s.creatureFound, scope: s });
rude.addRule(CleverCreatureIdentifier.hasHorns, hasOneHorn, { cb: s.poodle, scope: s });
rude.addRule(hasOneHorn, { cb: s.creatureFound, scope: s }, { cb: s.creatureFound, scope: s });
rude.addRule({ cb: s.creatureFound, scope: s });

// Entry point:
rude.check("isAnimal");

s.printResult();
s.printLog(rude.generateLog());
