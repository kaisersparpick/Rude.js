class RudeRule {
    constructor(condition, yes, no) {
        this.condition = condition;
        this.yes = yes;
        this.no = no;
    }
}

class Rude {
    constructor(scope) {
        this.rules = {};
        this.scope = scope || undefined;
        this.log = [];
    }

    check(ruleName) {
        if (!ruleName) return false;

        let loop = true;
        while (loop) {
            let rule = this.rules[ruleName];
            if (!rule) break;
            let currentScope = rule.condition.scope || this.scope;
            let result = currentScope ? rule.condition.cb.call(currentScope) : rule.condition.cb();

            this.log.push({ ruleName, result });

            if (result === null) break;

            let nextRule = result ? rule.yes : rule.no;
            if (!nextRule || !nextRule.cb) break;

            ruleName = nextRule.cb.name;
        }

        return true;
    }

    static processArg(arg) {
        if (typeof arg !== "function" && typeof arg !== "object" && typeof arg !== "undefined")
            throw Error("Invalid argument");

        if (typeof arg === "function")
            arg = { cb: arg, scope: undefined };

        return arg;
    }

    addRule(condition, yes, no) {
        let args = [condition, yes, no].map(arg => Rude.processArg(arg));
        let key = args[0].cb.name;
        this.rules[key] = new RudeRule(args[0], args[1], args[2]);
    }

    generateLog() {
        let html = "";
        let thead = "<thead><tr><th>idx</th><th>rule name</th><th>result</th></tr></thead>";
        for (const [idx, item] of this.log.entries()) {
            html += `<tr><td>${idx}</td><td>${item.ruleName}</td><td>${item.result}</td></tr>`;
        }
        return `<table>${thead}<tbody>${html}</tbody></table>`;
    }
}
