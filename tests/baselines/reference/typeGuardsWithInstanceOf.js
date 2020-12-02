//// [typeGuardsWithInstanceOf.ts]
interface I { global: string; }
var result!: I;
var result2!: I;

if (!(result instanceof RegExp)) {
    result = result2;
} else if (!result.global) {
}

// Repro from #31155

interface OnChanges {
    onChanges(changes: Record<string, unknown>): void
}
interface Validator {
    validate(): null | Record<string, unknown>;
}

class C {
    validate() {
        return {}
    }
}

function foo() {
    let v: Validator & Partial<OnChanges> = null as any;
    if (v instanceof C) {
        v // Validator & Partial<OnChanges> & C
    }
    v // Validator & Partial<OnChanges> via subtype reduction
    if (v.onChanges) {
        v.onChanges({});
    }
}



//// [typeGuardsWithInstanceOf.js]
var result;
var result2;
if (!(result instanceof RegExp)) {
    result = result2;
}
else if (!result.global) {
}
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.validate = function () {
        return {};
    };
    return C;
}());
function foo() {
    var v = null;
    if (v instanceof C) {
        v; // Validator & Partial<OnChanges> & C
    }
    v; // Validator & Partial<OnChanges> via subtype reduction
    if (v.onChanges) {
        v.onChanges({});
    }
}
