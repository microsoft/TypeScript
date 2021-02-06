// @strictNullChecks: true

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

