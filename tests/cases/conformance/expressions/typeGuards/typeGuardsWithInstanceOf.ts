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

    // In 4.1, we introduced a change which _fixed_ a bug with CFA
    // correctly setting this to be the right object. With 4.2,
    // we reverted that fix in #42231 which brought behavior back to
    // before 4.1.
    if (v.onChanges) {
        v.onChanges({});
    }
}

